import React, { useState, useCallback } from 'react';
import { ArrowLeft } from 'lucide-react';
import VideoPlayer from './VideoPlayer';

// Update video URLs to more reliable sources
const videos = [
  'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
];

const locations = ['頭城', '宜蘭', '嵐峰', '羅東', '三星', '冬山', '蘇澳'];

const buttonPositions = [
  { top: '3%', left: '72%' },  // 頭城
  { top: '32%', left: '65%' },  // 宜蘭
  { top: '25%', left: '62%' },  // 嵐峰
  { top: '48%', left: '65%' },  // 羅東
  { top: '45%', left: '55%' },  // 三星
  { top: '62%', left: '65%' },  // 冬山
  { top: '78%', left: '75%' },  // 蘇澳
];

interface EnvironmentPageProps {
  onBack: () => void;
}

const EnvironmentPage: React.FC<EnvironmentPageProps> = ({ onBack }) => {
  const [currentVideoSrc, setCurrentVideoSrc] = useState<string | null>(null);

  const handleVideoEnd = useCallback(() => {
    setCurrentVideoSrc(null);
  }, []);

  const handleVideoError = useCallback(() => {
    console.error('Video failed to load');
    setCurrentVideoSrc(null);
  }, []);

  const BackButton = () => (
    <button
      onClick={onBack}
      className="absolute top-4 left-4 z-50 text-white hover:text-gray-300 transition-colors"
    >
      <ArrowLeft className="w-8 h-8" />
      <span className="text-white opacity-0 hover:opacity-100 transition-opacity">
          回前頁
      </span>
    </button>
  );

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {currentVideoSrc !== null ? (
        <div className="absolute inset-0 z-50">
          <VideoPlayer
            src={currentVideoSrc}
            onEnded={handleVideoEnd}
            onError={handleVideoError}
            onBack={() => setCurrentVideoSrc(null)}
          />
        </div>
      ) : (
        <>
          <img 
            src="https://openclipart.org/image/800px/333840" 
            alt="宜蘭縣地圖" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-center">
            <BackButton />
            {locations.map((location, index) => (
              <button
                key={index}
                onClick={() => setCurrentVideoSrc(videos[index])}
                className="absolute bg-white bg-opacity-20 px-4 py-2 rounded-lg hover:bg-opacity-30 transition-all transform hover:scale-110"
                style={buttonPositions[index]}
              >
                <span className="text-white font-bold">{location}</span>
              </button>
            ))}
            <div className="absolute bottom-4 right-4 text-white text-2xl font-bold">
              宜蘭環保站
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EnvironmentPage;