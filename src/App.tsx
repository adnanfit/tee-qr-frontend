import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InputForm from './components/InputForm';
import QRHistory from './pages/QRHistory';
import QRDetail from './pages/QRDetail';

const App: React.FC = () => {
  return (
    <Router>
      <div className="container mx-auto">
        <Routes>
          <Route path="/" element={<InputForm />} />
          <Route path="/history" element={<QRHistory/>} />
          <Route path="/qr/:id" element={<QRDetail/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
