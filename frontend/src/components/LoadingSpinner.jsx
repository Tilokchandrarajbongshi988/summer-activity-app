import { ClipLoader } from "react-spinners";

const LoadingSpinner = ({ text = "Loading..." }) => {
  return (
    <div className="flex min-h-[220px] flex-col items-center justify-center gap-4 rounded-xl border-2 border-black bg-yellow-100 p-8 text-black">
      <ClipLoader color="#000000" size={42} />
      <p className="font-medium">{text}</p>
    </div>
  );
};

export default LoadingSpinner;
