import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';

import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/layout/Hero';
import { Footer } from './components/layout/Footer';
import AuthPage from './pages/AuthPage';
import Dashboard from './components/features/Dashboard';
import AdminDashboard from './components/features/AdminDashboard';

import UserDashboard from './components/features/UserDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { CarLogoMarquee } from './components/features/CarLogoMarquee';
import { ServiceCard } from './components/features/ServiceCard';
import { TestimonialSection } from './components/features/TestimonialSection';
import { CallToActionSection } from './components/features/CallToActionSection';
import { ChatBot } from './components/features/ChatBot';
import ActivityPage from './pages/ActivityPage';
import { Card, CardContent } from './components/ui/Card';

// Services data
const services = [
  {
    name: 'Basic Wash',
    description: 'Essential exterior wash and dry for your vehicle',
    price: 5000,
    duration: 30,
    features: ['Exterior wash', 'Rinse & dry', 'Tire cleaning', 'Basic vacuum'],
    category: 'basic' as const
  },
  {
    name: 'Premium Wash',
    description: 'Complete interior and exterior cleaning service',
    price: 8500,
    duration: 45,
    features: ['Everything in Basic', 'Interior vacuum', 'Dashboard cleaning', 'Window cleaning', 'Wheel detailing'],
    category: 'premium' as const,
    popular: true
  },
  {
    name: 'Deluxe Detail',
    description: 'Professional-grade detailing with premium products',
    price: 15000,
    duration: 90,
    features: ['Everything in Premium', 'Paint protection', 'Leather conditioning', 'Engine bay cleaning', 'Wax application'],
    category: 'deluxe' as const
  }
];

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <Navbar />
            <Routes>
              <Route path="/" element={
                <>
                  <Hero />
                  <CarLogoMarquee />
                  <section id="services" className="relative py-24 bg-black transition-colors duration-300 overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                      <div className="text-center mb-16">
                        <div className="inline-flex items-center space-x-2 bg-cyan-100/40 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 px-5 py-2 rounded-full text-base font-semibold mb-4 shadow-md">
                          <span>✨</span>
                          <span>Services you may be interested in:</span>
                        </div>
                        <h2 className="text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight drop-shadow-xl">
                          All Services
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                          Choose from our range of professional car care services, each designed to give your vehicle the attention it deserves.
                        </p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {services.map((service, index) => (
                          <div key={index} className="cursor-pointer">
                            <ServiceCard {...service} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                  <section className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                          How It Works
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                          Book your premium car wash service in just a few simple steps
                        </p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                          { step: '1', title: 'Select Your Car', desc: 'Choose your vehicle from our 3D interface', icon: '🚗' },
                          { step: '2', title: 'Pick Service & Time', desc: 'Select service package and schedule', icon: '📅' },
                          { step: '3', title: 'Enjoy Clean Car', desc: 'Relax while we make your car spotless', icon: '✨' }
                        ].map((item, index) => (
                          <Card key={index} className="text-center group hover:shadow-2xl transition-all duration-300">
                            <CardContent className="p-8">
                              <div className="text-4xl mb-4">{item.icon}</div>
                              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                {item.step}
                              </div>
                              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">{item.title}</h3>
                              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </section>
                  <TestimonialSection />
                  <CallToActionSection />
                  <Footer />
                </>
              } />
              <Route path="/auth" element={<AuthPage />} />

              {/* Activity Page */}
              <Route path="/activity" element={
                <ProtectedRoute>
                  <div className="pt-16">
                    <ActivityPage />
                  </div>
                </ProtectedRoute>
              } />

              {/* Role-based dashboard routing */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />

              <Route path="/admin/dashboard" element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } />

              <Route path="/user/dashboard" element={
                <ProtectedRoute requiredRole="user">
                  <UserDashboard />
                </ProtectedRoute>
              } />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <ChatBot />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;