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
      <div className="flex flex-col items-center h-full w-full bg-slate-950 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="max-w-2xl w-full">
          <RouterProvider router={router} />
        </div>
      </div>
    </>
  );
};

export default App;
