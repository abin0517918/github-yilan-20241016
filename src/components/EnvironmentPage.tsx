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

const locations = ['頭城', '礁溪', '宜蘭', '嵐峰', '羅東', '三星', '冬山', '蘇澳'];

const buttonPositions = [
  { top: '16%', left: '60%' },  // 頭城
  { top: '26%', left: '54%' },  // 礁溪
  { top: '35%', left: '58%' },  // 宜蘭
  { top: '38%', left: '54%' },  // 嵐峰
  { top: '45%', left: '58%' },  // 羅東
  { top: '47%', left: '53%' },  // 三星
  { top: '54%', left: '58%' },  // 冬山
  { top: '56%', left: '62%' },  // 蘇澳
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
              宜蘭環保站
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EnvironmentPage;