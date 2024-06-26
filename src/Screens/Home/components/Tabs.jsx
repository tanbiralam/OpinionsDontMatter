import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("");
  const params = useLocation();

  useEffect(() => {
    setActiveTab(params.hash);
  }, [params]);

  return (
    <div role="tablist" className="tabs-bordered tabs">
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
