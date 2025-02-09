import { Link } from "react-router-dom";
import { FaTwitter, FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa"; 

function Footer() {
  return (
    <footer className="bg-gradient-to-r bg-blue-950 text-white py-10">
      <div className="container mx-auto flex flex-col items-center text-center space-y-6">

        <h1 className="text-3xl font-bold tracking-wide">MoviePulse</h1>

        <nav className="flex space-x-6 text-lg">
          <Link to="/about" className="hover:text-yellow-300 transition duration-200">About</Link>
        </nav>

        <div className="flex space-x-6 text-2xl">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition">
            <FaTwitter />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition">
            <FaLinkedin />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition">
            <FaInstagram />
          </a>
          <a href="https://github.com/Vishnu-raghav" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition">
            <FaGithub />
          </a>
        </div>

        <p className="text-sm opacity-85">
          📍 Location: Mumbai, India
        </p>

        <p className="text-sm opacity-75">
          © {new Date().getFullYear()} MoviePulse. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
