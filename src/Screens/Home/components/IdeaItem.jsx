import { useState } from "react";
import { eq } from "drizzle-orm";
import { db } from "../../../../utils";
import { Ideas } from "../../../../utils/schema";
import {
  checkIsAlreadyDownVoted,
  checkIsAlreadyUpVoted,
  downvote,
  upvote,
} from "../../../service";

/* eslint-disable react/prop-types */
const IdeaItem = ({ idea, index, updateIdeaVote }) => {
  const [localVote, setLocalVote] = useState(idea.vote); // Store local vote state
  const [isUpvoting, setIsUpvoting] = useState(false); // Track upvote action
  const [isDownvoting, setIsDownvoting] = useState(false); // Track downvote action
  const [isAnimating, setIsAnimating] = useState(false); // Control animation

  const upvoteHandler = async () => {
    if (isUpvoting || checkIsAlreadyUpVoted(idea.id)) return; // Prevent multiple votes while updating

    // Optimistically update UI and start animation
    setLocalVote((prevVote) => prevVote + 1);
    setIsAnimating(true);
    setIsUpvoting(true);

    const result = await upvote(idea.id);
    if (result) {
      await db
        .update(Ideas)
        .set({ vote: localVote + 1 })
        .where(eq(Ideas.id, idea.id))
        .returning({ id: Ideas.id });

      updateIdeaVote(idea.id, localVote + 1); // Update only the relevant vote count
    } else {
      setLocalVote((prevVote) => prevVote - 1); // Rollback in case of failure
    }

    setIsUpvoting(false);
    setTimeout(() => setIsAnimating(false), 300); // End animation after 300ms
  };

  const downvoteHandler = async () => {
    if (isDownvoting || checkIsAlreadyDownVoted(idea.id)) return; // Prevent multiple votes while updating

    // Optimistically update UI and start animation
    setLocalVote((prevVote) => prevVote - 1);
    setIsAnimating(true);
    setIsDownvoting(true);

    const result = await downvote(idea.id);
    if (result) {
      await db
        .update(Ideas)
        .set({ vote: localVote - 1 })
        .where(eq(Ideas.id, idea.id))
        .returning({ id: Ideas.id });

      updateIdeaVote(idea.id, localVote - 1); // Update only the relevant vote count
    } else {
      setLocalVote((prevVote) => prevVote + 1); // Rollback in case of failure
    }

    setIsDownvoting(false);
    setTimeout(() => setIsAnimating(false), 300); // End animation after 300ms
  };

  return (
    <div className="my-4 p-4 border border-[#0EA5E9] shadow-lg rounded-lg mx-2 sm:mx-0">
      <div className="flex justify-between items-start">
        <h2 className="flex-grow text-[#D1D5DB]">
          <span className="font-semibold">{index + 1}. </span>
          {idea?.content}
        </h2>
        <div className="flex flex-col items-center justify-between ml-4">
          <h2
            onClick={upvoteHandler}
            className={`text-lg hover:bg-gray-200 rounded-md p-1 cursor-pointer
          ${checkIsAlreadyUpVoted(idea.id) && "bg-slate-200"}`}
            style={{ pointerEvents: isUpvoting ? "none" : "auto" }} // Disable voting while processing
          >
            🔥
          </h2>
          <h2
            className={`text-lg font-bold text-white transition-transform duration-300 ease-in-out ${
              isAnimating ? "scale-125 text-yellow-500" : ""
            }`}
          >
            {localVote}
          </h2>
          <h2
            onClick={downvoteHandler}
            className={`text-lg hover:bg-gray-200 rounded-md p-1 cursor-pointer
          ${checkIsAlreadyDownVoted(idea.id) && "bg-slate-200"}`}
            style={{ pointerEvents: isDownvoting ? "none" : "auto" }} // Disable voting while processing
          >
            💩
          </h2>
        </div>
      </div>
      <h2 className="mt-3 text-slate-400 font-semibold text-xs">
        By @{idea.username} on {idea.createdAt}
      </h2>
    </div>
  );
};

export default IdeaItem;
