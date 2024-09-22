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
    <div role="tablist" className="tabs-bordered tabs mt-2">
      <a
        role="tab"
        onClick={() => setActiveTab("#hot")}
        className={`tab text-lg font-bold ${
          activeTab === "#hot" && "tab-active"
        }`}
        href="/#hot"
      >
        🔥Hot
      </a>
      <a
        role="tab"
        onClick={() => setActiveTab("#new")}
        className={`tab text-lg font-bold ${
          activeTab === "#new" && "tab-active"
        }`}
        href="/#new"
      >
        👽New
      </a>
      <a
        role="tab"
        onClick={() => setActiveTab("#top")}
        className={`tab text-lg font-bold ${
          activeTab === "#top" && "tab-active"
        }`}
        href="/#top"
      >
        🔝Top
      </a>
    </div>
  );
};

export default Tabs;
