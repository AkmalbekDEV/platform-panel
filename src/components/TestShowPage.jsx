import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

Modal.setAppElement('#root');

const TestShowPage = () => {
  const navigate = useNavigate();
  const [tests, setTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editTestData, setEditTestData] = useState({
    id: '',
    testName: '',
    questions: []
  });

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await axios.get('https://7b763fe74e4b87ba.mokky.dev/tests');
        setTests(response.data);
      } catch (error) {
        console.error('Error fetching tests:', error);
      }
    };

    fetchTests();
  }, []);

  const openModal = (test) => {
    setSelectedTest(test);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTest(null);
  };

  // Tahrirlash modalini ochish
  const openEditModal = (test) => {
    setEditTestData({
      id: test.id,
      testName: test.testName,
      questions: test.questions
    });
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditTestData({
      id: '',
      testName: '',
      questions: []
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditTestData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Savollarni tahrirlash uchun
  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...editTestData.questions];
    if (field === 'options') {
      updatedQuestions[index][field] = value;
    } else {
      updatedQuestions[index][field] = value;
    }
    setEditTestData((prevData) => ({
      ...prevData,
      questions: updatedQuestions
    }));
  };

  const addQuestion = () => {
    setEditTestData((prevData) => ({
      ...prevData,
      questions: [...prevData.questions, { questionText: '', options: ['', '', '', ''] }]
    }));
  };

  const deleteQuestion = (index) => {
    const updatedQuestions = [...editTestData.questions];
    updatedQuestions.splice(index, 1);
    setEditTestData((prevData) => ({
      ...prevData,
      questions: updatedQuestions
    }));
  };

  const deleteTest = async (testId) => {
    try {
      await axios.delete(`https://7b763fe74e4b87ba.mokky.dev/tests/${testId}`);
      // O'chirilgan testni tests massivdan olib tashlash
      setTests((prevTests) => prevTests.filter((test) => test.id !== testId));
    } catch (error) {
      console.error('Error deleting test:', error);
    }
  };

  const submitEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://7b763fe74e4b87ba.mokky.dev/tests/${editTestData.id}`, editTestData);
      // Testni yangilash
      setTests((prevTests) =>
        prevTests.map((test) =>
          test.id === editTestData.id ? response.data : test
        )
      );
      alert("O'zgartirishlar muvaffaqiyatli kiritildi!");
      closeEditModal();
    } catch (error) {
      console.error('Error updating test:', error);
    }
  };

  if (tests.length === 0) return (
    <div className='h-screen w-full flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900'>
      <h1 className='text-white text-xl'>Hech qanday test mavjud emas. <a href="/addTest" className='text-blue-400 underline'>Test yarating</a></h1>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-6">
      {/* Header Qismi: Orqaga Qaytish Tugmasi va Sarlavha */}
      <div className="flex items-center mb-8">
        {/* Orqaga Qaytish Tugmasi */}
        <button
          className="mr-4 text-white hover:text-gray-300"
          onClick={() => navigate(-1)} // Oldingi sahifaga qaytish
          aria-label="Orqaga Qaytish"
        >
          <FaArrowLeft size={24} />
        </button>
        {/* Sarlavha */}
        <h1 className="text-3xl font-bold text-center text-white">Mavjud Testlar</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tests.map((test, testIndex) => (
          <motion.div
            key={testIndex}
            className="bg-gray-800 shadow-lg border border-gray-700 rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            whileHover={{ scale: 1.02 }}
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-center text-white">{test.testName}</h2>
              <p className="text-gray-300 text-center">
                Savollar soni: {test.questions.length}
              </p>
              <button
                className="transition-all mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full"
                onClick={() => deleteTest(test.id)}
              >
                Testni o'chirish
              </button>
              <button
                className="transition-all mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                onClick={() => openModal(test)}
              >
                Ko'rsatish
              </button>
              {/* Tahrirlash tugmasi */}
              <button
                className="transition-all mt-2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded w-full"
                onClick={() => openEditModal(test)}
              >
                Tahrirlash
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal Oynasi */}
      {selectedTest && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          className="relative mx-auto max-sm:mx-5 my-16 w-full h-[80%] max-w-2xl bg-gray-800 rounded-lg shadow-xl flex flex-col"
          overlayClassName="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center"
        >
          {/* Tepki Qismi: Test Nomi */}
          <div className="p-6 border-b border-gray-700 flex items-center">
            <button
              className="mr-4 text-white hover:text-gray-300"
              onClick={closeModal}
              aria-label="Orqaga Qaytish"
            >
              <FaArrowLeft size={20} />
            </button>
            <h2 className="text-2xl font-bold text-white">{selectedTest.testName}</h2>
          </div>

          {/* O'rtacha Qismi: Savollar */}
          <div className="p-6 flex-1 overflow-auto">
            {selectedTest.questions && selectedTest.questions.length > 0 ? (
              selectedTest.questions.map((question, qIndex) => (
                <div key={qIndex} className="mb-6">
                  <p className="font-semibold mb-2 text-white">
                    Savol {qIndex + 1}: {question.questionText}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    {question.options.map((option, optIndex) => (
                      <label
                        key={optIndex}
                        className="cursor-pointer bg-gray-700 py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200"
                      >
                        <input
                          type="radio"
                          name={`question${qIndex}`}
                          value={option}
                          className="hidden"
                        />
                        <span className="text-gray-300">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-300">Savollar mavjud emas</p>
            )}
          </div>

          {/* Pastki Qismi: Tugmalar */}
          <div className="p-6 border-t border-gray-700 flex justify-end">
            <button
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={closeModal}
            >
              Yopish
            </button>
          </div>
        </Modal>
      )}

      {/* Tahrirlash Modal Oynasi */}
      {isEditModalOpen && (
        <Modal
          isOpen={isEditModalOpen}
          onRequestClose={closeEditModal}
          className="relative mx-auto max-sm:mx-5 my-16 w-full h-[80%] max-w-3xl bg-gray-800 rounded-lg shadow-xl flex flex-col"
          overlayClassName="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center"
        >
          {/* Header Qismi: Sarlavha */}
          <div className="p-6 border-b border-gray-700 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Testni Tahrirlash</h2>
            {/* Orqaga Qaytish Tugmasi */}
            <button
              className="text-white hover:text-gray-300"
              onClick={closeEditModal}
              aria-label="Orqaga Qaytish"
            >
              <FaArrowLeft size={20} />
            </button>
          </div>

          {/* Content Qismi: Tahrirlash Formasi */}
          <div className="p-6 flex-1 overflow-auto">
            <form onSubmit={submitEdit}>
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Test nomi:</label>
                <input
                  type="text"
                  name="testName"
                  value={editTestData.testName}
                  onChange={handleEditChange}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                  required
                />
              </div>

              <div>
                <h3 className="text-xl text-white mb-2">Savollar:</h3>
                {editTestData.questions.map((question, qIndex) => (
                  <div key={qIndex} className="mb-6 border-b border-gray-600 pb-4">
                    <div className="flex justify-between items-center">
                      <h4 className="text-lg text-gray-300">Savol {qIndex + 1}</h4>
                      <button
                        type="button"
                        className="text-red-500 hover:text-red-600"
                        onClick={() => deleteQuestion(qIndex)}
                      >
                        O'chirish
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="Savol matni"
                      value={question.questionText}
                      onChange={(e) => handleQuestionChange(qIndex, 'questionText', e.target.value)}
                      className="w-full p-2 mt-2 rounded bg-gray-700 text-white"
                      required
                    />
                    <div className="mt-4">
                      {question.options.map((option, optIndex) => (
                        <input
                          key={optIndex}
                          type="text"
                          placeholder={`Variant ${optIndex + 1}`}
                          value={option}
                          onChange={(e) => {
                            const updatedOptions = [...question.options];
                            updatedOptions[optIndex] = e.target.value;
                            handleQuestionChange(qIndex, 'options', updatedOptions);
                          }}
                          className="w-full p-2 mt-2 rounded bg-gray-700 text-white"
                          required
                        />
                      ))}
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  className="mt-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  onClick={addQuestion}
                >
                  Savol Qo'shish
                </button>
              </div>
            </form>
          </div>

          {/* Footer Qismi: Tugmalar */}
          <div className="p-6 border-t border-gray-700 flex justify-end">
            <button
              type="button"
              className="mr-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={closeEditModal}
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              form="editForm" // Agar form identifikatori berilsa
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={submitEdit} // Alternativ ravishda form submit qilish
            >
              Saqlash
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default TestShowPage;