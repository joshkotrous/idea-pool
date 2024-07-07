"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/utils/supabase/client";
import { Prompt } from "@/types/types";
import { FaArrowUp } from "react-icons/fa";

const Page = () => {
  const params = useParams();
  const { promptId } = params;
  const [prompt, setPrompt] = useState<Prompt | undefined>(undefined);
  const [presetResponses, setPresetResponses] = useState([]);
  const [votes, setVotes] = useState([]);
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

  const getPresetResponses = async () => {
    try {
      const { data, error } = await supabase
        .from("responses")
        .select("*")
        .eq("prompt", promptId)
        .eq("is_preset", true);
      if (error) {
        throw error;
      }
      //@ts-ignore
      setPresetResponses(data);
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

  useEffect(() => {
    getPrompt();
    getPresetResponses();
    getVotes();
  }, []);

  useEffect(() => {
    console.log(prompt);
    console.log(presetResponses);
    console.log(votes);
  }, [prompt, presetResponses, votes]);
  return (
    <div className="pt-28 overflow-auto">
      <div className="flex flex-col gap-4">
        <h2 className="text-5xl font-bold">{prompt?.prompt}</h2>
        {presetResponses && (
          <div className="flex flex-col gap-2">
            <h3 className="text-2xl font-semibold">preset responses</h3>
            <div className="border-2 dark:border-white border-black rounded-xl">
              {presetResponses.map((response, index) => {
                const numVotes = votes.filter(
                  //@ts-ignore

                  (item) => item.response === response.id
                ).length;
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

                        <FaArrowUp className="hover:text-yellow-400 transition-all cursor-pointer" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
