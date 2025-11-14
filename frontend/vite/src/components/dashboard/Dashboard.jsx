import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import EventSummary from './EventSummary';
import ProgressTracker from './ProgressTracker';
import FeaturesGrid from './FeaturesGrid';
import TasksList from './TasksList';
import PlannerContact from './PlannerContact';
import BottomNav from './BottomNav';
import { authAPI } from '../../services/api';

const Dashboard = ({ user, onLogout }) => {
  const [eventData, setEventData] = useState({
    type: "Wedding",
    date: "2024-06-15",
    venue: "Grand Ballroom, New York",
    progress: 65
  });

  const [tasks, setTasks] = useState([
    { id: 1, text: "Shortlist venue", completed: true },
    { id: 2, text: "Confirm vendor calls", completed: false },
    { id: 3, text: "Approve theme moodboard", completed: false },
    { id: 4, text: "Book photographer", completed: true }
  ]);

  // Fetch user profile on mount to ensure we have latest data
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        await authAPI.getProfile();
      } catch (error) {
        console.error('Error fetching profile:', error);
        // If profile fetch fails, user might be logged out
        if (error.message.includes('Unauthorized') || error.message.includes('Invalid token')) {
          onLogout();
        }
      }
    };

    fetchUserProfile();
  }, [onLogout]);

  return (
    <div className="dashboard">
      <Navbar user={user} onLogout={onLogout} />
      
      <div className="dashboard-content">
        <div className="greeting-section">
          <h1 className="greeting-title">Welcome back, {user?.name || 'User'}</h1>
          <p className="greeting-subtitle">Here's your event progress</p>
        </div>

        <EventSummary eventData={eventData} />
        <ProgressTracker progress={eventData.progress} />
        <FeaturesGrid />
        <TasksList initialTasks={tasks} />
        <PlannerContact />
      </div>

      <BottomNav />
    </div>
  );
};

export default Dashboard;

