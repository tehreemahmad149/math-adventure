import { useNavigate } from 'react-router-dom';
import '../App.css';

const ACHIEVEMENTS = [
  {
    id: 1,
    title: 'Addition Master',
    description: 'Complete 10 addition problems correctly',
    icon: '🌟',
    progress: 7,
    total: 10,
    category: 'Addition'
  },
  {
    id: 2,
    title: 'Subtraction Star',
    description: 'Solve 15 subtraction problems',
    icon: '⭐',
    progress: 5,
    total: 15,
    category: 'Subtraction'
  },
  {
    id: 3,
    title: 'Multiplication Marvel',
    description: 'Master multiplication basics',
    icon: '🏆',
    progress: 2,
    total: 20,
    category: 'Multiplication'
  },
  {
    id: 4,
    title: 'Speed Demon',
    description: 'Answer 5 questions in under 30 seconds',
    icon: '⚡',
    progress: 3,
    total: 5,
    category: 'Speed'
  },
  {
    id: 5,
    title: 'Perfect Streak',
    description: 'Get 10 answers correct in a row',
    icon: '🔥',
    progress: 8,
    total: 10,
    category: 'Streaks'
  },
  {
    id: 6,
    title: 'Math Explorer',
    description: 'Try all three difficulty levels',
    icon: '🗺️',
    progress: 2,
    total: 3,
    category: 'Exploration'
  }
];

const STATS = {
  totalProblems: 42,
  correctAnswers: 35,
  bestStreak: 8,
  timeSpent: '1h 23m',
  favoriteTopic: 'Addition'
};

function AchievementsPage() {
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <div className="achievements-header">
        <button className="back-button" onClick={() => navigate('/')}>
          ← Back to Home
        </button>
        <h1 className="achievements-title">Your Achievements 🏆</h1>
      </div>

      <div className="stats-overview">
        <h2 className="section-title">Your Learning Journey 📈</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-icon">📝</span>
            <div className="stat-info">
              <h3>Total Problems</h3>
              <p>{STATS.totalProblems}</p>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-icon">✅</span>
            <div className="stat-info">
              <h3>Correct Answers</h3>
              <p>{STATS.correctAnswers}</p>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-icon">🔥</span>
            <div className="stat-info">
              <h3>Best Streak</h3>
              <p>{STATS.bestStreak}</p>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-icon">⏱️</span>
            <div className="stat-info">
              <h3>Time Learning</h3>
              <p>{STATS.timeSpent}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="achievements-section">
        <h2 className="section-title">Achievements Collection 🌟</h2>
        <div className="achievements-grid">
          {ACHIEVEMENTS.map((achievement) => (
            <div key={achievement.id} className="achievement-card">
              <div className="achievement-icon">{achievement.icon}</div>
              <div className="achievement-info">
                <h3>{achievement.title}</h3>
                <p>{achievement.description}</p>
                <div className="achievement-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ 
                        width: `${(achievement.progress / achievement.total) * 100}%`,
                        backgroundColor: achievement.progress >= achievement.total ? 'var(--correct-color)' : 'var(--secondary-color)'
                      }}
                    />
                  </div>
                  <span className="progress-text">
                    {achievement.progress}/{achievement.total}
                  </span>
                </div>
              </div>
              {achievement.progress >= achievement.total && (
                <div className="achievement-complete">
                  Completed! 🎉
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="motivation-section">
        <div className="motivation-card">
          <h2>Keep Going! 🌈</h2>
          <p>You're doing great! Keep practicing to unlock more achievements and become a math champion!</p>
          <button 
            className="practice-button"
            onClick={() => navigate('/game')}
          >
            Practice More! 🎮
          </button>
        </div>
      </div>
    </div>
  );
}

export default AchievementsPage; 