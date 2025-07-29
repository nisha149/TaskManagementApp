import { Link } from 'react-router-dom';
import heroImage from '../assets/images/hero-image.png';
import ParticlesBackground from '../components/ParticlesBackground';

function Home() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 text-center bg-secondary text-gray-800 overflow-hidden">
      {/* Background Particles */}
      <ParticlesBackground />

      {/* Main Content */}
      <div className="max-w-md w-full flex flex-col items-center animate-fade-in-down z-10">
        <img
          src={heroImage}
          alt="Hero"
          className="w-full max-w-md mb-6 object-contain"
        />

        <h1 className="text-4xl md:text-5xl font-extrabold text-primary">
          Your Perfect Task Manager
        </h1>

        <p className="mt-4 text-lg md:text-xl text-gray-600">
          Organize your life with ease and efficiency.
        </p>

       <div className="mt-6 flex gap-4">
  <Link
    to="/login"
    className="px-6 py-2 rounded-md bg-primary text-black font-semibold border border-black hover:bg-[#b25598] transition duration-300"
  >
    Login
  </Link>
  <Link
    to="/register"
    className="px-6 py-2 rounded-md bg-primary text-black font-semibold border border-black hover:bg-[#b25598] transition duration-300"
  >
    Register
  </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
