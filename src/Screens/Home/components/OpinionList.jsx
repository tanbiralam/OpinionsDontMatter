/* eslint-disable react/prop-types */
import { useState } from "react";
import OpinionItem from "./OpinionItem";

const IdeaList = ({ ideaList }) => {
  const [ideas, setIdeas] = useState(ideaList);

  const updateIdeaVote = (id, newVoteCount) => {
    setIdeas((prevIdeas) =>
      prevIdeas.map((idea) =>
        idea.id === id ? { ...idea, vote: newVoteCount } : idea
      )
    );
  };

  return (
    <div>
      {ideas.map((idea, index) => (
        <OpinionItem
          idea={idea}
          key={idea.id} // Use `idea.id` as the key for better performance
          index={index}
          updateIdeaVote={updateIdeaVote} // Pass the function as a prop
        />
      ))}
    </div>
  );
};

export default IdeaList;
