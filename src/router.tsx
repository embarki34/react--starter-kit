import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './templates/login/page';
import Dashboard from './templates/dashboard/page';

// A simple mock for authentication status


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Route */}
        <Route 
          path="/dashboard" 
          element={ <Dashboard /> } 
        />

        {/* Redirect root to login or dashboard */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;