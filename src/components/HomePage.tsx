import React from 'react';
import BackgroundCarousel from './BackgroundCarousel';

interface HomePageProps {
  onButtonClick: (index: number) => void;
  buttonLabels: string[];
}

const backgroundImages = [
  'https://images.unsplash.com/photo-1511497584788-876760111969',
  'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843',
  'https://images.unsplash.com/photo-1434495763612-eccafd3945cf',
  'https://images.unsplash.com/photo-1503614472-8c93d56e92ce',
  'https://images.unsplash.com/photo-1455577380025-4321f1e1dca7',
];

const HomePage: React.FC<HomePageProps> = ({ onButtonClick, buttonLabels }) => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <BackgroundCarousel images={backgroundImages} />
      <div className="absolute inset-0 bg-black bg-opacity-35 flex flex-col justify-end items-center">
        <h1 className="text-4xl font-bold text-white mb-8">宜蘭慈濟園區</h1>
        <div className="flex justify-center gap-4 mb-8">
          {buttonLabels.map((label, index) => (
            <button
              key={index}
              onClick={() => onButtonClick(index)}
              className="bg-white bg-opacity-20 px-6 py-3 rounded-lg hover:bg-opacity-30 transition-all transform hover:scale-110"
            >
              <span className="text-white font-bold">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;