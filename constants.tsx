
import React from 'react';
import { Occasion } from './types';

const HeartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.5l1.318-1.182a4.5 4.5 0 116.364 6.364L12 20.25l-7.318-7.368a4.5 4.5 0 010-6.364z" /></svg>
);

const CakeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.25a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15.25V12a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 12v3.25z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18V6.75m0 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm-4.5 3.75a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm9 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" /></svg>
);

const SparklesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m11-13v4m-2-2h4m-4 10v4m-2-2h4M12 3v4m-2 2h4m-4 10v4m-2-2h4" /></svg>
);

const StarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
);


export const OCCASIONS: Occasion[] = [
  {
    id: 'valentines',
    name: "Valentine's",
    icon: <HeartIcon />,
    imagePromptSubject: 'two cute anime characters in love, surrounded by hearts'
  },
  {
    id: 'birthday',
    name: 'Birthday',
    icon: <CakeIcon />,
    imagePromptSubject: 'a cheerful anime character with a giant colorful birthday cake and presents'
  },
  {
    id: 'congratulations',
    name: 'Congrats',
    icon: <SparklesIcon />,
    imagePromptSubject: 'an excited anime character jumping for joy with confetti and sparkles'
  },
  {
    id: 'thank-you',
    name: 'Thank You',
    icon: <StarIcon />,
    imagePromptSubject: 'a grateful and happy anime character holding a bouquet of flowers'
  }
];
