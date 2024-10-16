import React, { useState, useCallback } from 'react';
import HomePage from './components/HomePage';
import EnvironmentPage from './components/EnvironmentPage';
import VideoPlayer from './components/VideoPlayer';
import video1  from './videos/20210615.mp4';
import video2  from './videos/20210623.mp4';
import video3  from './videos/20180000.mp4';

// Use only reliable video sources
const videos = [
  'https://videos.pexels.com/video-files/1448735/1448735-uhd_2732_1440_24fps.mp4',
  'https://videos.pexels.com/video-files/856932/856932-hd_1920_1080_25fps.mp4',
  'https://videos.pexels.com/video-files/3117818/3117818-hd_1920_1080_30fps.mp4',
  'https://videos.pexels.com/video-files/855602/855602-hd_1920_1080_30fps.mp4',
  'https://videos.pexels.com/video-files/855867/855867-hd_1920_1080_30fps.mp4',
];

const videos2 = [
  video1,
  video2,
  video3,
];

const buttonLabels = ['宜蘭慈濟史', '宜蘭城歷史', '宜蘭環保簡介', '宜蘭慈善簡介', '靜思心語'];

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentVideoSrc, setCurrentVideoSrc] = useState<string | null>(null);

  const handleVideoEnd = useCallback(() => {
    setCurrentVideoSrc(null);
    setCurrentPage('home');
  }, []);

  const handleVideoError = useCallback(() => {
    console.error('Video failed to load');
    // Try another random video as fallback
    const availableVideos = videos.filter(v => v !== currentVideoSrc);
    if (availableVideos.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableVideos.length);
      setCurrentVideoSrc(availableVideos[randomIndex]);
    } else {
      handleVideoEnd();
    }
  }, [currentVideoSrc, handleVideoEnd]);

  const handleButtonClick = useCallback((index: number) => {
    if (index === 2) {
      setCurrentPage('environment');
    } else if (index === 4) {
      const randomIndex = Math.floor(Math.random() * videos2.length);
      setCurrentVideoSrc(videos2[randomIndex]);
    } else {
      setCurrentVideoSrc(videos[index]);
    }
  }, []);

  const handleBackToHome = useCallback(() => {
    setCurrentVideoSrc(null);
    setCurrentPage('home');
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {currentPage === 'home' && currentVideoSrc === null && (
        <HomePage onButtonClick={handleButtonClick} buttonLabels={buttonLabels} />
      )}
      {currentPage === 'environment' && (
        <EnvironmentPage onBack={handleBackToHome} />
      )}
      {currentVideoSrc !== null && (
        <div className="absolute inset-0 z-50">
          <VideoPlayer
            src={currentVideoSrc}
            onEnded={handleVideoEnd}
            onError={handleVideoError}
            onBack={handleBackToHome}
          />
        </div>
      )}
    </div>
  );
}

export default App;
