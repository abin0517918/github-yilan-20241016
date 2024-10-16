import React, { useState, useCallback } from 'react';
import HomePage from './components/HomePage';
import EnvironmentPage from './components/EnvironmentPage';
import VideoPlayer from './components/VideoPlayer';

// Use only reliable video sources
const videos = [
  'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
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
    } else {
      const videoIndex = index === 4 ? Math.floor(Math.random() * videos.length) : index;
      setCurrentVideoSrc(videos[videoIndex]);
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