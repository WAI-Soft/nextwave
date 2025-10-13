import React, { useRef, useState, useCallback } from 'react';

interface VideoBackgroundProps {
  videoSrc: string;
  posterSrc: string;
  className?: string;
  children?: React.ReactNode;
  overlayOpacity?: number;
}

export const VideoBackground: React.FC<VideoBackgroundProps> = ({
  videoSrc,
  posterSrc,
  className = '',
  children,
  overlayOpacity = 0.6
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const handleVideoCanPlay = useCallback(async () => {
    const video = videoRef.current;
    if (video && !videoError) {
      try {
        // Ensure video properties are set
        video.muted = true;
        video.playsInline = true;
        
        console.log('🎬 Video ready to play:', videoSrc);
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
          await playPromise;
          console.log('✅ Video playing:', videoSrc);
          setIsVideoPlaying(true);
          setVideoError(false);
        }
      } catch (playError) {
        console.error('❌ Video autoplay failed:', videoSrc, playError);
        setVideoError(true);
        setIsVideoPlaying(false);
      }
    }
  }, [videoError, videoSrc]);

  const handleVideoError = useCallback((e: React.SyntheticEvent<HTMLVideoElement>) => {
    console.error('❌ Video loading error:', videoSrc, e);
    setVideoError(true);
    setIsVideoPlaying(false);
  }, [videoSrc]);

  const handleVideoPlay = useCallback(() => {
    console.log('▶️ Video started playing:', videoSrc);
    setIsVideoPlaying(true);
    setVideoError(false);
  }, [videoSrc]);

  const handleLoadedMetadata = useCallback(() => {
    console.log('📊 Video metadata loaded:', videoSrc);
  }, [videoSrc]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Poster/Fallback Image - Always visible as background */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: `url(${posterSrc})`,
        }}
      />

      {/* Video Element - Fades in when playing */}
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 z-[1] ${
          isVideoPlaying && !videoError ? 'opacity-100' : 'opacity-0'
        }`}
        src={videoSrc}
        poster={posterSrc}
        onLoadedMetadata={handleLoadedMetadata}
        onCanPlay={handleVideoCanPlay}
        onPlay={handleVideoPlay}
        onError={handleVideoError}
        preload="metadata"
        muted
        playsInline
        loop
        autoPlay
        webkit-playsinline="true"
        x5-playsinline="true"
      />

      {/* Dark overlay */}
      <div 
        className="absolute inset-0 bg-black transition-opacity duration-300 z-[2]"
        style={{ opacity: overlayOpacity }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default VideoBackground;