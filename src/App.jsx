import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import { ThemeContext } from "./context/ThemeContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NewIdea from "./components/NewIdea";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Hero />,
  },
  {
    path: "/new",
    element: <NewIdea />,
  },
]);

const App = () => {
  const [theme, setTheme] = useState("winter");

  return (
    <>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <Header />
        <div
          className="flex flex-col items-center p-4 md:p-10"
          data-theme={theme}
        >
          <div className="max-w-2xl w-full items-center">
            <RouterProvider router={router} />
          </div>
        </div>
      </ThemeContext.Provider>
    </>
  );
};

export default App;
