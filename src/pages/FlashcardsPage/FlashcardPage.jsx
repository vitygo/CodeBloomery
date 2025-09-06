import React, { useState, useEffect } from "react";
import { FlipHorizontal, BookOpen, RefreshCcw, BadgeCheck, BadgeX, Play, Brain, Sparkles } from "lucide-react";
import './FlashcardPage.css'

// Placeholder data for flashcards
const flashcardData = {
  Variables: [
    {
      question: "What is a variable in Python?",
      answer: "A variable is a container for storing data values. It is an assigned name that refers to a piece of data."
    },
    {
      question: "Can a variable name start with a number?",
      answer: "No. A variable name must start with a letter (a-z, A-Z) or an underscore (_)."
    },
    {
      question: "Are variable names in Python case-sensitive?",
      answer: "Yes. For example, `my_var` and `My_Var` are two different variables."
    },
    {
      question: "What does it mean that Python is 'dynamically typed'?",
      answer: "You do not need to explicitly declare the data type of a variable when you create it. Python automatically determines the type."
    },
    {
      question: "How do you declare a variable in Python?",
      answer: "To declare a variable, simply assign a value to it. For example: `x = 10` or `greeting = 'Hello'`."
    },
    {
      question: "Which operator is used to assign a value to a variable?",
      answer: "The assignment operator (`=`)."
    },
  ],
};

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// --- Learn Mode Component ---
const LearnMode = ({ topic, onModeChange }) => {
  const [deck, setDeck] = useState(() => shuffleArray(flashcardData[topic] || flashcardData.Variables));
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    generateOptions();
  }, [currentCardIndex, deck]);

  const generateOptions = () => {
    const currentCard = deck[currentCardIndex];
    if (!currentCard) return;

    const correct = currentCard.answer;
    const incorrect = deck
      .filter((card, index) => index !== currentCardIndex)
      .map((card) => card.answer);
    
    const shuffledIncorrect = shuffleArray(incorrect).slice(0, 3);
    const allOptions = shuffleArray([...shuffledIncorrect, correct]);
    setOptions(allOptions);
  };

  const handleAnswer = (answer) => {
    if (feedback) return;

    const correct = deck[currentCardIndex].answer;
    if (answer === correct) {
      setFeedback('correct');
      setIsCorrect(true);
    } else {
      setFeedback('incorrect');
    }
  };

  const handleNext = () => {
    setFeedback(null);
    setIsCorrect(false);
    setCurrentCardIndex(prev => prev + 1);
  };

  if (currentCardIndex >= deck.length) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-sm text-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Learning Completed!</h2>
        <p className="mb-6">You have reviewed all the cards in this mode.</p>
        <button
          onClick={() => onModeChange('menu')}
          className="bg-yellow-400 text-white font-semibold py-3 px-6 rounded-full shadow-md hover:bg-yellow-500 transition-colors flex items-center gap-2"
        >
          <RefreshCcw size={20} /> Back to Menu
        </button>
      </div>
    );
  }

  const currentCard = deck[currentCardIndex];

  return ( 
    <div className="page-container p-6 bg-gray-100 rounded-2xl shadow-sm">
      <h2 className="text-2xl font-bold mb-2 flex items-center gap-2 text-gray-800">
        <Sparkles size={28} /> Learn Modex
      </h2>
      <p className="text-gray-500 mb-6">Match the question to the correct answer.</p>
      
      <div className="w-full max-w-lg mx-auto mb-6 relative flashcard-wrapper">
        <div className="flashcard-face flashcard-front w-full h-80 rounded-2xl shadow-lg p-8 flex flex-col justify-center items-center text-center bg-white pb-15">
          <h3 className="text-lg text-gray-500 font-medium mb-4">Question:</h3>
          <p className="text-xl font-semibold text-gray-800">{currentCard?.question}</p>
        </div>
      </div>

      <div className="answer-grid grid grid-cols-2 gap-4">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
            disabled={!!feedback}
            className={`
              p-4 rounded-lg text-left text-gray-800 font-medium
              transition-all duration-300 transform hover:scale-105
              ${feedback === 'correct' && option === currentCard.answer ? 'bg-green-200 ring-4 ring-green-500' : ''}
              ${feedback === 'incorrect' && option !== currentCard.answer ? 'bg-red-200' : ''}
              ${!feedback ? 'bg-white shadow-md hover:bg-gray-50' : ''}
              ${feedback && option !== currentCard.answer && option !== currentCard.answer ? 'opacity-50' : ''}
            `}
          >
            {option}
          </button>
        ))}
      </div>

      {feedback && (
        <div className="text-center mt-6">
          <button
            onClick={handleNext}
            className="bg-yellow-400 text-white font-semibold py-3 px-6 rounded-full shadow-md hover:bg-yellow-500 transition-colors"
          >
            Next Card
          </button>
        </div>
      )}

      <button
        onClick={() => onModeChange('menu')}
        className="mt-6 text-gray-600 hover:text-gray-800 transition-colors flex items-center gap-2"
      >
        <BookOpen size={20} /> Back to Menu
      </button>
    </div>
  );
};

// --- Match Mode Component ---
const MatchMode = ({ topic, onModeChange }) => {
  const [cards, setCards] = useState([]);
  const [selected, setSelected] = useState([]);
  const [matched, setMatched] = useState([]);

  useEffect(() => {
    const initialCards = shuffleArray(
      flashcardData[topic].flatMap((card) => [
        { id: card.question, text: card.question, type: 'question' },
        { id: card.question, text: card.answer, type: 'answer' },
      ])
    );
    setCards(initialCards);
  }, [topic]);

  useEffect(() => {
    if (selected.length === 2) {
      const [first, second] = selected;
      if (first.id === second.id && first.type !== second.type) {
        setMatched([...matched, first.id]);
        setSelected([]);
      } else {
        setTimeout(() => setSelected([]), 1000);
      }
    }
  }, [selected, matched]);

  const handleCardClick = (card) => {
    if (matched.includes(card.id) || selected.includes(card)) {
      return;
    }
    setSelected([...selected, card]);
  };

  const isMatched = (card) => matched.includes(card.id);
  const isSelected = (card) => selected.includes(card);
  const isCorrectPair = selected.length === 2 && selected[0].id === selected[1].id;

  if (matched.length === flashcardData[topic].length) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-sm text-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Match Completed!</h2>
        <p className="mb-6">You have matched all the cards.</p>
        <button
          onClick={() => onModeChange('menu')}
          className="bg-yellow-400 text-white font-semibold py-3 px-6 rounded-full shadow-md hover:bg-yellow-500 transition-colors flex items-center gap-2"
        >
          <RefreshCcw size={20} /> Back to Menu
        </button>
      </div>
    );
  }

  return (
    <div className="page-container p-6 bg-gray-100 rounded-2xl shadow-sm">
      <h2 className="text-2xl font-bold mb-2 flex items-center gap-2 text-gray-800">
        <Brain size={28} /> Match Mode
      </h2>
      <p className="text-gray-500 mb-6">Click on a question and its matching answer.</p>

      <div className="grid grid-cols-2 gap-4">
        {cards.map((card, index) => (
          <button
            key={index}
            onClick={() => handleCardClick(card)}
            className={`
              p-4 rounded-lg text-center font-medium transition-all duration-300
              ${isMatched(card) ? 'bg-green-300 opacity-0' : 'bg-white shadow-md hover:bg-gray-50'}
              ${isSelected(card) ? 'ring-4 ring-yellow-400 transform scale-105' : ''}
              ${selected.length === 2 && !isCorrectPair && isSelected(card) ? 'ring-4 ring-red-500' : ''}
            `}
            style={{ pointerEvents: isMatched(card) ? 'none' : 'auto' }}
          >
            {card.text}
          </button>
        ))}
      </div>
      <button
        onClick={() => onModeChange('menu')}
        className="mt-6 text-gray-600 hover:text-gray-800 transition-colors flex items-center gap-2"
      >
        <BookOpen size={20} /> Back to Menu
      </button>
    </div>
  );
};

// --- Main Flashcards Component ---
const FlashcardMode = ({ topic, sectionId, onModeChange }) => {
  const [initialDeck] = useState(() => shuffleArray(flashcardData[topic] || flashcardData.Variables));
  const [deck, setDeck] = useState(initialDeck);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCards, setKnownCards] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationDirection, setAnimationDirection] = useState(null);
  const [isProgressRed, setIsProgressRed] = useState(false);
  const [isProgressGreen, setIsProgressGreen] = useState(false);
  const [cardKey, setCardKey] = useState(0);

  const totalCards = initialDeck.length;
  const currentCard = deck[currentCardIndex];
  const progressPercentage = (knownCards.length / totalCards) * 100;

  const handleNextCard = (isKnown) => {
    if (isAnimating) return;

    setIsAnimating(true);

    if (isKnown) {
      setAnimationDirection('left');
      setKnownCards([...knownCards, currentCard]);
      setIsProgressGreen(true);
      setTimeout(() => setIsProgressGreen(false), 500);

      setTimeout(() => {
        setIsFlipped(false);
        setIsAnimating(false);
        setAnimationDirection(null);
        setCurrentCardIndex((prevIndex) => prevIndex + 1);
        setCardKey(prevKey => prevKey + 1);
      }, 800);
    } else {
      setAnimationDirection('right');

      setIsProgressRed(true);
      setTimeout(() => setIsProgressRed(false), 500);

      const updatedDeck = [...deck];
      const cardToMove = updatedDeck.splice(currentCardIndex, 1)[0];
      updatedDeck.push(cardToMove);
      setDeck(updatedDeck);

      setTimeout(() => {
        setIsFlipped(false);
        setIsAnimating(false);
        setAnimationDirection(null);
        setCurrentCardIndex((prevIndex) => prevIndex);
        setCardKey(prevKey => prevKey + 1);
      }, 800);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleReset = () => {
    const shuffledDeck = shuffleArray(initialDeck);
    setDeck(shuffledDeck);
    setCurrentCardIndex(0);
    setKnownCards([]);
    setIsFlipped(false);
    setIsProgressRed(false);
    setCardKey(0);
  };

  if (knownCards.length >= totalCards) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-sm text-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Deck Completed!</h2>
        <div className="flex gap-4 mb-6">
          <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
            <BadgeCheck className="text-green-500" />
            <span className="font-semibold">{knownCards.length} cards known</span>
          </div>
        </div>
        <button
          onClick={handleReset}
          className="bg-yellow-400 text-white font-semibold py-3 px-6 rounded-full shadow-md hover:bg-yellow-500 transition-colors flex items-center gap-2"
        >
          <RefreshCcw size={20} /> Restart Deck
        </button>
      </div>
    );
  }

  return (
    <div className="page-container p-6 bg-gray-100 rounded-2xl shadow-sm">
      <h2 className="text-2xl font-bold mb-2 flex items-center gap-2 text-gray-800">
        <BookOpen size={28} /> Flashcards: {topic}
      </h2>
      <p className="text-gray-500 mb-6">Topic: {topic} | Section: {sectionId}</p>

      {/* Progress bar */}
      <div className={`w-full bg-gray-200 rounded-full h-2.5 mb-8 overflow-hidden transition-all duration-300`}>
        <div
          className={`h-2.5 rounded-full transition-all duration-500 ease-in-out
            ${isProgressGreen ? 'bg-green-500' : (isProgressRed ? 'bg-red-500' : 'bg-yellow-400')}
          `}
          style={{ width: `${progressPercentage}%` }}>
        </div>
      </div>

      {/* Flashcard container with animation */}
      <div key={cardKey} className="w-full max-w-lg mx-auto mb-6 relative flashcard-wrapper-in" style={{ perspective: "1000px" }}>
        <div
          className={`
            flashcard-wrapper
            ${isAnimating ? 'animate-out' : ''}
            ${animationDirection === 'left' ? 'fly-left' : ''}
            ${animationDirection === 'right' ? 'fly-right' : ''}
          `}
        >
          <div
            onClick={handleFlip}
            className={`flashcard-inner relative w-full h-80 rounded-2xl shadow-lg transition-transform duration-700 ease-in-out cursor-pointer ${isFlipped ? 'is-flipped' : ''}`}
          >
            {/* Card Front */}
            <div className="flashcard-face flashcard-front absolute w-full h-full backface-hidden bg-white rounded-2xl p-8 flex flex-col justify-center items-center text-center">
              <h3 className="text-lg text-gray-500 font-medium mb-4">Question</h3>
              <p className="text-xl font-semibold text-gray-800">{currentCard.question}</p>
              <div className="absolute bottom-6 right-6 text-gray-400">
                <FlipHorizontal size={24} />
              </div>
            </div>
            {/* Card Back */}
            <div className="flashcard-face flashcard-back absolute w-full h-full backface-hidden bg-white rounded-2xl p-8 flex flex-col justify-center items-center text-center transform rotate-y-180">
              <h3 className="text-lg text-gray-500 font-medium mb-4">Answer</h3>
              <p className="text-xl font-semibold text-gray-800">{currentCard.answer}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress and controls */}
      <div className="text-center mb-6">
        <span className="text-sm font-medium text-gray-600">
          Card {knownCards.length + 1} of {totalCards}
        </span>
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={() => handleNextCard(true)}
          className="bg-yellow-400 text-white font-semibold py-3 px-6 rounded-full shadow-md hover:bg-yellow-500 transition-colors"
        >
          I know
        </button>
        <button
          onClick={() => handleNextCard(false)}
          className="bg-red-500 text-white font-semibold py-3 px-6 rounded-full shadow-md hover:bg-red-600 transition-colors"
        >
          Review
        </button>
      </div>
      <button
        onClick={() => onModeChange('menu')}
        className="mt-6 text-gray-600 hover:text-gray-800 transition-colors flex items-center gap-2"
      >
        <BookOpen size={20} /> Back to Menu
      </button>
ʼ
    </div>
  );
};

// --- Top-level component to handle mode selection ---
export default function FlashcardsPage({ topic = "Variables", sectionId }) {
  const [mode, setMode] = useState('menu');

  const renderMode = () => {
    switch (mode) {
      case 'menu':
        return (
          <div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl  text-gray-700 min-h-[60vh]">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Select a Learning Mode</h2>
            <div className="flex flex-col gap-4 w-full max-w-sm">
              <button
                onClick={() => setMode('flashcards')}
                className="bg-yellow-400 text-white font-semibold py-4 px-6 rounded-full shadow-md hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2 text-lg"
              >
                <BookOpen size={24} /> Flashcards
              </button>
              <button
                onClick={() => setMode('match')}
                className="bg-blue-500 text-white font-semibold py-4 px-6 rounded-full shadow-md hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 text-lg"
              >
                <Brain size={24} /> Match
              </button>
              <button
                onClick={() => setMode('learn')}
                className="bg-yellow-600 text-white font-semibold py-4 px-6 rounded-full shadow-md hover:bg-yellow-700 transition-colors flex items-center justify-center gap-2 text-lg"
              >
                <Sparkles size={24} /> Learn
              </button>
            </div>
          </div>
        );
      case 'flashcards':
        return <FlashcardMode topic={topic} sectionId={sectionId} onModeChange={setMode} />;
      case 'match':
        return <MatchMode topic={topic} sectionId={sectionId} onModeChange={setMode} />;
      case 'learn':
        return <LearnMode topic={topic} sectionId={sectionId} onModeChange={setMode} />;
      default:
        return null;
    }
  };

  return (
    <div className="page-container p-6 bg-gray-100 rounded-2xl shadow-sm">
      {renderMode()}
    </div>
  );
}
