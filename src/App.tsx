import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { WalletProvider } from './contexts/WalletContext';
import ProtectedRoute from './components/ProtectedRoute';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/layout/Hero';
import { Footer } from './components/layout/Footer';
import AuthForm from './components/features/AuthForm';
import Dashboard from './components/features/Dashboard';
import WalletPage from './components/features/WalletPage';

import { CallToActionSection } from './components/features/CallToActionSection';
import { TestimonialSection } from './components/features/TestimonialSection';
import { CarLogoMarquee } from './components/features/CarLogoMarquee';
import { ChatBot } from './components/features/ChatBot';
import './index.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <WalletProvider>
          <Router>
            <div className="min-h-screen bg-white font-uber">
              <Navbar />
              <Routes>
                <Route path="/" element={
                  <>
                    <Hero />
                    <CarLogoMarquee />
                    <CallToActionSection />
                    <TestimonialSection />
                    <ChatBot />
                    <Footer />
                  </>
                } />
                <Route path="/auth" element={<AuthForm />} />
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/wallet" element={
                  <ProtectedRoute>
                    <WalletPage />
                  </ProtectedRoute>
                } />

                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </Router>
        </WalletProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;