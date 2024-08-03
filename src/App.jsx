import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeScreen from "./Screens/Home/HomeScreen";
import NewPrompt from "./Screens/NewIdea/NewPrompt";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeScreen />,
  },
  {
    path: "/new",
    element: <NewPrompt />,
  },
]);

const App = () => {
  return (
    <>
      <div className="flex flex-col items-center p-4 md:p-10">
        <div className="max-w-2xl w-full">
          <RouterProvider router={router} />
        </div>
      </div>
    </>
  );
};

export default App;
