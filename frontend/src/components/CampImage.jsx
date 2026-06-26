const CampImage = ({ src, alt, className = "h-44", rounded = "" }) => {
  const frameClassName = `relative overflow-hidden bg-gray-100 ${className} ${rounded}`;

  if (!src) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-200 text-gray-500 ${className} ${rounded}`}
      >
        No image
      </div>
    );
  }

  return (
    <div className={frameClassName}>
      <img
        src={src}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full scale-110 object-cover opacity-60 blur-xl"
      />

      <div className="absolute inset-0 bg-white/20" />

      <img
        src={src}
        alt={alt}
        className="relative z-10 h-full w-full object-contain"
      />
    </div>
  );
};

export default CampImage;
