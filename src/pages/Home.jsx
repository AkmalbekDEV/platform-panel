import React from 'react';
import { motion } from 'framer-motion';
import { FiBookOpen, FiUsers, FiClipboard } from 'react-icons/fi';

const Home = () => {
  return (
    <div className='min-h-screen w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center'>
      <motion.div 
        className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4 md:p-6 lg:p-8'
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.2 }}
      >
        {/* Testlar bo'limi */}
        <motion.a 
          href='/addTest' 
          className='relative p-6 sm:p-8 md:p-10 bg-purple-700 rounded-2xl shadow-lg hover:shadow-2xl hover:bg-purple-800 transition-all duration-300 text-white text-center cursor-pointer group'
          whileHover={{ scale: 1.05, rotate: 2 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className='flex flex-col items-center'>
            <FiClipboard className='h-12 w-12 sm:h-16 sm:w-16 text-white group-hover:text-yellow-400 transition duration-300'/>
            <h3 className='text-2xl sm:text-3xl font-bold mt-4'>Testlar</h3>
            <p className='text-sm sm:text-base text-gray-300 mt-2 group-hover:text-yellow-300'>Testlar bilan ishlash</p>
          </div>
          <div className='absolute inset-0 bg-purple-900 opacity-0 group-hover:opacity-25 transition-opacity duration-300 rounded-2xl'></div>
        </motion.a>

        {/* O'quvchilar bo'limi */}
        <motion.a 
          href='/users' 
          className='relative p-6 sm:p-8 md:p-10 bg-blue-700 rounded-2xl shadow-lg hover:shadow-2xl hover:bg-blue-800 transition-all duration-300 text-white text-center cursor-pointer group'
          whileHover={{ scale: 1.05, rotate: 2 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className='flex flex-col items-center'>
            <FiUsers className='h-12 w-12 sm:h-16 sm:w-16 text-white group-hover:text-pink-400 transition duration-300'/>
            <h3 className='text-2xl sm:text-3xl font-bold mt-4'>O'quvchilar</h3>
            <p className='text-sm sm:text-base text-gray-300 mt-2 group-hover:text-pink-300'>O'quvchilarni boshqarish</p>
          </div>
          <div className='absolute inset-0 bg-blue-900 opacity-0 group-hover:opacity-25 transition-opacity duration-300 rounded-2xl'></div>
        </motion.a>

        {/* Kitoblar bo'limi */}
        <motion.a 
          href='/books' 
          className='relative p-6 sm:p-8 md:p-10 bg-green-700 rounded-2xl shadow-lg hover:shadow-2xl hover:bg-green-800 transition-all duration-300 text-white text-center cursor-pointer group'
          whileHover={{ scale: 1.05, rotate: 2 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className='flex flex-col items-center'>
            <FiBookOpen className='h-12 w-12 sm:h-16 sm:w-16 text-white group-hover:text-red-400 transition duration-300'/>
            <h3 className='text-2xl sm:text-3xl font-bold mt-4'>Kitoblar</h3>
            <p className='text-sm sm:text-base text-gray-300 mt-2 group-hover:text-red-300'>Kitoblarni boshqarish</p>
          </div>
          <div className='absolute inset-0 bg-green-900 opacity-0 group-hover:opacity-25 transition-opacity duration-300 rounded-2xl'></div>
        </motion.a>
      </motion.div>
    </div>
  );
};

export default Home;