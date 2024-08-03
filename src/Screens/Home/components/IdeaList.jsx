/* eslint-disable react/prop-types */
import IdeaItem from "./IdeaItem";

const IdeaList = ({ ideaList, refreshData }) => {
  return (
    <div>
      {ideaList.map((idea, index) => (
        <IdeaItem
          idea={idea}
          key={index}
          index={index}
          refreshData={refreshData}
        />
      ))}
    </div>
  );
};

export default IdeaList;
