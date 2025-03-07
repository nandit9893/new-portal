const Hero = () => {
  return (
    <div
      className="relative w-full h-[400px] flex items-center justify-center text-white text-center"
      style={{
        backgroundImage: "url('/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-75"></div>
      <h1 className="relative text-4xl md:text-5xl lg:text-6xl font-bold z-10">
        Jobs
      </h1>
    </div>
  );
};

export default Hero;
