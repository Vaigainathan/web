const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 flex items-center justify-between w-full h-14 px-8 py-4 bg-[#FEF0D5]  z-50">
      <div className="flex-shrink-0">
        <h1 className="text-2xl text-[#002F49] font-bold pl-20">Equadator</h1>
      </div>
      <div className="flex items-center space-x-8 pr-16 text-[#FEF0D5]">
        <button className="px-6 py-2 bg-[#002F49] rounded-full hover:scale-105 transition-transform duration-200 ">Login</button>
        <button className="px-6 py-2 bg-[#002F49] rounded-full hover:scale-105 transition-transform duration-200">Sign Up</button>
      </div>
      
    </nav>
  );
};

export default Navbar;