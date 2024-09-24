import { useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import animationData from "../../../assets/logo-animation.json"; // Update path as needed

const Hero = () => {
  const navigation = useNavigate();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="flex flex-col items-center gap-8 mx-2 sm:mx-0">
      {/* Header Section */}
      <div className="mt-3 flex justify-between items-center gap-5 p-4 shadow-lg border rounded-lg w-full max-w-2xl mx-4 md:mx-0">
        <h1 className="font-bold text-white text-sm md:text-3xl text-center md:text-left">
          OpinionsDon&rsquo;tMatter
        </h1>
        <button
          onClick={() => navigation("/new")}
          className="btn btn-primary text-white text-sm md:text-base"
        >
          + New Opinion
        </button>
      </div>

      {/* Product Hunt Badge */}
      <div className="mt-4">
        <a
          href="https://www.producthunt.com/posts/opinionsdon-tmatter?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-opinionsdon&#0045;tmatter"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=491616&theme=dark"
            alt="OpinionsDon’tMatter - Opinions That No One Asked For!!! | Product Hunt"
            style={{ width: "250px", height: "54px" }}
          />
        </a>
      </div>

      {/* Lottie Animation Section */}
      <div className="mt-6 w-full max-w-xs">
        <Lottie options={defaultOptions} height={150} width={150} />
      </div>

      {/* Hero Text Section */}
      <div className="text-center space-y-4">
        <h2 className="text-xl sm:text-4xl font-bold mt-5">
          Opinions That No One Asked For!!!
        </h2>
        <h2 className="text-lg sm:text-2xl">
          <strong className="text-white text-xl sm:text-2xl">
            Because your opinion totally matters.
          </strong>{" "}
          Share your most controversial takes, even if no one cares.
        </h2>
        <p className="text-sm font-bold mt-2 text-emerald-300 underline underline-offset-2">
          No Account Needed.
        </p>
        <p className="text-sm font-bold mt-2 text-red-300 underline underline-offset-2">
          You can share only one opinion every 5 minutes.
        </p>
        <p className="text-sm mt-2 font-bold text-gray-500">
          Click 🔥 if you agree or 💩 if you disagree. Your feedback helps!
        </p>
      </div>
    </div>
  );
};

export default Hero;
