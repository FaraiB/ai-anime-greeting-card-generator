
import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="text-center my-8 md:my-12">
            <h1 className="text-4xl md:text-5xl font-pacifico text-pink-500 drop-shadow-sm">
                Anime Greeting Cards
            </h1>
            <p className="text-gray-500 mt-2 text-lg">
                Crafted with love by AI ♡
            </p>
        </header>
    );
};

export default Header;
