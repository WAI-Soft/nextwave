import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useScrollRestoration = () => {
  const location = useLocation();

  // Scroll to top immediately on initial mount (page refresh)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle navigation and hash changes
  useEffect(() => {
    // Check if there's a hash in the URL (for anchor links)
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        // Delay to ensure page is rendered
        setTimeout(() => {
          element.scrollIntoView({ 
            behavior: "smooth",
            block: "start"
          });
        }, 100);
      }
    } else {
      // Scroll to top for new pages with smooth behavior
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    }
  }, [location.pathname, location.hash]);

  return null;
};