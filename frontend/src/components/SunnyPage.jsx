const SunnyPage = ({
  title,
  subtitle,
  children,
  maxWidth = "max-w-6xl",
}) => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-yellow-200 via-orange-100 to-amber-200 px-4 py-10 sm:px-6">
      <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-yellow-300/30 blur-3xl" />
      <div className="absolute right-0 top-32 h-[28rem] w-[28rem] rounded-full bg-orange-300/25 blur-3xl" />
      <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-amber-300/25 blur-3xl" />

      <div className={`relative mx-auto ${maxWidth}`}>
        {(title || subtitle) && (
          <header className="mb-8 rounded-[2rem] border border-white/50 bg-white/45 p-6 shadow-xl backdrop-blur-md">
            {title && (
              <h1 className="text-3xl font-black text-orange-950 sm:text-4xl">
                {title}
              </h1>
            )}

            {subtitle && (
              <p className="mt-2 max-w-2xl text-orange-900">{subtitle}</p>
            )}
          </header>
        )}

        {children}
      </div>
    </div>
  );
};

export default SunnyPage;
