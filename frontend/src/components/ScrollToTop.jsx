import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop({ smooth = false }) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      behavior: smooth ? 'smooth' : 'auto',
      top: 0,
    });
  }, [pathname, smooth]);

  return null;
}
