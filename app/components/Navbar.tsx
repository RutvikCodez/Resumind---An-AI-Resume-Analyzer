import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav className="flex flex-row justify-between items-center bg-white rounded-full py-4 w-full max-w-7xl mx-auto px-10">
      <Link to={"/"}>
        <p className="text-2xl font-bold text-gradient">RESUMIND</p>
      </Link>
      <Link to={"/"} className="primary-button w-fit">
        Upload Resume
      </Link>
    </nav>
  );
};

export default Navbar;
