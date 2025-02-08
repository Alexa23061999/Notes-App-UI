import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/Dashboard';



function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#F5F1E3]">
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="#" element={<div>About Page</div>} />
          <Route path="#" element={<div>Notes Page</div>} />
          <Route path="#" element={<div>Account Page</div>} />
          <Route path="/" element={<div>Home Page</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;








