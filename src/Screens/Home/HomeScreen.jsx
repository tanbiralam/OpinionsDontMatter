import { useLocation } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { db } from "../../../utils";
import { Ideas } from "../../../utils/schema";
import { desc, gte, lt } from "drizzle-orm";
import { Hero, Tabs, OpinionList, Loading } from "./components";

function HomeScreen() {
  const params = useLocation();
  const [ideaList, setIdeaList] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading status

  // Function to fetch ideas based on the tab selected
  const fetchAllIdeas = useCallback(async () => {
    try {
      setLoading(true); // Start loading
      let result;

      // Determine what data to fetch based on the tab selected
      const hash = params.hash || "#hot"; // Default to "#hot" if no hash

      switch (hash) {
        case "#hot":
          // Fetch the latest opinions with less than 5 upvotes (hot)
          result = await db
            .select()
            .from(Ideas)
            .where(lt(Ideas.vote, 5)) // Filter for votes < 5
            .orderBy(desc(Ideas.id)) // Sort by creation date (latest first)
            .limit(10); // Limit to 10
          break;
        case "#new":
          // Fetch all newly added opinions (new)
          result = await db
            .select()
            .from(Ideas)
            .orderBy(desc(Ideas.id)) // Sorting by creation date (latest first)
            .limit(10); // Limit to 10
          break;

        case "#top":
          // Fetch all opinions with more than 5 upvotes (top)
          result = await db
            .select()
            .from(Ideas)
            .where(gte(Ideas.vote, 5)) // Filter for votes >= 5
            .orderBy(desc(Ideas.vote)) // Sorting by votes (highest first)
            .limit(15); // Limit to 15
          break;

        default:
          result = []; // Default to empty if no tab is selected
          break;
      }

      // Update the state with fetched data
      setIdeaList(result);
    } catch (error) {
      console.error("Error fetching ideas:", error);
    } finally {
      setLoading(false); // End loading
    }
  }, [params.hash]);

  // Fetch ideas when component mounts or when params.hash changes
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
