const IdeaItem = ({ idea, index }) => {
  return (
    <div className="my-5 p-5 border shadow-lg rounded-lg">
      <div className="flex justify-between">
        <h2 className="flex-grow">
          <span className="font-semibold">{index + 1}. </span>
          {idea?.content}
        </h2>
        <div className="flex flex-col items-center justify-between ml-7">
          <h2 className="text-lg hover:bg-gray-200 rounded-md p-1 cursor-pointer">
            🔥
          </h2>
          <h2 className="text-lg rounded-md p-1">{idea.vote}</h2>
          <h2 className="text-lg hover:bg-gray-200 rounded-md p-1 cursor-pointer">
            👎
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
