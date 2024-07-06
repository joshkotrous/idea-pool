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

  useEffect(() => {
    getPrompt();
    getPresetResponses();
  }, []);

  useEffect(() => {
    console.log(prompt);
    console.log(presetResponses);
  }, [prompt, presetResponses]);
  return (
    <div className="pt-28">
      <div className="flex flex-col gap-4">
        <h2 className="text-5xl font-bold">{prompt?.prompt}</h2>
        {presetResponses && (
          <div className="flex flex-col gap-2">
            <h3 className="text-2xl font-semibold">preset responses</h3>
            <div className="border-2 dark:border-white border-black rounded-xl">
              {presetResponses.map((item, index) => (
                <div
                  className={` flex items-center justify-between ${
                    index != presetResponses.length - 1 &&
                    "border-b-2 dark:border-white border-black"
                  }`}
                >
                  <div className={`p-2 w-full `} key={index}>
                    {
                      //@ts-ignore
                      //TODO need to figure out how to appease TS
                      item.response
                    }
                  </div>
                  <div className="flex w-20 p-2 items-center justify-center">
                    <div className="border-2 dark:border-white border-black p-2 rounded-xl flex gap-2 items-center">
                      <span className="text-yellow-400">
                        {
                          //@ts-ignore
                          //TODO need to figure out how to appease TS
                          item.votes
                        }
                      </span>

                      <FaArrowUp className="hover:text-yellow-400 transition-all cursor-pointer" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
