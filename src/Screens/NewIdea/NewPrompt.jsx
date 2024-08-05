import { ChevronLeft, Info, Send } from "lucide-react";
import { useEffect, useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { db } from "../../../utils";
import { Ideas } from "../../../utils/schema";

const RATE_LIMIT_MINUTES = 10;

const NewOpinion = () => {
  const navigate = useNavigate();
  const [ideaContent, setIdeaContent] = useState("");
  const [username, setUsername] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [isUserExisting, setIsUserExisting] = useState(false);
  const [rateLimitReached, setRateLimitReached] = useState(false);

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      setUsername(savedUsername);
      setIsUserExisting(true);
    }

    // Check rate limit
    const lastOpinionTimestamp = localStorage.getItem("lastOpinionTimestamp");
    if (lastOpinionTimestamp) {
      const diffMinutes = moment().diff(
        moment(lastOpinionTimestamp),
        "minutes"
      );
      if (diffMinutes < RATE_LIMIT_MINUTES) {
        setRateLimitReached(true);
      }
    }
  }, []);

  const handleSave = async () => {
    if (rateLimitReached) {
      return;
    }

    try {
      const result = await db
        .insert(Ideas)
        .values({
          content: ideaContent,
          username: username,
          createdAt: moment().format("DD MMM yyyy"),
        })
        .returning({ id: Ideas.id });

      if (result) {
        localStorage.setItem("username", username);
        localStorage.setItem("lastOpinionTimestamp", moment().toISOString());
        setIdeaContent("");
        setShowAlert(true);
        setRateLimitReached(true);
        setTimeout(() => setShowAlert(false), 5000);
      }
    } catch (error) {
      console.error("Error saving idea:", error);
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
          <span className="text-white">Your opinion has been shared!</span>
        </div>
      )}
      {rateLimitReached && (
        <div
          role="alert"
          className="alert bg-red-500 alert-warning mt-5 shadow-lg"
        >
          <span className="text-white font-bold  flex items-center gap-2">
            <p>NOTE</p>You can only share one opinion every {RATE_LIMIT_MINUTES}{" "}
            minutes.
          </span>
        </div>
      )}
      <button className="btn mt-7" onClick={() => navigate("/")}>
        <ChevronLeft />
        Back
      </button>
      <h2 className="text-2xl font-bold mt-5">Share Your Unwanted Opinion</h2>

      <div className="flex flex-col mt-7 gap-2">
        <label htmlFor="ideaContent" className="font-bold">
          Your Opinion
        </label>
        <textarea
          id="ideaContent"
          value={ideaContent}
          onChange={(e) => setIdeaContent(e.target.value)}
          className="border-primary textarea textarea-bordered"
          placeholder="Enter your prompt here"
        ></textarea>
      </div>

      {!isUserExisting && (
        <div className="flex flex-col mt-7 gap-2">
          <label htmlFor="username" className="flex justify-between font-bold">
            Your Name
            <span className="flex items-center gap-2 text-sm font-semibold">
              <Info className="w-4 h-4" />
              No Account Needed
            </span>
          </label>
          <input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Enter your name"
            className="border-primary input w-full"
          />
        </div>
      )}

      <button
        className="btn w-full btn-primary mt-7"
        disabled={!ideaContent || !username || rateLimitReached}
        onClick={handleSave}
      >
        <Send className="h-4 w-4" />
        Submit
      </button>
    </div>
  );
};

export default NewOpinion;
