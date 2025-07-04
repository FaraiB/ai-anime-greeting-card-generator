
import React from 'react';
import { Occasion } from '../types';

interface OccasionSelectorProps {
  occasions: Occasion[];
  selectedOccasionId: string;
  onSelectOccasion: (id: string) => void;
  disabled: boolean;
}

const OccasionSelector: React.FC<OccasionSelectorProps> = ({ occasions, selectedOccasionId, onSelectOccasion, disabled }) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-center text-gray-700 mb-4">1. Choose an Occasion</h2>
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
        {occasions.map((occasion) => (
          <button
            key={occasion.id}
            onClick={() => onSelectOccasion(occasion.id)}
            disabled={disabled}
            className={`
              flex items-center gap-2 px-4 py-2 text-sm sm:text-base font-semibold rounded-full border-2 transition-all duration-200 ease-in-out
              ${selectedOccasionId === occasion.id
                ? 'bg-pink-500 text-white border-pink-500 shadow-md'
                : 'bg-white text-gray-600 border-gray-300 hover:border-pink-400 hover:text-pink-500'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'transform hover:scale-105'}
            `}
          >
            {occasion.icon}
            <span>{occasion.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default OccasionSelector;
