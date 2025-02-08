// src/components/Login.jsx
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const EditNotes = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    notes: ''
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
      if (response.token) {
        localStorage.setItem('token', response.token);
        navigate('/notes');
      }
    } catch (err) {
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
        className="w-[500px] bg-white rounded-xl shadow-2xl overflow-hidden"
      >
        <div className="flex justify-between items-center border-2 border-[rgb(139,167,16)] rounded-t-[12px]  bg-gradient-to-r from-[#F8D5CC] to-[#F0C5BC]">
          <h2 className="font-bold text-gray-800 ml-[20px]"></h2>
          <div className="flex space-x-2">
            <motion.div whileHover={{ scale: 1.2, rotate: 90 }} whileTap={{ scale: 0.9 }}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white cursor-pointer shadow-md hover:bg-red-600 transition-all mr-[20px]"
            > ✕
            </motion.div>
          </div>
        </div>
        
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
           
            <motion.div
            variants={fadeIn}
            transition={{ delay: 0.2 }}
            >
            <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Type a text here"
                className="w-full h-[200px] px-4 py-3 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-[#F8D5CC] focus:border-transparent transition-all"
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
                className="flex-1 bg-gradient-to-r from-green-500 to-green-500 text-gray-800 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
              >
                Save
              </motion.button>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1"
              >
                <Link
                    to="/cancel"
                    className="block w-full bg-gradient-to-r from-red-500 to-red-500 text-white py-3 rounded-lg font-semibold text-center shadow-md hover:shadow-lg transition-all"
                >
                  Delete
                </Link>
              </motion.div>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default EditNotes;


