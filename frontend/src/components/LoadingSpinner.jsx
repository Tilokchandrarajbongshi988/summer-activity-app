import { ClipLoader } from "react-spinners";

const LoadingSpinner = ({ text = "Loading..." }) => {
  return (
    <div className="flex min-h-[220px] flex-col items-center justify-center gap-4 rounded-2xl bg-white/60 p-8 text-orange-950 shadow backdrop-blur-md">
      <ClipLoader color="#ea580c" size={48} />
      <p className="font-bold">{text}</p>
    </div>
  );
};

export default LoadingSpinner;
