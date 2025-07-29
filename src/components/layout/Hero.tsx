import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Car, Sparkles, Shield, Star, Send } from 'lucide-react';
import { createPortal } from 'react-dom';

export function Hero() {
  const navigate = useNavigate();
  const calendarRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const [bookingData, setBookingData] = useState({
    address: '',
    service: '',
    date: '',
    time: 'Now'
  });
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarPosition, setCalendarPosition] = useState({ top: 0, left: 0 });

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setShowCalendar(false);
      }
    };

    if (showCalendar) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCalendar]);

  // Calculate calendar position when opening
  const handleCalendarToggle = () => {
    if (!showCalendar && inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const calendarHeight = 280;

      // Check if there's enough space below
      const spaceBelow = viewportHeight - rect.bottom;
      const spaceAbove = rect.top;

      let top;
      const left = rect.left;

      if (spaceBelow >= calendarHeight || spaceBelow > spaceAbove) {
        // Position below
        top = rect.bottom + 8;
      } else {
        // Position above
        top = rect.top - calendarHeight - 8;
      }

      setCalendarPosition({ top, left });
    }

    setShowCalendar(!showCalendar);
  };

  const handleInputChange = (field: string, value: string) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
  };

  const handleBooking = () => {
    // Navigate to booking page or open booking modal
    navigate('/auth');
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Today';
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleDateSelect = (date: Date) => {
    setBookingData(prev => ({
      ...prev,
      date: date.toISOString().split('T')[0]
    }));
    setShowCalendar(false);
  };

  const getCalendarDays = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    // Get the first day of the current month
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

    // Get the day of week for the first day (0 = Sunday, 1 = Monday, etc.)
    const firstDayWeekday = firstDayOfMonth.getDay();

    const days = [];

    // Add previous month's days to fill the first week
    const prevMonth = new Date(currentYear, currentMonth - 1, 0);
    for (let i = firstDayWeekday - 1; i >= 0; i--) {
      const date = new Date(currentYear, currentMonth - 1, prevMonth.getDate() - i);
      days.push({ date, isCurrentMonth: false, isToday: false });
    }

    // Add current month's days
    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
      const date = new Date(currentYear, currentMonth, day);
      const isToday = date.toDateString() === today.toDateString();
      days.push({ date, isCurrentMonth: true, isToday });
    }

    // Add next month's days to fill the last week (if needed)
    const remainingDays = 42 - days.length; // 6 rows * 7 days = 42
    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(currentYear, currentMonth + 1, day);
      days.push({ date, isCurrentMonth: false, isToday: false });
    }

    return days;
  };

  return (
    <div className="bg-white font-uber">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left Column - Booking Interface */}
            <div className="space-y-10">
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl font-black text-gray-900 leading-tight tracking-tight">
                  Get your car sparkling clean, anywhere
                </h1>
                <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
                  Professional car washing and detailing services brought to your doorstep.
                  Fast, convenient, and eco-friendly.
                </p>
              </div>

              {/* Booking Form */}
              <div className="space-y-6">
                {/* Address Input */}
                <div>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter location"
                      value={bookingData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="w-full px-4 py-4 pl-12 pr-12 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-black focus:border-black transition-all duration-200 bg-white"
                    />
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-gray-400 rounded-full"></div>
                    <Send className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                {/* Service Selection */}
                <div>
                  <div className="relative">
                    <select
                      value={bookingData.service}
                      onChange={(e) => handleInputChange('service', e.target.value)}
                      className="w-full px-4 py-4 pl-12 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-black focus:border-black transition-all duration-200 bg-white appearance-none"
                    >
                      <option value="">Select package</option>
                      <option value="basic">Basic Wash - $25</option>
                      <option value="premium">Premium Wash - $45</option>
                      <option value="detailing">Full Detailing - $85</option>
                    </select>
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-gray-400 rounded-full"></div>
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Date and Time */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <div
                      className="relative cursor-pointer"
                      ref={inputRef}
                      onClick={handleCalendarToggle}
                    >
                      <input
                        type="text"
                        value={formatDate(bookingData.date)}
                        readOnly
                        data-date-input
                        className="w-full px-4 py-4 pl-12 pr-12 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-black focus:border-black transition-all duration-200 bg-white cursor-pointer"
                      />
                      <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>

                    {/* Calendar Portal */}
                    {showCalendar && createPortal(
                      <>
                        {/* Backdrop */}
                        <div className="fixed inset-0 z-[9998]" onClick={() => setShowCalendar(false)}></div>

                        {/* Calendar */}
                        <div
                          className="fixed bg-white border border-gray-300 rounded-lg shadow-2xl z-[9999] p-4 min-w-[280px] max-h-[280px] overflow-hidden"
                          ref={calendarRef}
                          style={{
                            top: `${calendarPosition.top}px`,
                            left: `${calendarPosition.left}px`
                          }}
                        >
                          <div className="grid grid-cols-7 gap-1 mb-3">
                            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                              <div key={index} className="text-center text-sm font-semibold text-gray-500 py-2">
                                {day}
                              </div>
                            ))}
                          </div>
                          <div className="grid grid-cols-7 gap-1 max-h-[180px] overflow-y-auto">
                            {getCalendarDays().map((item, index) => (
                              <button
                                key={index}
                                onClick={() => handleDateSelect(item.date)}
                                className={`p-2 text-sm rounded-lg hover:bg-gray-100 transition-colors ${bookingData.date === item.date.toISOString().split('T')[0]
                                  ? 'bg-black text-white font-semibold'
                                  : item.isToday
                                    ? 'bg-blue-100 text-blue-900 font-semibold'
                                    : item.isCurrentMonth
                                      ? 'text-gray-900'
                                      : 'text-gray-400'
                                  }`}
                              >
                                {item.date.getDate()}
                              </button>
                            ))}
                          </div>
                        </div>
                      </>,
                      document.body
                    )}
                  </div>
                  <div>
                    <div className="relative">
                      <select
                        value={bookingData.time}
                        onChange={(e) => handleInputChange('time', e.target.value)}
                        className="w-full px-4 py-4 pl-12 pr-12 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-black focus:border-black transition-all duration-200 bg-white appearance-none"
                      >
                        <option value="Now">Now</option>
                        <option value="6:00 AM">6:00 AM</option>
                        <option value="7:00 AM">7:00 AM</option>
                        <option value="8:00 AM">8:00 AM</option>
                        <option value="9:00 AM">9:00 AM</option>
                        <option value="10:00 AM">10:00 AM</option>
                        <option value="11:00 AM">11:00 AM</option>
                        <option value="12:00 PM">12:00 PM</option>
                        <option value="1:00 PM">1:00 PM</option>
                        <option value="2:00 PM">2:00 PM</option>
                        <option value="3:00 PM">3:00 PM</option>
                        <option value="4:00 PM">4:00 PM</option>
                        <option value="5:00 PM">5:00 PM</option>
                        <option value="6:00 PM">6:00 PM</option>
                        <option value="7:00 PM">7:00 PM</option>
                        <option value="8:00 PM">8:00 PM</option>
                      </select>
                      <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-4">
                  <button
                    onClick={handleBooking}
                    className="w-full bg-black hover:bg-gray-800 text-white font-semibold text-lg py-4 px-6 rounded-lg transition-all duration-200"
                  >
                    See prices
                  </button>
                  <div className="text-center">
                    <button
                      onClick={() => navigate('/auth')}
                      className="text-base text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      Log in to see your recent bookings
                    </button>
                  </div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center space-x-10 text-sm text-gray-600">
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-green-600" />
                  <span className="font-semibold">100% Satisfaction</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span className="font-semibold">4.9/5 Rating</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Car className="h-5 w-5 text-blue-600" />
                  <span className="font-semibold">500+ Cars Washed</span>
                </div>
              </div>
            </div>

            {/* Right Column - Illustration */}
            <div className="relative">
              <div className="relative z-10">
                {/* Main Illustration */}
                <div className="bg-gradient-to-br from-blue-100 to-indigo-200 rounded-3xl p-12 relative overflow-hidden shadow-2xl">
                  {/* Car Illustration */}
                  <div className="relative">
                    {/* Car Body */}
                    <div className="w-80 h-40 bg-white rounded-3xl shadow-xl mx-auto relative">
                      {/* Car Windows */}
                      <div className="absolute top-6 left-6 right-6 h-12 bg-blue-200 rounded-2xl"></div>
                      {/* Car Wheels */}
                      <div className="absolute bottom-4 left-6 w-12 h-12 bg-gray-800 rounded-full shadow-lg"></div>
                      <div className="absolute bottom-4 right-6 w-12 h-12 bg-gray-800 rounded-full shadow-lg"></div>
                    </div>

                    {/* Water Droplets */}
                    <div className="absolute top-0 left-0 w-full h-full">
                      <div className="absolute top-6 left-12 w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
                      <div className="absolute top-12 left-20 w-2 h-2 bg-blue-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="absolute top-16 left-28 w-2.5 h-2.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      <div className="absolute top-8 right-16 w-2 h-2 bg-blue-300 rounded-full animate-bounce" style={{ animationDelay: '0.6s' }}></div>
                      <div className="absolute top-12 right-10 w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.8s' }}></div>
                    </div>

                    {/* Sparkles */}
                    <div className="absolute top-0 left-0 w-full h-full">
                      <Sparkles className="absolute top-3 left-6 h-5 w-5 text-yellow-400 animate-pulse" />
                      <Sparkles className="absolute top-8 right-8 h-5 w-5 text-yellow-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
                      <Sparkles className="absolute bottom-6 left-10 h-5 w-5 text-yellow-400 animate-pulse" style={{ animationDelay: '1s' }} />
                    </div>
                  </div>

                  {/* Service Provider */}
                  <div className="absolute bottom-6 right-6">
                    <div className="bg-white rounded-full p-4 shadow-xl">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Car className="h-5 w-5 text-blue-600" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-6 -right-6 bg-white rounded-3xl p-6 shadow-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-bold text-gray-900">Available Now</span>
                  </div>
                </div>

                <div className="absolute -bottom-6 -left-6 bg-white rounded-3xl p-6 shadow-xl">
                  <div className="text-center">
                    <div className="text-2xl font-black text-gray-900">15 min</div>
                    <div className="text-sm text-gray-600 font-medium">Average Time</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}