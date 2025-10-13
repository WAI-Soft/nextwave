// Video cache to store preloaded video elements
const videoCache = new Map<string, HTMLVideoElement>();

// Priority queue for video preloading
const preloadQueue: string[] = [];
let isPreloading = false;

// Preload videos function with improved error handling and queue management
export const preloadVideo = (src: string, priority: boolean = false): Promise<HTMLVideoElement | null> => {
  return new Promise((resolve) => {
    // If already cached, return immediately
    if (videoCache.has(src)) {
      resolve(videoCache.get(src)!);
      return;
    }

    // If not priority, add to queue and process later
    if (!priority && !preloadQueue.includes(src)) {
      preloadQueue.push(src);
      processPreloadQueue();
      resolve(null);
      return;
    }

    const video = document.createElement('video');
    video.preload = 'metadata'; // Only preload metadata for better performance
    video.muted = true;
    video.playsInline = true;
    video.loop = true;
    video.setAttribute('playsinline', 'true');
    video.setAttribute('webkit-playsinline', 'true');
    
    let loaded = false;
    
    const handleSuccess = () => {
      if (!loaded) {
        loaded = true;
        videoCache.set(src, video);
        console.log(`✓ Video preloaded: ${src}`);
        resolve(video);
      }
    };
    
    const handleError = (e: Event) => {
      if (!loaded) {
        loaded = true;
        console.warn(`✗ Video failed to preload: ${src}`, e);
        resolve(null);
      }
    };
    
    // Use loadedmetadata instead of loadeddata for faster response
    video.addEventListener('loadedmetadata', handleSuccess, { once: true });
    video.addEventListener('error', handleError, { once: true });
    
    // Extended timeout for large videos
    const timeout = setTimeout(() => {
      if (!loaded) {
        loaded = true;
        console.warn(`⏱ Video preload timeout: ${src}`);
        resolve(null);
      }
    }, 15000); // 15 second timeout for large videos
    
    // Clear timeout on success
    video.addEventListener('loadedmetadata', () => clearTimeout(timeout), { once: true });
    
    video.src = src;
    video.load();
  });
};

// Process the preload queue one at a time to avoid overwhelming the network
const processPreloadQueue = async () => {
  if (isPreloading || preloadQueue.length === 0) return;
  
  isPreloading = true;
  
  while (preloadQueue.length > 0) {
    const src = preloadQueue.shift();
    if (src && !videoCache.has(src)) {
      await preloadVideo(src, true);
      // Small delay between preloads to prevent network congestion
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }
  
  isPreloading = false;
};

// Preload all videos on app initialization with priority
export const preloadAllVideos = () => {
  // Priority videos that should load first (home page)
  const priorityVideos = ['/videos/HomeVideo.mp4'];
  
  // Other videos to preload in background
  const backgroundVideos = [
    '/videos/AboutVideo.mp4', 
    '/videos/ServicesVideo.mp4',
    '/videos/ContactVideo.mp4',
    '/videos/PortfolioVideo.mp4'
  ];

  // Preload priority videos first
  priorityVideos.forEach(src => {
    preloadVideo(src, true);
  });

  // Queue background videos for later loading
  backgroundVideos.forEach(src => {
    preloadVideo(src, false);
  });
};

// Get cached video
export const getCachedVideo = (src: string): HTMLVideoElement | undefined => {
  return videoCache.get(src);
};