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
    <div className="my-5 p-5 border shadow-lg rounded-lg">
      <div className="flex justify-between">
        <h2 className="flex-grow">
          <span className="font-semibold">{index + 1}. </span>
          {idea?.content}
        </h2>
        <div className="flex flex-col items-center justify-between ml-7">
          <h2
            onClick={() => upvoteHandler()}
            className={`text-lg hover:bg-gray-200 rounded-md p-1 cursor-pointer
              ${checkIsAlreadyUpVoted(idea.id) && "bg-slate-200"}`}
          >
            🔥
          </h2>
          <h2 className="text-lg rounded-md p-1 font-bold">{idea.vote}</h2>
          <h2
            onClick={() => downvoteHandler()}
            className={`text-lg hover:bg-gray-200 rounded-md p-1 cursor-pointer
              ${checkIsAlreadyDownVoted(idea.id) && "bg-slate-200"}`}
          >
            💩
          </h2>
        </div>
      </div>
      <h2 className="mt-4 text-gray-400 text-sm">
        By @ {idea.username} on {idea.createdAt}
      </h2>
    </div>
  );
};

export default IdeaItem;
