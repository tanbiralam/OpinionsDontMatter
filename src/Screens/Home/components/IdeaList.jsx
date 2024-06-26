import IdeaItem from "./IdeaItem";

const IdeaList = ({ ideaList }) => {
  return (
    <div>
      {ideaList.map((idea, index) => (
        <IdeaItem idea={idea} key={index} index={index} />
      ))}
    </div>
  );
};

export default IdeaList;
