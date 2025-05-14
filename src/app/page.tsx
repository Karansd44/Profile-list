import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProfileProvider } from '../context/ProfileContext';
import Home from '../pages/Home';
import Admin from '../pages/Admin';
import ProfilePage from '../pages/ProfilePage';
import Navbar from '../components/Navbar';
// import './App.scss';

function App() {
  return (
    <ProfileProvider>
      <Router>
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/profile/:id" element={<ProfilePage />} />
          </Routes>
        </div>
      </Router>
    </ProfileProvider>
  );
}

export default App;