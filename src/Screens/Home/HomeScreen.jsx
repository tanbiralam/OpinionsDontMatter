import { useLocation } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { db } from "../../../utils";
import { Ideas } from "../../../utils/schema";
import { desc } from "drizzle-orm";
import { Hero, Tabs, OpinionList, Loading } from "./components";

function HomeScreen() {
  const params = useLocation();
  const [ideaList, setIdeaList] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading status

  // Use useCallback to memoize the fetchAllIdeas function
  const fetchAllIdeas = useCallback(async () => {
    try {
      setLoading(true); // Start loading
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
    } finally {
      setLoading(false); // End loading
    }
  }, [params.hash]);

  // Fetch ideas when component mounts or when params change
  useEffect(() => {
    fetchAllIdeas();
  }, [fetchAllIdeas]);

  return (
    <div className="flex flex-col gap-2 min-h-screen">
      <Hero />
      <Tabs />

      {loading ? (
        // Show a loader or message while loading
        <Loading />
      ) : (
        // Show IdeaList once loading is complete
        <OpinionList ideaList={ideaList} refreshData={fetchAllIdeas} />
      )}
    </div>
  );
}

export default HomeScreen;
