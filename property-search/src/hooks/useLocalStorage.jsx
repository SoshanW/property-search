import { useState, useEffect } from 'react';

const useLocalStorage = (key, initialValue) => {

  // Get initial values from localStorage or use provided initalValue
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    }catch (error){
      console.log(error);
      return initialValue;
    }
  });

  // Update localStorage when value changes
  useEffect(() => {
    try{
      window.localStorage.setItem(key, JSON.stringify(value));
    }catch (error){
      console.log(error);
    }
  }, [key, value]);

  return[value, setValue];

};

export default useLocalStorage;