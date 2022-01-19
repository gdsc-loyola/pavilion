import { useState, useCallback, useLayoutEffect } from 'react';

/**
 * @typedef {Object} DimensionObject
 * @property {number} width
 * @property {number} height
 * @property {number} top
 * @property {number} right
 * @property {number} bottom
 * @property {number} left
 * @property {number} x
 * @property {number} y
 */

function getDimensionObject(node) {
  const rect = node.getBoundingClientRect();

  return {
    width: rect.width,
    height: rect.height,
    top: 'x' in rect ? rect.x : rect.top,
    left: 'y' in rect ? rect.y : rect.left,
    x: 'x' in rect ? rect.x : rect.left,
    y: 'y' in rect ? rect.y : rect.top,
    right: rect.right,
    bottom: rect.bottom,
  };
}

/**
 *
 * @param {{liveMeasure: boolean}} options
 * @returns {[(node: HTMLElement) => void, DimensionObject]}
 */
export function useDimensions({ liveMeasure = true }) {
  const [dimensions, setDimensions] = useState({});
  const [node, setNode] = useState(null);

  const ref = useCallback((node) => {
    setNode(node);
  }, []);

  useLayoutEffect(() => {
    if (node) {
      const measure = () =>
        window.requestAnimationFrame(() => setDimensions(getDimensionObject(node)));
      measure();

      if (liveMeasure) {
        window.addEventListener('resize', measure);
        window.addEventListener('scroll', measure);

        return () => {
          window.removeEventListener('resize', measure);
          window.removeEventListener('scroll', measure);
        };
      }
    }
  }, [liveMeasure, node]);

  return [ref, dimensions, node];
}

export default useDimensions;
