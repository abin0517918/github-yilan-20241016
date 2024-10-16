import React, { useRef, useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';

interface VideoPlayerProps {
  src: string | null;
  onEnded: () => void;
  onError: () => void;
  onBack: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, onEnded, onError, onBack }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (video && src) {
      setIsLoading(true);
      setError(null);

      const playVideo = () => {
        setIsLoading(false);
        video.play().catch((e) => {
          console.error('Error playing video:', e);
          setError('Failed to play video. Please try again.');
          onError();
        });
      };

      const handleError = () => {
        setIsLoading(false);
        setError('Failed to load video. Please try another one.');
        onError();
      };

      video.addEventListener('canplay', playVideo);
      video.addEventListener('error', handleError);

      return () => {
        video.removeEventListener('canplay', playVideo);
        video.removeEventListener('error', handleError);
      };
    }
  }, [src, onError]);

  if (!src) {
    return null;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-black text-white">
        <div className="text-xl mb-4">{error}</div>
        <button
          onClick={onBack}
          className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition-colors"
        >
          回前頁
        </button>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-black">
      <button
        onClick={onBack}
        className="absolute top-4 left-4 z-10 text-white hover:text-gray-300 transition-colors"
      >
        <ArrowLeft className="w-8 h-8" />
        <span className="text-white opacity-0 hover:opacity-100 transition-opacity">
          回前頁
        </span>
      </button>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
        </div>
      )}
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-contain"
        onEnded={onEnded}
        controls
        preload="auto"
      />
    </div>
  );
};

export default VideoPlayer;