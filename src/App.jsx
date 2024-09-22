import * as Sentry from "@sentry/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeScreen from "./Screens/Home/HomeScreen";
import NewOpinion from "./Screens/NewIdea/NewOpinion";

Sentry.init({
  dsn: "https://19d226ef723aac5babf51c624d8a2be3@o4507923141754880.ingest.de.sentry.io/4507975061143632",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

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
      <div className="flex flex-col items-center h-full w-full bg-slate-950 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="max-w-2xl w-full">
          <RouterProvider router={router} />
        </div>
      </div>
    </>
  );
};

export default App;
