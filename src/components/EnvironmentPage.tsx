import React, { useState, useCallback } from 'react';
import { ArrowLeft } from 'lucide-react';
import VideoPlayer from './VideoPlayer';
import yilanmap from '../images/yilan_map.png';

// Update video URLs to more reliable sources
const videos = [
  'https://videos.pexels.com/video-files/3196563/3196563-uhd_2560_1440_25fps.mp4',
  'https://videos.pexels.com/video-files/6591440/6591440-uhd_2732_1440_25fps.mp4',
  'https://videos.pexels.com/video-files/3195440/3195440-uhd_2560_1440_25fps.mp4',
  'https://videos.pexels.com/video-files/4404092/4404092-uhd_2560_1440_24fps.mp4',
  'https://videos.pexels.com/video-files/3050711/3050711-hd_1920_1080_24fps.mp4',
  'https://videos.pexels.com/video-files/26986993/12042519_1920_1080_24fps.mp4',
  'https://videos.pexels.com/video-files/1093662/1093662-hd_1920_1080_30fps.mp4',
];

const locations = ['頭城環保站', '礁溪環保站', '宜蘭環保站', '嵐峰環保站', '羅東環保站', '三星環保站', '冬山環保站', '蘇澳環保站'];

const buttonPositions = [
  { top: '20%', left: '75%' },  // 頭城
  { top: '25%', left: '75%' },  // 礁溪
  { top: '30%', left: '75%' },  // 宜蘭
  { top: '35%', left: '75%' },  // 嵐峰
  { top: '40%', left: '75%' },  // 羅東
  { top: '45%', left: '75%' },  // 三星
  { top: '50%', left: '75%' },  // 冬山
  { top: '55%', left: '75%' },  // 蘇澳
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
            src={yilanmap}
            alt="宜蘭縣地圖" 
            className="absolute inset-0 h-full object-cover mx-auto"
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
              宜蘭縣環保站
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EnvironmentPage;