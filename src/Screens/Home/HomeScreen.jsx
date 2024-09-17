import { useLocation } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { db } from "../../../utils";
import { Ideas } from "../../../utils/schema";
import { desc } from "drizzle-orm";
import { Hero, Tabs, IdeaList } from "./components";

function HomeScreen() {
  const params = useLocation();
  const [ideaList, setIdeaList] = useState([]);

  // Use useCallback to memoize the fetchAllIdeas function
  const fetchAllIdeas = useCallback(async () => {
    try {
      const orderByField =
        params.hash === "#hot" || params.hash === "#top"
          ? Ideas.vote
          : Ideas.id;

      const result = await db
        .select()
        .from(Ideas)
        .orderBy(desc(orderByField))
        .limit(20);

      setIdeaList(result);
    } catch (error) {
      console.error("Error fetching ideas:", error);
    }
  }, [params.hash]); // Dependency array includes params.hash

  // Fetch ideas when component mounts or when params change
  useEffect(() => {
    fetchAllIdeas();
  }, [fetchAllIdeas]);

  return (
    <div className="flex flex-col gap-2 ">
      <Hero />
      <Tabs />
      <IdeaList ideaList={ideaList} refreshData={fetchAllIdeas} />
      <footer className="text-center mb-2 font-semibold">
        Built by{" "}
        <a href="https://x.com/iamtanbirr" target="_blank">
          @Tanbir
        </a>
      </footer>
    </div>
  );
}

export default HomeScreen;
