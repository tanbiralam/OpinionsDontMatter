import { ChevronLeft, Info, Send } from "lucide-react";

const NewIdea = () => {
  return (
    <div>
      <button className="btn mt-7">
        <ChevronLeft />
        Back
      </button>
      <h2 className="text-2xl font-bold mt-5">
        Free Upload Your Best Prompt that you used
      </h2>

      <div className="flex flex-col mt-7 gap-2">
        <label htmlFor="" className="font-bold">
          Your Pompt
        </label>
        <textarea
          className="border-primary textarea textarea-bordered"
          placeholder="prompt"
        ></textarea>
      </div>
      <div className="flex flex-col mt-7 gap-2">
        <label htmlFor="" className="flex justify-between font-bold">
          Your Name
          <span className="flex items-center gap-2 text-sm font-semibold">
            <Info className="w-4 h-4" />
            No Account Needed
          </span>
        </label>
        <input
          type="text"
          placeholder="your name"
          className="border-primary input w-full"
        />
      </div>

      <button className="btn w-full btn-primary mt-7">
        <Send className="h-4 w-4" />
        Send
      </button>
    </div>
  );
};

export default NewIdea;
