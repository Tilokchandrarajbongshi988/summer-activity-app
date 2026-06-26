const SunnyPage = ({
  title,
  subtitle,
  children,
  maxWidth = "max-w-6xl",
}) => {
  return (
    <div className="min-h-screen bg-yellow-100 px-4 py-8 sm:px-6">
      <div className={`mx-auto ${maxWidth}`}>
        {(title || subtitle) && (
          <header className="mb-6 rounded-xl border-2 border-black bg-white p-6">
            {title && (
              <h1 className="text-3xl font-bold text-black sm:text-4xl">
                {title}
              </h1>
            )}

            {subtitle && (
              <p className="mt-2 max-w-2xl text-black/70">{subtitle}</p>
            )}
          </header>
        )}

        {children}
      </div>
    </div>
  );
};

export default SunnyPage;
