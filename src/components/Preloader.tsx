import React, { useState, useEffect } from 'react';

interface PreloaderProps {
  onLoadComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onLoadComplete }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    // Prevent scrolling while preloader is active
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    const checkAllAssetsLoaded = () => {
      return new Promise<void>((resolve) => {
        // Check if document is ready
        if (document.readyState !== 'complete') {
          window.addEventListener('load', () => resolve());
          return;
        }

        // Get all images, videos, and other media elements
        const images = Array.from(document.querySelectorAll('img'));
        const videos = Array.from(document.querySelectorAll('video'));
        const iframes = Array.from(document.querySelectorAll('iframe'));
        
        // Check CSS background images
        const elementsWithBgImages = Array.from(document.querySelectorAll('*')).filter(el => {
          const style = window.getComputedStyle(el);
          return style.backgroundImage && style.backgroundImage !== 'none';
        });

        const allAssets = [...images, ...videos, ...iframes];
        let loadedCount = 0;
        const totalAssets = allAssets.length + elementsWithBgImages.length;

        if (totalAssets === 0) {
          resolve();
          return;
        }

        const checkComplete = () => {
          loadedCount++;
          if (loadedCount >= totalAssets) {
            resolve();
          }
        };

        // Check images
        images.forEach(img => {
          if (img.complete && img.naturalHeight !== 0) {
            checkComplete();
          } else {
            img.addEventListener('load', checkComplete);
            img.addEventListener('error', checkComplete);
          }
        });

        // Check videos
        videos.forEach(video => {
          if (video.readyState >= 3) { // HAVE_FUTURE_DATA or higher
            checkComplete();
          } else {
            video.addEventListener('canplaythrough', checkComplete);
            video.addEventListener('error', checkComplete);
          }
        });

        // Check iframes
        iframes.forEach(iframe => {
          if (iframe.contentDocument?.readyState === 'complete') {
            checkComplete();
          } else {
            iframe.addEventListener('load', checkComplete);
            iframe.addEventListener('error', checkComplete);
          }
        });

        // Check background images
        elementsWithBgImages.forEach(el => {
          const style = window.getComputedStyle(el);
          const bgImage = style.backgroundImage;
          const imageUrl = bgImage.slice(4, -1).replace(/["']/g, '');
          
          if (imageUrl && imageUrl !== 'none') {
            const img = new Image();
            img.onload = checkComplete;
            img.onerror = checkComplete;
            img.src = imageUrl;
          } else {
            checkComplete();
          }
        });
      });
    };

    const handleAllAssetsLoaded = async () => {
      try {
        // Wait for window.onload first
        if (document.readyState !== 'complete') {
          await new Promise(resolve => {
            window.addEventListener('load', resolve);
          });
        }

        // Then check all assets, with a hard fallback timeout
        const MAX_WAIT_MS = 3000; // ensure the app becomes interactive quickly
        const assetCheckPromise = checkAllAssetsLoaded();
        const timeoutPromise = new Promise<void>((resolve) => setTimeout(resolve, MAX_WAIT_MS));
        await Promise.race([assetCheckPromise, timeoutPromise]);

        // Add a small delay to ensure everything is truly ready
        setTimeout(() => {
          setIsHidden(true);
          
          // Remove preloader from DOM after fade-out animation
          setTimeout(() => {
            setIsLoading(false);
            // Restore scrolling
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
            onLoadComplete();
          }, 600); // Match the CSS transition duration
        }, 100);
      } catch (error) {
        console.warn('Asset loading check failed:', error);
        // Fallback: remove preloader anyway
        setIsHidden(true);
        setTimeout(() => {
          setIsLoading(false);
          document.body.style.overflow = '';
          document.documentElement.style.overflow = '';
          onLoadComplete();
        }, 600);
      }
    };

    handleAllAssetsLoaded();

    // Cleanup function
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [onLoadComplete]);

  if (!isLoading) return null;

  return (
    <>
      <style>
        {`
          .preloader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #000;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            transition: opacity 0.6s ease;
          }

          .preloader-text {
            font-size: 2.5rem;
            color: white;
            animation: pulse 1.5s infinite;
            letter-spacing: 5px;
            font-weight: bold;
            font-family: Arial, sans-serif;
          }

          @keyframes pulse {
            0% { opacity: 0.5; }
            50% { opacity: 1; }
            100% { opacity: 0.5; }
          }

          .preloader.hidden {
            opacity: 0;
            pointer-events: none;
          }

          /* Ensure no content is visible behind preloader */
          body.preloader-active {
            overflow: hidden !important;
          }

          /* Responsive adjustments */
          @media (max-width: 768px) {
            .preloader-text {
              font-size: 2rem;
              letter-spacing: 3px;
            }
          }

          @media (max-width: 480px) {
            .preloader-text {
              font-size: 1.5rem;
              letter-spacing: 2px;
            }
          }
        `}
      </style>
      <div className={`preloader ${isHidden ? 'hidden' : ''}`}>
        <div className="preloader-text">
          NEXTWAVE
        </div>
      </div>
    </>
  );
};

export default Preloader;