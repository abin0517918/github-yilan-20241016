import React from 'react';
import { Play } from 'lucide-react';

interface MapButtonProps {
  label: string;
  onClick: () => void;
  style: React.CSSProperties;
}

const MapButton: React.FC<MapButtonProps> = ({ label, onClick, style }) => {
  return (
    <button
      onClick={onClick}
      className="absolute flex flex-col items-center justify-center bg-white bg-opacity-20 p-4 rounded-full hover:bg-opacity-30 transition-all transform hover:scale-110"
      style={style}
    >
      <Play className="w-8 h-8 text-white mb-2" />
      <span className="text-white font-bold">{label}</span>
    </button>
  );
};

export default MapButton;