import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Header = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  // Function to check authentication status
  const checkAuthStatus = () => {
    setIsAuthenticated(!!localStorage.getItem('token'));
  };

  // Run every second to check auth status
  useEffect(() => {
    const interval = setInterval(checkAuthStatus, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('username');
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');

    checkAuthStatus(); // Update state immediately
    navigate('/login'); // Redirect to login page
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-gradient-to-r from-[#A4C3C9] to-[#8BA7AD] p-4 shadow-lg"
    >
      <div className="container mx-auto flex justify-between items-center">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link to="/" className="text-2xl font-bold text-white">
            Keep Notes
          </Link>
        </motion.div>
        
        <nav className="space-x-8">
          {['About', 'Notes', 'Account'].map((item) => (
            <motion.div
              key={item}
              className="inline-block"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              <Link
                to={`/${item.toLowerCase()}`}
                className="text-white hover:text-gray-200 font-medium transition-colors"
              >
                {item}
              </Link>
            </motion.div>
          ))}

          {/* Login / Logout Button */}
          <motion.div className="inline-block" whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
            {isAuthenticated ? (
              <button 
                onClick={handleLogout} 
                className="text-white hover:text-gray-200 font-medium transition-colors"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className="text-white hover:text-gray-200 font-medium transition-colors">
                Login
              </Link>
            )}
          </motion.div>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;

