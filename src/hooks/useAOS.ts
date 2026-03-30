// hooks/useAOS.js
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const useAOS = (config = {}) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 100,
      delay: 0,
      easing: 'ease',
      once: false,
      mirror: false,
      anchorPlacement: 'top-bottom',
      ...config // Allow custom config to override defaults
    });
    
    // Refresh AOS when content changes
    AOS.refresh();
  }, []);
};

export default useAOS;