import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaPlus, FaCheck } from 'react-icons/fa';
import { useToast } from '@chakra-ui/react';

const AddTestForm = () => {
  const [testName, setTestName] = useState('');
  const [questions, setQuestions] = useState([{ questionText: '', options: ['', '', '', ''], correctAnswer: '' }]);
  const [isFormValid, setIsFormValid] = useState(true);
  const toast = useToast()

  const handleAddQuestion = () => {
    setQuestions([...questions, { questionText: '', options: ['', '', '', ''], correctAnswer: '' }]);
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, qIndex) => qIndex !== index);
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!testName || questions.some(q => !q.questionText || q.options.some(opt => !opt) || !q.correctAnswer)) {
      setIsFormValid(false);
      toast({
        duration: 7000,
        isClosable: true,
        status: "error",
        position: "top",
        title: "Testning barcha ma'lumotlarini kiriting!"
      })
      return;
    }

    const testData = { testName, questions };

    try {
      await axios.post('https://7b763fe74e4b87ba.mokky.dev/tests', testData);
      alert('Test muvaffaqiyatli saqlandi!');
      window.location.reload();
    } catch (error) {
      console.error('Testni saqlashda xatolik:', error);
    }
  };

  const handleOptionChange = (e, qIndex, optIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].correctAnswer = updatedQuestions[qIndex].options[optIndex];
    setQuestions(updatedQuestions);
  };

  return (
    <div className='min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center'>
      <motion.form 
        onSubmit={handleSubmit}
        className="bg-gray-800 border border-gray-700 shadow-lg rounded-lg p-8 w-[50%] max-md:w-full max-md:mx-5 relative"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl font-semibold text-white text-center mb-6">Yangi Test Yaratish</h2>

        <div className="mb-4">
          <label className="block text-gray-300 font-medium mb-2">Test Nomi</label>
          <input
            type="text"
            value={testName}
            onChange={(e) => setTestName(e.target.value)}
            className="w-full border border-gray-600 rounded-md p-3 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Test nomini kiriting"
          />
        </div>

        <div className="space-y-6 max-h-96 overflow-y-auto pr-2">
          {questions.map((question, qIndex) => (
            <motion.div 
              key={qIndex} 
              className="bg-gray-700 border border-gray-600 rounded-lg p-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-between items-center mb-4">
                <label className="text-gray-300 font-medium">Savol {qIndex + 1}</label>
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(qIndex)}
                  className="text-red-400 font-medium hover:text-red-500 transition-colors"
                >
                  O'chirish
                </button>
              </div>

              <input
                type="text"
                value={question.questionText}
                onChange={(e) => {
                  const updatedQuestions = [...questions];
                  updatedQuestions[qIndex].questionText = e.target.value;
                  setQuestions(updatedQuestions);
                }}
                className="w-full border border-gray-600 rounded-md p-3 mb-4 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Savolni kiriting"
              />

              <div className="space-y-3">
                {question.options.map((option, optIndex) => (
                  <div key={optIndex} className="flex items-center">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => {
                        const updatedQuestions = [...questions];
                        updatedQuestions[qIndex].options[optIndex] = e.target.value;
                        setQuestions(updatedQuestions);
                      }}
                      className="w-full border border-gray-600 rounded-md p-3 mr-3 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={`Tanlov ${optIndex + 1}`}
                    />
                    <input
                      type="radio"
                      name={`correctAnswer${qIndex}`}
                      checked={question.correctAnswer === option}
                      onChange={(e) => handleOptionChange(e, qIndex, optIndex)}
                      className="text-blue-500"
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-between mt-6">
          <motion.button
            type="button"
            onClick={handleAddQuestion}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaPlus className="mr-2" /> Savol qo'shish
          </motion.button>

          <motion.button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-md flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaCheck className="mr-2" /> Topshirish
          </motion.button>
        </div>

        <div className="flex justify-between mt-4 text-sm text-gray-400">
          <a href="/" className="hover:text-gray-300 transition-colors">Asosiy</a>
          <a href="/test" className="hover:text-gray-300 transition-colors">Barcha testlar</a>
        </div>
      </motion.form>
    </div>
  );
};

export default AddTestForm;