import { useState, useEffect } from 'react'
import '../App.css'

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
  difficulty: number;
}

const LEVEL_THEMES = {
  1: {
    background: '#FFE5E5',
    character: '🦊',
    title: 'Addition Adventure'
  },
  2: {
    background: '#E5FFE5',
    character: '🐼',
    title: 'Subtraction Safari'
  },
  3: {
    background: '#E5E5FF',
    character: '🦉',
    title: 'Multiplication Magic'
  }
};

function GamePage() {
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [level, setLevel] = useState(1);
  const [progress, setProgress] = useState(0);
  const [streak, setStreak] = useState(0);
  const [shake, setShake] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState(false);

  const generateQuestion = (difficulty: number): Question => {
    let num1, num2, answer, question, options;
    
    switch(difficulty) {
      case 1:
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        answer = num1 + num2;
        question = `${num1} + ${num2} = ?`;
        break;
      case 2:
        num1 = Math.floor(Math.random() * 20) + 1;
        num2 = Math.floor(Math.random() * num1) + 1;
        answer = num1 - num2;
        question = `${num1} - ${num2} = ?`;
        break;
      case 3:
        num1 = Math.floor(Math.random() * 5) + 1;
        num2 = Math.floor(Math.random() * 5) + 1;
        answer = num1 * num2;
        question = `${num1} × ${num2} = ?`;
        break;
      default:
        return generateQuestion(1);
    }

    options = [answer.toString()];
    while (options.length < 4) {
      const wrongAnswer = answer + (Math.floor(Math.random() * 5) + 1) * (Math.random() < 0.5 ? 1 : -1);
      if (!options.includes(wrongAnswer.toString()) && wrongAnswer >= 0) {
        options.push(wrongAnswer.toString());
      }
    }

    options.sort(() => Math.random() - 0.5);

    return {
      question,
      options,
      correctAnswer: answer.toString(),
      difficulty
    };
  };

  useEffect(() => {
    setCurrentQuestion(generateQuestion(level));
    document.body.style.background = LEVEL_THEMES[level as keyof typeof LEVEL_THEMES].background;
    return () => {
      document.body.style.background = '';
    };
  }, [level]);

  const playSound = (correct: boolean) => {
    const audio = new Audio(correct ? '/correct.mp3' : '/wrong.mp3');
    audio.volume = 0.3;
    audio.play().catch(() => {});
  };

  const handleAnswer = (selectedAnswer: string) => {
    if (!currentQuestion) return;

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    setLastAnswerCorrect(isCorrect);
    playSound(isCorrect);

    if (isCorrect) {
      setScore(score + 1);
      setStreak(streak + 1);
      setShowCelebration(true);
      setProgress(progress + 20);

      if (progress + 20 >= 100) {
        setLevel(prev => Math.min(prev + 1, 3));
        setProgress(0);
      }

      setTimeout(() => {
        setShowCelebration(false);
        setCurrentQuestion(generateQuestion(level));
        setLastAnswerCorrect(null);
      }, 1500);
    } else {
      setShake(true);
      setStreak(0);
      setTimeout(() => {
        setShake(false);
      }, 500);
    }
  };

  const getHint = () => {
    if (!currentQuestion) return '';
    const nums = currentQuestion.question.split(' ');
    switch(level) {
      case 1:
        return `Try counting up from ${nums[0]} by adding ${nums[2]} more!`;
      case 2:
        return `Start with ${nums[0]} and count down ${nums[2]} times!`;
      case 3:
        return `Think of adding ${nums[0]} to itself ${nums[2]} times!`;
      default:
        return '';
    }
  };

  const currentTheme = LEVEL_THEMES[level as keyof typeof LEVEL_THEMES];

  return (
    <div className="app-container">
      <div className="level-indicator">
        <span className="level-character">{currentTheme.character}</span>
        <h1 style={{ 
          textAlign: 'center', 
          color: 'var(--primary-color)', 
          fontSize: '2.5em', 
          marginBottom: '20px',
          textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
        }}>
          {currentTheme.title}
        </h1>
      </div>

      <div className="stats-container">
        <div className="stat-item">
          <span className="stat-label">Score</span>
          <span className="stat-value">{score}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Level</span>
          <span className="stat-value">{level}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Streak</span>
          <span className="stat-value">🔥 {streak}</span>
        </div>
      </div>

      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ 
            width: `${progress}%`,
            background: `linear-gradient(90deg, var(--secondary-color) ${progress}%, transparent ${progress}%)`
          }}
        />
      </div>

      {currentQuestion && (
        <div className={`game-card ${shake ? 'shake' : ''}`}>
          <div className="question-container">
            <h2 style={{ fontSize: '2em', marginBottom: '20px' }}>{currentQuestion.question}</h2>
            <div className="options-grid">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  className={`option-button ${
                    lastAnswerCorrect !== null 
                      ? option === currentQuestion.correctAnswer 
                        ? 'correct' 
                        : 'wrong'
                      : ''
                  }`}
                  onClick={() => handleAnswer(option)}
                  disabled={lastAnswerCorrect !== null}
                >
                  {option}
                </button>
              ))}
            </div>
            <button 
              className="hint-button"
              onClick={() => setShowHint(!showHint)}
            >
              Need a hint? 💡
            </button>
            {showHint && (
              <div className="hint-text">
                {getHint()}
              </div>
            )}
          </div>
        </div>
      )}

      {showCelebration && (
        <div className="celebration">
          <div className="celebration-content">
            <h2 style={{ 
              textAlign: 'center', 
              color: 'var(--accent-color)', 
              fontSize: '2em',
              textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
            }}>
              Great job! 🎉
            </h2>
            {streak > 0 && (
              <div className="streak-bonus">
                {streak} in a row! 🔥
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default GamePage; 