// import * as Sentry from "@sentry/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeScreen from "./Screens/Home/HomeScreen";
import NewOpinion from "./Screens/NewIdea/NewOpinion";
import { Footer } from "./Screens/Home/components";

// TODO: FIX THE SENTRY
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeScreen />,
  },
  {
    path: "/new",
    element: <NewOpinion />,
  },
]);

const App = () => {
  return (
    <>
      <div className="flex flex-col items-center h-full w-full bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e3e,transparent)]">
        <div className="max-w-2xl w-full">
          <RouterProvider router={router} />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default App;
