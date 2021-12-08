import { useState, useCallback, useLayoutEffect, useMemo } from 'react';

/**
 * @description Detects when an element is in the viewport
 * @returns {[React.Ref, boolean]}
 */
export function useOnScreen() {
  const [isIntersecting, setIntersecting] = useState(false);
  const [node, setNode] = useState(null);

  const ref = useCallback((node) => {
    setNode(node);
  }, []);

  const observer = useMemo(
    () => new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting)),
    []
  );

  useLayoutEffect(() => {
    if (node) {
      observer.observe(node);
      // Remove the observer as soon as the component is unmounted
      return () => {
        observer.disconnect();
      };
    }
  }, [node, observer]);

  return [ref, isIntersecting, node];
}
