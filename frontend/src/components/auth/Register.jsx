// src/components/Register.jsx
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../../services/api';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirm_password: ''
  });
  
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [touched, setTouched] = useState({});
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // Allows letters, numbers, and only these special characters: !@#$%^&*
    const passwordRegex = /^[A-Za-z0-9!@#$%^&*]{8,15}$/;
    return passwordRegex.test(password);
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({
      ...touched,
      [name]: true
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be 8-15 characters long and contain only letters and numbers';
    }

    if (!formData.confirm_password) {
      newErrors.confirm_password = 'Please confirm your password';
    } else if (formData.password !== formData.confirm_password) {
      newErrors.confirm_password = 'Passwords do not match';
    }

    setErrors(newErrors);
    setTouched({
      username: true,
      email: true,
      password: true,
      confirm_password: true
    });
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fill in all required fields correctly', {
        position: "top-center",
        autoClose: 2000
      });
      return;
    }

    try {
        await registerUser(formData);
        setIsSuccess(true);
        setError('');
        // Wait for 2 seconds to show success message before redirecting
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } catch (err) {
        setError(err.message || 'Registration failed');
        setIsSuccess(false);
      }

  };

  const getInputClassName = (fieldName) => {
    const baseClasses = "w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#F8D5CC] focus:border-transparent transition-all";
    return `${baseClasses} ${
      touched[fieldName] && errors[fieldName]
        ? "border-red-500 bg-red-50"
        : "border-gray-200"
    }`;
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gradient-to-br from-[#F5F1E3] to-[#E5E1D3]">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />


      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.5 }}
        className="w-[450px] bg-white rounded-xl shadow-2xl overflow-hidden"
      >
        <div className="flex justify-between items-center p-4 bg-gradient-to-r from-[#F8D5CC] to-[#F0C5BC]">
          <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
          <div className="flex space-x-2">
            <motion.div whileHover={{ scale: 1.2 }} className="w-3 h-3 rounded-full bg-red-400"></motion.div>
            <motion.div whileHover={{ scale: 1.2 }} className="w-3 h-3 rounded-full bg-yellow-400"></motion.div>
            <motion.div whileHover={{ scale: 1.2 }} className="w-3 h-3 rounded-full bg-green-400"></motion.div>
          </div>
        </div>

        {error && <div className="register-error-message">{error}</div>}

        {isSuccess && <div className="register-success-message">Registration successful! Redirecting to login...</div>}
          
        
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div variants={fadeIn} transition={{ delay: 0.1 }}>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Username <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                onBlur={handleBlur}
                className={getInputClassName('username')}
                required
              />
              {touched.username && errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
              )}
            </motion.div>

            <motion.div variants={fadeIn} transition={{ delay: 0.2 }}>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={getInputClassName('email')}
                required
              />
              {touched.email && errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </motion.div>

            <motion.div variants={fadeIn} transition={{ delay: 0.3 }}>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClassName('password')}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {touched.password && errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </motion.div>

            <motion.div variants={fadeIn} transition={{ delay: 0.4 }}>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirm_password"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClassName('confirm_password')}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {touched.confirm_password && errors.confirm_password && (
                <p className="text-red-500 text-sm mt-1">{errors.confirm_password}</p>
              )}
            </motion.div>

            <div className="flex space-x-4 pt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="flex-1 bg-gradient-to-r from-[#F8D5CC] to-[#F0C5BC] text-gray-800 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
              >
                Register
              </motion.button>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1"
              >
                <Link
                  to="/login"
                  className="block w-full bg-gradient-to-r from-[#A4C3C9] to-[#93B2B8] text-white py-3 rounded-lg font-semibold text-center shadow-md hover:shadow-lg transition-all"
                >
                  Login
                </Link>
              </motion.div>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
