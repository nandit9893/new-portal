import Image from "next/image";

const Header = () => {
  return (
    <header className="bg-black text-white py-4 px-6 flex flex-col md:flex-row justify-between items-center">
      <h1 className="text-2xl font-bold text-center md:text-left">
        MY APPLICATION
      </h1>
      {/* <div className="w-16 h-16 rounded-full overflow-hidden mt-4 md:mt-0">
        <Image
          src="/logo.jpg"
          alt="Profile Picture"
          width={64}
          height={64}
          className="object-cover"
        />
      </div> */}
    </header>
  );
};

export default Header;
