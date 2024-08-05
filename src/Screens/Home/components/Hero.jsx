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
    <div className="my-10 flex flex-col items-center gap-5">
      {/* Header Section */}
      <div className="mt-5 flex flex-col md:flex-row justify-between items-center gap-5 shadow-lg p-4 border rounded-lg w-full max-w-2xl mx-auto">
        <button
          onClick={() => navigation("/new")}
          className="btn text-white btn-primary btn-sm md:btn-md"
        >
          + New Rant
        </button>
        <h1 className="font-bold text-2xl md:text-3xl leading-tight text-center md:text-left">
          PointlessPoints
        </h1>
      </div>

      {/* Lottie Animation Section */}
      <div className="mt-5 w-full max-w-xs">
        <Lottie options={defaultOptions} height={150} width={150} />
      </div>

      {/* Hero Text Section */}
      <h2 className="text-3xl font-bold text-center mt-5">
        Opinions That No One Asked For!!!
      </h2>
      <h2 className="text-xl text-center my-3">
        <strong className="text-red-100 text-2xl">
          Because your opinion totally matters.
        </strong>{" "}
        Share your most controversial takes, even if no one cares.
        <p className="text-sm font-semibold">No Account Needed.</p>
      </h2>
    </div>
  );
};

export default Hero;
