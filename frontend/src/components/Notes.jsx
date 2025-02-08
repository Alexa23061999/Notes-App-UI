import { motion } from "framer-motion";
import { useState } from "react";

const Notes = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    notes: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Simulating an API request (Replace with actual API call)
      console.log("Submitting:", formData);
      onClose(); // Close modal on success
    } catch (err) {
      setError("Something went wrong!");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-[500px] bg-white rounded-xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex justify-between items-center border-2 border-green-600 rounded-t-xl bg-gradient-to-r from-[#F8D5CC] to-[#F0C5BC] p-4">
          <h2 className="font-bold text-gray-800">Add Notes</h2>
          <motion.div
            whileHover={{ scale: 1.2, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white cursor-pointer shadow-md hover:bg-red-600 transition-all"
          >
            ✕
          </motion.div>
        </div>

        {/* Form */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Input */}
            <motion.div transition={{ delay: 0.1 }}>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
                className="w-full px-4 py-3 border-2 border-green-600 rounded-lg focus:ring-2 focus:ring-[#F8D5CC] focus:border-transparent transition-all"
                required
              />
            </motion.div>

            {/* Notes Textarea */}
            <motion.div transition={{ delay: 0.2 }}>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Type a text here"
                className="w-full h-[200px] px-4 py-3 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-[#F8D5CC] focus:border-transparent transition-all"
                required
              />
            </motion.div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm bg-red-50 p-3 rounded-lg"
              >
                {error}
              </motion.div>
            )}

            {/* Buttons */}
            <div className="flex space-x-4 pt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="flex-1 bg-green-500 text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
              >
                Add
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="flex-1 bg-red-500 text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
              >
                Cancel
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Notes;




