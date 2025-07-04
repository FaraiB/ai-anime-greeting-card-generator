
import React from 'react';
import { CardData } from '../types';

interface CardDisplayProps {
  cardData: CardData | null;
}

const CardDisplay: React.FC<CardDisplayProps> = ({ cardData }) => {
  if (!cardData) {
    return (
        <div className="w-full max-w-sm h-96 bg-gray-100 rounded-2xl flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            <h3 className="text-lg font-semibold text-gray-600">Your card will appear here</h3>
            <p className="text-gray-500">Choose an occasion and generate a card!</p>
        </div>
    );
  }

  return (
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-500 ease-in-out animate-fade-in">
        <img 
            src={cardData.imageUrl} 
            alt="Generated AI greeting card" 
            className="w-full h-72 object-cover" 
        />
        <div className="p-6 text-center">
            <p className="font-pacifico text-2xl text-gray-700 leading-relaxed">
                "{cardData.message}"
            </p>
        </div>
    </div>
  );
};

export default CardDisplay;
