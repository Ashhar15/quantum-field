import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white relative overflow-hidden flex items-center justify-center">
      {/* Background pattern with low opacity */}
      <div className="absolute inset-0 opacity-5">
        <img 
          src="https://api.builder.io/api/v1/image/assets/TEMP/64c8c5d53c814df6e850e0b018f52d30032dbe5e?width=880" 
          alt="" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* AttendAce Logo */}
      <div className="absolute top-4 left-4 w-24 h-24">
        <img 
          src="https://api.builder.io/api/v1/image/assets/TEMP/6e371d1d09eabe84f6062dc9b95155b2b439e73e?width=304" 
          alt="AttendAce Logo" 
          className="w-full h-full object-contain mix-blend-plus-darker"
        />
      </div>

      <div className="text-center relative z-10 px-4">
        <h1 className="text-6xl font-bold text-attend-blue mb-4">404</h1>
        <h2 className="text-2xl font-serif text-black mb-4">Page Not Found</h2>
        <p className="text-lg text-gray-600 mb-8 font-inter">
          The page you're looking for doesn't exist in the<br />
          University Attendance Portal.
        </p>
        <a 
          href="/" 
          className="inline-block bg-attend-blue text-white font-inter px-8 py-3 rounded-full hover:bg-attend-blue-dark transition-colors"
        >
          Return to Login
        </a>
      </div>
    </div>
  );
};

export default NotFound;
