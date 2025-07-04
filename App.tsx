import React, { useState, useCallback, useMemo } from "react";
import Header from "./components/Header";
import OccasionSelector from "./components/OccasionSelector";
import CardDisplay from "./components/CardDisplay";
import Footer from "./components/Footer";
import { geminiService } from "./services/geminiService";
import { CardData, Occasion } from "./types";
import { OCCASIONS } from "./constants";

// Diagnostic log to help debug environment variable loading
console.log(`[Debug] Mock Images Mode: "${process.env.USE_MOCK_IMAGES}"`);

const LoadingSpinner: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-96 text-pink-500">
    <svg
      className="animate-spin -ml-1 mr-3 h-12 w-12 text-pink-500"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
    <p className="mt-4 text-lg font-semibold">Creating your masterpiece...</p>
  </div>
);

const ErrorDisplay: React.FC<{ message: string }> = ({ message }) => (
  <div className="w-full max-w-sm h-96 bg-red-50 border-2 border-red-200 rounded-2xl flex flex-col items-center justify-center p-4 text-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-12 w-12 text-red-400 mb-3"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
    <h3 className="text-lg font-bold text-red-600">
      Oops! Something went wrong.
    </h3>
    <p className="text-red-500 mt-1 text-sm">{message}</p>
  </div>
);

const MockModeBanner: React.FC = () => {
  if (process.env.USE_MOCK_IMAGES !== "true") return null;

  return (
    <div className="bg-yellow-200 border-l-4 border-yellow-500 text-yellow-700 p-4 text-center font-semibold mb-6 rounded-md shadow">
      🖼️ Mock Image Mode is Active. Placeholders are being used.
    </div>
  );
};

const App: React.FC = () => {
  const [selectedOccasionId, setSelectedOccasionId] = useState<string>(
    OCCASIONS[0].id
  );
  const [cardData, setCardData] = useState<CardData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const selectedOccasion = useMemo(() => {
    return OCCASIONS.find((o) => o.id === selectedOccasionId) || OCCASIONS[0];
  }, [selectedOccasionId]);

  const handleGenerateCard = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setCardData(null);

    try {
      // Generate in parallel for speed
      const [imageUrl, message] = await Promise.all([
        geminiService.generateImage(selectedOccasion),
        geminiService.generateMessage(selectedOccasion),
      ]);

      setCardData({ imageUrl, message });
    } catch (err: any) {
      console.error("Card generation failed:", err);
      setError(
        err.message ||
          "An unknown error occurred. Please check the console or try again."
      );
    } finally {
      setIsLoading(false);
    }
  }, [selectedOccasion]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-violet-100 text-gray-800 antialiased">
      <style>{`
                @keyframes fade-in {
                    0% { opacity: 0; transform: translateY(20px) scale(0.95); }
                    100% { opacity: 1; transform: translateY(0) scale(1); }
                }
                .animate-fade-in {
                    animation: fade-in 0.5s ease-out forwards;
                }
            `}</style>
      <div className="container mx-auto px-4">
        <Header />
        <main className="flex flex-col items-center w-full">
          <div className="w-full max-w-lg">
            <MockModeBanner />
          </div>
          <div className="bg-white/60 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-lg w-full max-w-lg mb-8">
            <OccasionSelector
              occasions={OCCASIONS}
              selectedOccasionId={selectedOccasionId}
              onSelectOccasion={setSelectedOccasionId}
              disabled={isLoading}
            />
            <div className="text-center mt-6">
              <h2 className="text-xl font-semibold text-center text-gray-700 mb-4">
                2. Create Your Card!
              </h2>
              <button
                onClick={handleGenerateCard}
                disabled={isLoading}
                className="w-full sm:w-auto bg-pink-500 text-white font-bold py-3 px-10 rounded-full shadow-lg hover:bg-pink-600 transition-all duration-300 ease-in-out disabled:bg-pink-300 disabled:cursor-not-allowed transform hover:scale-105 disabled:scale-100"
              >
                {isLoading ? "Generating..." : "Generate Card"}
              </button>
            </div>
          </div>

          <div className="w-full max-w-lg flex justify-center mb-12">
            {isLoading && <LoadingSpinner />}
            {error && !isLoading && <ErrorDisplay message={error} />}
            {!isLoading && !error && <CardDisplay cardData={cardData} />}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;
