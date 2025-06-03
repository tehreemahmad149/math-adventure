import { useNavigate } from 'react-router-dom';
import '../App.css';

const LEVEL_INFO = [
  {
    id: 1,
    title: 'Addition Adventure',
    description: 'Start your journey by mastering addition! Add numbers from 1 to 10.',
    character: '🦊',
    color: '#FFE5E5',
    difficulty: 'Easy'
  },
  {
    id: 2,
    title: 'Subtraction Safari',
    description: 'Take your skills further with subtraction! Work with numbers up to 20.',
    character: '🐼',
    color: '#E5FFE5',
    difficulty: 'Medium'
  },
  {
    id: 3,
    title: 'Multiplication Magic',
    description: 'Challenge yourself with multiplication! Multiply numbers from 1 to 5.',
    character: '🦉',
    color: '#E5E5FF',
    difficulty: 'Hard'
  }
];

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <div className="welcome-section">
        <h1 className="main-title">
          Welcome to Math Adventure! 
          <span className="title-emoji">🚀</span>
        </h1>
        <p className="welcome-text">
          Embark on an exciting journey through the world of mathematics! 
          Choose your adventure and start learning with fun.
        </p>
      </div>

      <div className="how-to-play">
        <h2 className="section-title">How to Play 🎮</h2>
        <div className="instruction-grid">
          <div className="instruction-card">
            <span className="instruction-icon">🎯</span>
            <h3>Choose Your Level</h3>
            <p>Start with addition and work your way up to multiplication!</p>
          </div>
          <div className="instruction-card">
            <span className="instruction-icon">✨</span>
            <h3>Answer Questions</h3>
            <p>Select the correct answer from four options.</p>
          </div>
          <div className="instruction-card">
            <span className="instruction-icon">🏆</span>
            <h3>Earn Points</h3>
            <p>Build streaks and watch your score grow!</p>
          </div>
          <div className="instruction-card">
            <span className="instruction-icon">📈</span>
            <h3>Track Progress</h3>
            <p>Complete levels and view your achievements!</p>
          </div>
        </div>
      </div>

      <div className="level-selection">
        <h2 className="section-title">Choose Your Adventure 🗺️</h2>
        <div className="level-grid">
          {LEVEL_INFO.map((level) => (
            <div 
              key={level.id}
              className="level-card"
              style={{ backgroundColor: level.color }}
              onClick={() => navigate(`/game`)}
            >
              <div className="level-header">
                <span className="level-character">{level.character}</span>
                <div className="level-title-container">
                  <h3 className="level-title">{level.title}</h3>
                  <span className="difficulty-badge">{level.difficulty}</span>
                </div>
              </div>
              <p className="level-description">{level.description}</p>
              <button className="play-button">
                Play Now! 🎮
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="achievements-preview">
        <h2 className="section-title">Your Journey 🌟</h2>
        <div className="achievements-card">
          <p className="achievement-text">
            Track your progress, earn stars, and become a math champion!
          </p>
          <button 
            className="view-achievements-button"
            onClick={() => navigate('/achievements')}
          >
            View Achievements 🏆
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage; 