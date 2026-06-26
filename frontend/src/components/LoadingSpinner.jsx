import { ClipLoader } from "react-spinners";

const LoadingSpinner = ({ text = "Loading..." }) => {
  return (
    <div className="flex min-h-[220px] flex-col items-center justify-center gap-4 rounded-xl border border-gray-200 bg-white p-8 text-gray-700 shadow-sm">
      <ClipLoader color="#374151" size={42} />
      <p className="font-medium">{text}</p>
    </div>
  );
};

export default LoadingSpinner;
