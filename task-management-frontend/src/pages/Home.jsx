import { Link } from 'react-router-dom';
import heroImage from '../assets/images/hero-image.jpg';

function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-white text-black">
      <img
        src={heroImage}
        alt="Hero"
        className="w-full max-w-md mb-6 rounded-lg shadow-md"
      />
      <h1 className="text-3xl md:text-4xl font-bold text-[#52489f]">
        Your Perfect Task Manager
      </h1>
      <p className="mt-2 text-lg">
        Organize your life with ease and efficiency.
      </p>
      <div className="mt-4 flex space-x-6">
        <Link
          to="/login"
          className="underline text-[#52489f] hover:text-pink-400"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="underline text-[#52489f] hover:text-pink-400"
        >
          Register
        </Link>
      </div>
    </div>
  );
}

export default Home;

