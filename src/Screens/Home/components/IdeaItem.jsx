import { eq } from "drizzle-orm";
import { db } from "../../../../utils";
import { Ideas } from "../../../../utils/schema";
import {
  checkIsAlreadyDownVoted,
  checkIsAlreadyUpVoted,
  downvote,
  upvote,
} from "../../../service";

//TODO: FIX THE FLICKER ISSUE WHILE CLICKING THE DOWNVOTE OR UPVOTE.

/* eslint-disable react/prop-types */
const IdeaItem = ({ idea, index, refreshData }) => {
  const upvoteHandler = async () => {
    if (upvote(idea.id)) {
      const result = await db
        .update(Ideas)
        .set({
          vote: idea.vote + 1,
        })
        .where(eq(Ideas.id, idea.id))
        .returning({ id: Ideas.id });

      if (result) {
        refreshData();
      }
    }
  };

  const downvoteHandler = async () => {
    if (downvote(idea.id)) {
      const result = await db
        .update(Ideas)
        .set({
          vote: idea.vote - 1,
        })
        .where(eq(Ideas.id, idea.id))
        .returning({ id: Ideas.id });

      if (result) {
        refreshData();
      }
    }
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
            onClick={() => upvoteHandler()}
            className={`text-lg hover:bg-gray-200 rounded-md p-1 cursor-pointer
          ${checkIsAlreadyUpVoted(idea.id) && "bg-slate-200"}`}
          >
            🔥
          </h2>
          <h2 className="text-lg font-bold text-white">{idea.vote}</h2>
          <h2
            onClick={() => downvoteHandler()}
            className={`text-lg hover:bg-gray-200 rounded-md p-1 cursor-pointer
          ${checkIsAlreadyDownVoted(idea.id) && "bg-slate-200"}`}
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
