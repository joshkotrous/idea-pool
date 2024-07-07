import React, { useEffect } from "react";
import TextArea from "./textArea";
import Button from "./button";
import { HiSparkles } from "react-icons/hi2";
import { useState } from "react";
import { supabase } from "@/utils/supabase/client";
import TextInput from "./textInput";
import { FaArrowRight } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { DatePicker } from "./shadcn/datePicker";
import { FaCheckCircle } from "react-icons/fa";
import { FaRegClipboard } from "react-icons/fa";
import Link from "next/link";
import Spinner from "./spinner";
interface NewPromptFormProps {
  userId?: string;
}

const NewPromptForm: React.FC<NewPromptFormProps> = ({ userId }) => {
  const [prompt, setPrompt] = useState("");
  const [presetResponse, setPresetResponse] = useState("");
  const [presetResponses, setPresetResponses] = useState<string[]>([]);
  const [endsOn, setEndsOn] = useState<Date | undefined>(undefined);
  const [promptAdded, setPromptAdded] = useState<boolean>(false);
  const [promptUrl, setPromptUrl] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(false);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const createPrompt = async () => {
    if (!validateForm()) {
      return;
    }
    let promptId;
    try {
      const { data, error } = await supabase
        .from("prompts")
        .insert([{ prompt: prompt, user: userId, ends_on: endsOn }])
        .select("*");

      if (error) {
        console.error(error);
      } else {
        console.log(data);

        promptId = data[0].id;
      }

      if (presetResponses.length > 0) {
        for (const response of presetResponses) {
          const { data, error } = await supabase
            .from("responses")
            .insert([
              { response: response, is_preset: true, prompt: promptId },
            ]);

          if (error) {
            console.error(error);
          } else {
            console.log(data);
          }
        }
      }
      setPromptUrl(baseUrl + "/app/" + promptId);
      setPromptAdded(true);
    } catch (error: any) {
      console.error(error);
    }
  };

  const addPresetResponse = () => {
    const responses = presetResponses;

    setPresetResponses([...presetResponses, presetResponse]);

    setPresetResponse("");
  };

  const generateResponse = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/generateResponses", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ message: prompt }),
      });

      const result = await response.json();
      if (response.ok) {
        console.log(result);
      }
      const generatedResponses = result.choices[0].message.content
        .split("\n")
        .map((line: string) => line.replace(/^\d+\.\s*|^-/, "").trim());
      const responses = presetResponses;
      setPresetResponses(responses.concat(generatedResponses));
    } catch (error: any) {
      console.error(error);
    }
    setIsLoading(false);
  };

  const removePresetResponse = (index: number) => {
    const responses = [
      ...presetResponses.slice(0, index),
      ...presetResponses.slice(index + 1),
    ];

    console.log(responses);
    setPresetResponses(responses);
  };

  useEffect(() => {
    console.log(endsOn);
  }, [endsOn]);

  const validateForm = () => {
    if (!endsOn && prompt === "") {
      setErrorMessage("End date and prompt must be populated.");
      return false;
    }

    if (!endsOn) {
      setErrorMessage("End date must be populated.");
      return false;
    }

    if (prompt === "") {
      setErrorMessage("Prompt must be populated.");
      return false;
    }
    return true;
  };

  return (
    <>
      {!promptAdded && (
        <div className="flex flex-col gap-8">
          <h2 className="font-bold text-4xl">new prompt</h2>
          <div className="flex flex-col gap-2">
            <TextArea
              classNames="w-full"
              value={prompt}
              onChange={(event: any) => {
                setPrompt(event.target.value);
              }}
              placeholder="prompt..."
            />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="font-semibold text-2xl">preset responses</h2>
            {presetResponses.length > 0 && (
              <div className="dark:border-white border-black border-2 rounded-xl">
                {presetResponses.map((item, index: number) => (
                  //@ts-ignore
                  //TODO: Need to figure out typescript error here
                  <div
                    className={`p-2 flex gap-2 items-center text-sm ${
                      !(presetResponses.length - 1 === index) &&
                      "border-b-2 dark:border-b-white border-b-black"
                    }`}
                    key={index}
                  >
                    <div className="w-fit">{item}</div>
                    <IoClose
                      onClick={() => {
                        removePresetResponse(index);
                      }}
                      className="text-2xl cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            )}
            <TextArea
              value={presetResponse}
              onChange={(event: any) => {
                setPresetResponse(event.target.value);
              }}
              classNames="w-full"
              placeholder="response..."
            />
            <Button
              onClick={() => {
                addPresetResponse();
              }}
              className="font-semibold"
            >
              Add Response
            </Button>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  generateResponse();
                }}
                className="flex gap-1 text-sm items-center w-fit"
              >
                <HiSparkles className="text-lg" />
                Generate responses
              </button>
              {isLoading && (
                <Spinner classNames="p-0 w-fit" spinnerSize="text-sm" />
              )}{" "}
            </div>
          </div>
          <div className="flex flex-col w-full gap-2">
            <div className="flex gap-2 items-center">
              ends on:{" "}
              <DatePicker
                date={endsOn}
                selected={endsOn}
                onSelect={setEndsOn}
              />
            </div>
            <Button onClick={() => createPrompt()} className=" font-semibold">
              Save
            </Button>
            <Link href="/app">
              <Button className="bg-transparent text-black dark:text-white dark:bg-transparent w-full">
                Discard
              </Button>
            </Link>

            {errorMessage && (
              <div className="text-red-500 text-center w-full">
                {errorMessage}
              </div>
            )}
          </div>
        </div>
      )}
      {promptAdded && (
        <div className="size-full flex flex-col gap-4 items-center justify-center text-center">
          <FaCheckCircle className="text-9xl" />
          <h2 className="text-2xl font-semibold">
            Prompt created successfully
          </h2>
          Copy the link the share
          <div className="font-light dark:border-white border-black border-2 p-2 rounded-xl flex gap-4 items-center text-nowrap w-56 justify-evenly ">
            <div className="overflow-hidden text-ellipsis w-3/4">
              {promptUrl}
            </div>
            <FaRegClipboard
              onClick={() => {
                navigator.clipboard.writeText(promptUrl);
              }}
              className="cursor-pointer"
            />
          </div>
          <Link href={promptUrl}>
            <Button>View Prompt</Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default NewPromptForm;
