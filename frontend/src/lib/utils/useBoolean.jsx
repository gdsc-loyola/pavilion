import { useState } from 'react';

/**
 * @description A generic boolean switch hook
 * @param {boolean} defaultValue
 */
export const useBoolean = (defaultValue) => {
  const [value, setValue] = useState(!!defaultValue);

  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);
  const toggle = () => setValue((x) => !x);

  return { value, setValue, setTrue, setFalse, toggle };
};
