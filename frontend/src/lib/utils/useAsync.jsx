import { useState, useCallback, useEffect } from 'react';

/**
 * @typedef {Object}  UseAsyncReturn
 * @property {'idle' | 'pending' | 'success' | 'error'} status
 * @property {any} data
 * @property {any} error
 * @property {Function} execute
 *
 */
/**
 *
 * @param {Function} asyncFunction
 * @param {boolean} [immediate=true]
 * @returns { UseAsyncReturn }
 */
export const useAsync = (asyncFunction, immediate = true) => {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  // The execute function wraps asyncFunction and
  // handles setting state for pending, value, and error.
  // useCallback ensures the below useEffect is not called
  // on every render, but only if asyncFunction changes.
  const execute = useCallback(() => {
    setStatus('pending');
    setData(null);
    setError(null);
    return asyncFunction()
      .then((response) => {
        setData(response);
        setStatus('success');
      })
      .catch((error) => {
        setError(error);
        setStatus('error');
      });
  }, [asyncFunction]);
  // Call execute if we want to fire it right away.
  // Otherwise execute can be called later, such as
  // in an onClick handler.
  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);
  return { execute, status, data, error };
};
