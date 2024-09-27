import React, { createContext, useState, useContext } from 'react';

// Test context
const TestContext = createContext();

// Context provider component
export const TestProvider = ({ children }) => {
  const [test, setTest] = useState(null);

  const saveTest = (testData) => {
    setTest(testData);
  };

  return (
    <TestContext.Provider value={{ test, saveTest }}>
      {children}
    </TestContext.Provider>
  );
};

// Custom hook to use the TestContext
export const useTest = () => useContext(TestContext);