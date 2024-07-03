import Button from "@/components/button";
import { FaArrowUp } from "react-icons/fa";

export default function Page() {
  return (
    <div className="w-screen h-screen p-8 flex gap-24 justify-center">
      <div className="h-fit px-4 py-2 flex flex-col w-fit border-2 rounded-xl gap-4">
        <div className="font-semibold text-3xl">My Ideas</div>
        <Button className="bg-white text-black font-medium">+ New Idea</Button>
        <div>Idea 1</div>
        <div>Idea 2</div>
        <div>Idea 3</div>
      </div>

      <div className="flex flex-col gap-8">
        <h2 className="font-bold text-4xl">give me your best saas idea</h2>
        <Button className="bg-white text-black">+ Add Idea</Button>
        <div className="flex flex-col justify-center gap-2">
          <div className="font-semibold text-xl">top responses</div>
          <div className="border-2 rounded-xl">
            <div className="border-b-2 w-full flex justify-between">
              <div className="flex items-center p-4">test</div>
              <div className="border-l-2 p-4">
                <div className="border-2 rounded-xl flex">
                  <div className="flex items-center justify-center p-2 text-yellow-300 font-semibold">
                    240
                  </div>
                  <div className="border-l-2 p-2 flex justify-center items-center">
                    <FaArrowUp />
                  </div>
                </div>
              </div>
            </div>
            <div className="border-b-2 w-full flex justify-between">
              <div className="flex items-center p-4">test</div>
              <div className="border-l-2 p-4">
                <div className="border-2 rounded-xl flex">
                  <div className="flex items-center justify-center p-2 text-yellow-300 font-semibold">
                    240
                  </div>
                  <div className="border-l-2 p-2 flex justify-center items-center">
                    <FaArrowUp />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-2">
          <div className="font-semibold text-xl">other responses</div>
          <div className="border-2 rounded-xl">
            <div className="border-b-2 w-full flex justify-between">
              <div className="flex items-center p-4">test</div>
              <div className="border-l-2 p-4">
                <div className="border-2 rounded-xl flex">
                  <div className="flex items-center justify-center p-2 text-yellow-300 font-semibold">
                    240
                  </div>
                  <div className="border-l-2 p-2 flex justify-center items-center">
                    <FaArrowUp />
                  </div>
                </div>
              </div>
            </div>
            <div className="border-b-2 w-full flex justify-between">
              <div className="flex items-center p-4">test</div>
              <div className="border-l-2 p-4">
                <div className="border-2 rounded-xl flex">
                  <div className="flex items-center justify-center p-2 text-yellow-300 font-semibold">
                    240
                  </div>
                  <div className="border-l-2 p-2 flex justify-center items-center">
                    <FaArrowUp />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
