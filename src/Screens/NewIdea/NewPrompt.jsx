import { ChevronLeft, Info, Send } from "lucide-react";
import { useEffect, useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { db } from "../../../utils";
import { Ideas } from "../../../utils/schema";

//TODO: UPDATE THE COMPONENT NAMES FOR BETTER READABILITY
const NewPrompt = () => {
  const navigation = useNavigate();
  const [idea, setIdea] = useState();
  const [username, setUsername] = useState();
  const [showAlert, setShowAlert] = useState(false);
  const [existingUser, setExistingUser] = useState(false);

  //TODO: Clean Up UseEffect
  useEffect(() => {
    if (localStorage.getItem("username")) {
      setUsername(localStorage.getItem("username"));
      setExistingUser(true);
    }
  }, []);

  const onSaveHandler = async () => {
    const result = await db
      .insert(Ideas)
      .values({
        content: idea,
        username: username,
        createdAt: moment().format("DD MMM yyyy"),
      })
      .returning({ id: Ideas.id });

    if (result) {
      localStorage.setItem("username", username);
      setIdea("");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, [5000]);
    }
  };

  return (
    <div>
      {showAlert && (
        <div role="alert" className="alert alert-success mt-5 shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-white">Your purchase has been confirmed!</span>
        </div>
      )}
      <button className="btn mt-7" onClick={() => navigation("/")}>
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
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          className="border-primary textarea textarea-bordered"
          placeholder="prompt"
        ></textarea>
      </div>

      {!existingUser && (
        <div className="flex flex-col mt-7 gap-2">
          <label htmlFor="" className="flex justify-between font-bold">
            Your Name
            <span className="flex items-center gap-2 text-sm font-semibold">
              <Info className="w-4 h-4" />
              No Account Needed
            </span>
          </label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="your name"
            className="border-primary input w-full"
          />
        </div>
      )}

      <button
        className="btn w-full btn-primary mt-7"
        disabled={!(idea && username)}
        onClick={() => onSaveHandler()}
      >
        <Send className="h-4 w-4" />
        Send
      </button>
    </div>
  );
};

export default NewPrompt;
