import { useState } from "react";
import { ThemeContext } from "./context/ThemeContext";
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
  const [theme, setTheme] = useState("winter");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div
        className="flex flex-col items-center p-4 md:p-10"
        data-theme={theme}
      >
        <div className="max-w-2xl w-full items-center">
          <RouterProvider router={router} />
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
