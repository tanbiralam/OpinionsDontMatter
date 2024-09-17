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
        <h1 className="font-bold text-2xl md:text-3xl text-center md:text-left">
          PointlessPoints
        </h1>
        <button
          onClick={() => navigation("/new")}
          className="btn btn-primary text-white text-sm md:text-base"
        >
          + New Opinion
        </button>
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
          </strong>
          Share your most controversial takes, even if no one cares.
        </h2>
        <p className="text-sm font-bold mt-2 text-emerald-300">
          No Account Needed.
        </p>
      </div>
    </div>
  );
};

export default Hero;
