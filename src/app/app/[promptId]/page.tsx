"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/utils/supabase/client";
import { Prompt } from "@/types/types";
import { FaArrowUp } from "react-icons/fa";
import { useAuth } from "@/utils/supabase/authProvider";
import TextArea from "@/components/textArea";
import Button from "@/components/button";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { motion } from "framer-motion";
import Spinner from "@/components/spinner";
const Page = () => {
  const params = useParams();
  const { user } = useAuth();
  const { promptId } = params;
  const [prompt, setPrompt] = useState<Prompt | undefined>(undefined);
  const [presetResponses, setPresetResponses] = useState([]);
  const [responses, setResponses] = useState([]);
  const [newResponse, setNewResponse] = useState("");
  const [votes, setVotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const getPrompt = async () => {
    try {
      const { data, error } = await supabase
        .from("prompts")
        .select("*")
        .eq("id", promptId)
        .single();

      if (error) {
        throw error;
      }
      setPrompt(data);
    } catch (error: any) {
      console.error(error);
    }
  };

  const getResponses = async () => {
    try {
      const { data, error } = await supabase
        .from("responses")
        .select("*")
        .eq("prompt", promptId);

      if (error) {
        throw error;
      }
      setResponses(
        //@ts-ignore

        data.filter(
          (item) => item.is_preset === false || item.is_preset === null
        )
      );
      //@ts-ignore

      setPresetResponses(data.filter((item) => item.is_preset === true));
    } catch (error: any) {
      console.error(error);
    }
  };

  const getVotes = async () => {
    try {
      const { data, error } = await supabase
        .from("votes")
        .select("*")
        .eq("prompt", promptId);
      if (error) {
        throw error;
      }
      //@ts-ignore
      setVotes(data);
    } catch (error: any) {
      console.log(error);
    }
  };

  const addVote = async (responseId: string) => {
    try {
      if (user) {
        const { data, error } = await supabase
          .from("votes")
          .insert([{ response: responseId, user: user.id, prompt: promptId }]);
      } else {
        const { data, error } = await supabase
          .from("votes")
          .insert([{ response: responseId, prompt: promptId }]);
      }

      getVotes();
    } catch (error) {
      console.error(error);
    }
  };

  const addResponse = async () => {
    try {
      const { data, error } = await supabase
        .from("responses")
        .insert([{ prompt: promptId, response: newResponse, user: user.id }]);
      if (error) {
        throw error;
      }
      setNewResponse("");
      getResponses();
    } catch (error) {
      console.error(error);
    }
  };

  const init = async () => {
    await getPrompt();
    await getResponses();
    await getVotes();
    setLoading(false);
  };

  useEffect(() => {
    // getPrompt();
    // getResponses();
    // getVotes();
    // setLoading(false);
    init();
  }, []);

  useEffect(() => {
    console.log(prompt);
    console.log(presetResponses);
    console.log(votes);
  }, [prompt, presetResponses, votes]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="pt-28 overflow-auto w-full">
      <div className="flex flex-col gap-4 w-full">
        <h2 className="text-5xl font-bold">{prompt?.prompt}</h2>
        {presetResponses.length > 0 && (
          <div className="flex flex-col gap-2">
            <h3 className="text-2xl font-semibold">preset responses</h3>
            <div className="border-2 dark:border-white border-black rounded-xl">
              {presetResponses.map((response, index) => {
                const numVotes = votes.filter(
                  //@ts-ignore

                  (item) => item.response === response.id
                ).length;
                let userVoted;
                if (user) {
                  userVoted =
                    votes.filter(
                      (item) =>
                        //@ts-ignore

                        item.response === response.id && item.user === user.id
                    ).length > 0;
                }

                return (
                  <div
                    key={index}
                    className={` flex items-center justify-between ${
                      index != presetResponses.length - 1 &&
                      "border-b-2 dark:border-white border-black"
                    }`}
                  >
                    <div className={`p-2 w-full `}>
                      {
                        //@ts-ignore
                        //TODO need to figure out how to appease TS
                        response.response
                      }
                    </div>
                    <div className="flex w-20 p-2 items-center justify-center">
                      <div className="border-2 dark:border-white border-black p-2 rounded-xl flex gap-2 items-center">
                        <span className="text-yellow-400">
                          {
                            //@ts-ignore
                            //TODO need to figure out how to appease TS
                            numVotes
                          }
                        </span>

                        <FaArrowUp
                          onClick={() => {
                            //@ts-ignore
                            addVote(response.id);
                          }}
                          className={`hover:text-yellow-400 ${
                            userVoted && "text-yellow-400 "
                          } transition-all cursor-pointer`}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl font-semibold">responses</h3>
          <TextArea
            value={newResponse}
            onChange={(event: any) => {
              setNewResponse(event.target.value);
            }}
            placeholder="response..."
          />
          <Button
            onClick={() => {
              addResponse();
            }}
          >
            Add Response
          </Button>
          {responses.length > 0 && (
            <div className="border-2 dark:border-white border-black rounded-xl">
              {responses.map((response, index) => {
                const numVotes = votes.filter(
                  //@ts-ignore

                  (item) => item.response === response.id
                ).length;
                let userVoted;
                if (user) {
                  userVoted =
                    votes.filter(
                      (item) =>
                        //@ts-ignore

                        item.response === response.id && item.user === user.id
                    ).length > 0;
                }

                return (
                  <div
                    key={index}
                    className={` flex items-center justify-between ${
                      index != responses.length - 1 &&
                      "border-b-2 dark:border-white border-black"
                    }`}
                  >
                    <div className={`p-2 w-full `}>
                      {
                        //@ts-ignore
                        //TODO need to figure out how to appease TS
                        response.response
                      }
                    </div>
                    <div className="flex w-20 p-2 items-center justify-center">
                      <div className="border-2 dark:border-white border-black p-2 rounded-xl flex gap-2 items-center">
                        <span className="text-yellow-400">
                          {
                            //@ts-ignore
                            //TODO need to figure out how to appease TS
                            numVotes
                          }
                        </span>

                        <FaArrowUp
                          onClick={() => {
                            //@ts-ignore
                            addVote(response.id);
                          }}
                          className={`hover:text-yellow-400 ${
                            userVoted && "text-yellow-400 "
                          } transition-all cursor-pointer`}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
