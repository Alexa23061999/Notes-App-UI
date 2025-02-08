
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../../services/api';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();



    try {
        const response = await loginUser(formData);
      
        if (response.access_token) { 
          localStorage.setItem('token', response.access_token); 
          localStorage.setItem('user_id', response.user_id);
          localStorage.setItem('username', response.username);

          navigate('/dashboard');
        } else {
          throw new Error("Invalid login response");
        }
      } catch (err) {
        console.error("Login Error:", err);
        
        toast.error(err.message || 'Login failed', { position: "top-center", duration: 3000 });
      
        setError(err.message || 'Login failed');
      }

  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gradient-to-br from-[#F5F1E3] to-[#E5E1D3]">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.5 }}
        className="w-[450px] bg-white rounded-xl shadow-2xl overflow-hidden"
      >
        <div className="flex justify-between items-center p-4 bg-gradient-to-r from-[#F8D5CC] to-[#F0C5BC]">
          <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
          <div className="flex space-x-2">
            <motion.div whileHover={{ scale: 1.2 }} className="w-3 h-3 rounded-full bg-red-400"></motion.div>
            <motion.div whileHover={{ scale: 1.2 }} className="w-3 h-3 rounded-full bg-yellow-400"></motion.div>
            <motion.div whileHover={{ scale: 1.2 }} className="w-3 h-3 rounded-full bg-green-400"></motion.div>
          </div>
        </div>
        
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              variants={fadeIn}
              transition={{ delay: 0.1 }}
            >
              <label className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#F8D5CC] focus:border-transparent transition-all"
                required
              />
            </motion.div>
            
            <motion.div
              variants={fadeIn}
              transition={{ delay: 0.2 }}
            >
              <label className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#F8D5CC] focus:border-transparent transition-all"
                required
              />
            </motion.div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm bg-red-50 p-3 rounded-lg"
              >
                {error}
              </motion.div>
            )}

            <div className="flex space-x-4 pt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="flex-1 bg-gradient-to-r from-[#F8D5CC] to-[#F0C5BC] text-gray-800 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
              >
                Login
              </motion.button>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1"
              >
                <Link
                  to="/register"
                  className="block w-full bg-gradient-to-r from-[#A4C3C9] to-[#93B2B8] text-white py-3 rounded-lg font-semibold text-center shadow-md hover:shadow-lg transition-all"
                >
                  Register
                </Link>
              </motion.div>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;