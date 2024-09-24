import { ChevronLeft, Info, Send } from "lucide-react";
import { useEffect, useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { db } from "../../../utils";
import { Ideas } from "../../../utils/schema";
import toast, { Toaster } from "react-hot-toast";

const RATE_LIMIT_MINUTES = 5;

const NewOpinion = () => {
  const navigate = useNavigate();
  const [ideaContent, setIdeaContent] = useState("");
  const [username, setUsername] = useState("");
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
    const rateLimitToastShown = localStorage.getItem("rateLimitToastShown");

    if (lastOpinionTimestamp) {
      const diffMinutes = moment().diff(
        moment(lastOpinionTimestamp),
        "minutes"
      );
      if (diffMinutes < RATE_LIMIT_MINUTES) {
        setRateLimitReached(true);
        // Show toast only if it hasn't been shown before
        if (!rateLimitToastShown) {
          toast.error(
            `You can only share one opinion every ${RATE_LIMIT_MINUTES} minutes.`
          );
          localStorage.setItem("rateLimitToastShown", "true");
        }
      } else {
        // Reset the flag after the rate limit time has passed
        localStorage.removeItem("rateLimitToastShown");
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
        toast.success("Your opinion has been shared!");
        setRateLimitReached(true);
      }
    } catch (error) {
      console.error("Error saving idea:", error);
    }
  };

  return (
    <>
      <div className="w-full">
        <Toaster position="bottom-right" reverseOrder={false} />{" "}
        <button className="btn mt-7 ml-2" onClick={() => navigate("/")}>
          <ChevronLeft />
          Back
        </button>
        <h2 className="text-2xl font-bold mt-5 ml-2">
          Share Your Unwanted Opinion
        </h2>
        <div className="flex flex-col mt-7 gap-2 m-2">
          <label htmlFor="ideaContent" className="font-bold">
            Your Opinion
          </label>
          <textarea
            id="ideaContent"
            value={ideaContent}
            onChange={(e) => setIdeaContent(e.target.value)}
            className="border-primary textarea textarea-bordered"
            placeholder="Enter your opinion here"
          ></textarea>
        </div>
        {!isUserExisting && (
          <div className="flex flex-col mt-7 gap-2 m-2">
            <label
              htmlFor="username"
              className="flex justify-between font-bold"
            >
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
          className="btn w-full btn-default outline-none bg-slate-600 text-white mt-7"
          disabled={!ideaContent || !username || rateLimitReached}
          onClick={handleSave}
        >
          <Send className="h-4 w-4" />
          Submit
        </button>
      </div>
    </>
  );
};

export default NewOpinion;
