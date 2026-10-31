// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';
import Home from './components/Home';
import TourViewer from './components/TourViewer';
import TourSubmission from './components/TourSubmission';
import Search from './components/Search';
import Login from './components/Login';
import Register from './components/Register';
import FileUpload from './components/fileUpload';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/tour/:id" element={<TourViewer />} />
            <Route path="/search" element={<Search />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<PrivateRoute />} />
            <Route path="/submit" element={<TourSubmission />} />
            <Route path="/upload" element={<FileUpload />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;