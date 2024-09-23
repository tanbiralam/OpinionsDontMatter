import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Tabs = () => {
  const params = useLocation();
  const [activeTab, setActiveTab] = useState(params.hash || "#hot"); // Default to #hot

  useEffect(() => {
    // Only set activeTab if the hash changes
    if (params.hash) {
      setActiveTab(params.hash);
    }
  }, [params.hash]);

  return (
    <div className="flex justify-center space-x-2 mt-2">
      <a
        role="tab"
        onClick={() => setActiveTab("#hot")}
        className={`flex items-center justify-center px-4 py-2 rounded-lg transition-all duration-300 ease-in-out ${
          activeTab === "#hot"
            ? "bg-[#646EE4] text-white shadow-lg"
            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
        }`}
        href="/#hot"
      >
        🔥Hot
      </a>
      <a
        role="tab"
        onClick={() => setActiveTab("#new")}
        className={`flex items-center justify-center px-4 py-2 rounded-lg transition-all duration-300 ease-in-out ${
          activeTab === "#new"
            ? "bg-[#646EE4] text-white shadow-lg"
            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
        }`}
        href="/#new"
      >
        👽New
      </a>
      <a
        role="tab"
        onClick={() => setActiveTab("#top")}
        className={`flex items-center justify-center px-4 py-2 rounded-lg transition-all duration-300 ease-in-out ${
          activeTab === "#top"
            ? "bg-[#646EE4] text-white shadow-lg"
            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
        }`}
        href="/#top"
      >
        🔝Top
      </a>
    </div>
  );
};

export default Tabs;
