import React, { useState } from 'react';
import { Button } from '../ui/Button';
import MapSnippet from './MapSnippet';
import {
    Car,
    Calendar,
    Clock,
    HelpCircle,
    FileText,
    RotateCcw,
    User,
    Filter,
    Plus
} from 'lucide-react';

const ActivityPage = () => {
    const [selectedFilter, setSelectedFilter] = useState('All Trips');

    // Mock data for past bookings
    const pastBookings = [
        {
            id: 1,
            date: 'Jun 5',
            time: '1:14 PM',
            service: 'Premium Wash',
            location: 'Lagos Business District | Premium Car Wash Center',
            cost: '₦5,000.00',
            status: 'Completed',
            mapRoute: {
                start: 'ILASAN',
                end: 'JAKANDE',
                route: 'Premium Car Wash Route'
            }
        },
        {
            id: 2,
            date: 'Jun 3',
            time: '10:30 AM',
            service: 'Basic Wash',
            location: 'Victoria Island | Express Car Wash',
            cost: '₦2,000.00',
            status: 'Completed',
            mapRoute: {
                start: 'VICTORIA',
                end: 'LEKKI',
                route: 'Express Wash Route'
            }
        },
        {
            id: 3,
            date: 'May 28',
            time: '3:45 PM',
            service: 'Deluxe Detail',
            location: 'Ikeja | Professional Detailing Center',
            cost: '₦15,000.00',
            status: 'Completed',
            mapRoute: {
                start: 'IKEJA',
                end: 'OGBA',
                route: 'Deluxe Detail Route'
            }
        }
    ];

    return (
        <div className="min-h-screen bg-white pt-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Booking History */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Upcoming Section */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming</h2>

                            {/* Hero Image */}
                            <div className="relative h-48 bg-gradient-to-r from-blue-50 to-indigo-100 rounded-xl mb-4 overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Car className="h-8 w-8 text-white" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Premium Car Wash</h3>
                                        <p className="text-sm text-gray-600">Professional cleaning service</p>
                                    </div>
                                </div>
                            </div>

                            {/* No Upcoming Message */}
                            <div className="text-center py-6">
                                <p className="text-gray-600 mb-4">You have no upcoming bookings</p>
                                <Button className="bg-black text-white hover:bg-gray-800">
                                    <Car className="h-4 w-4 mr-2" />
                                    Book a Wash
                                </Button>
                            </div>
                        </div>

                        {/* Past Section */}
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">Past</h2>
                                <div className="flex items-center space-x-3">
                                    <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-1">
                                        <User className="h-4 w-4 text-gray-600" />
                                        <span className="text-sm text-gray-700">Personal</span>
                                    </div>
                                    <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-1">
                                        <Calendar className="h-4 w-4 text-gray-600" />
                                        <select
                                            value={selectedFilter}
                                            onChange={(e) => setSelectedFilter(e.target.value)}
                                            className="text-sm text-gray-700 bg-transparent border-none focus:ring-0"
                                        >
                                            <option>All Trips</option>
                                            <option>This Month</option>
                                            <option>Last Month</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Past Bookings */}
                            <div className="space-y-4">
                                {pastBookings.map((booking) => (
                                    <div key={booking.id} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                                        <div className="flex space-x-4">
                                            {/* Map Snippet */}
                                            <MapSnippet
                                                startLocation={booking.mapRoute.start}
                                                endLocation={booking.mapRoute.end}
                                            />

                                            {/* Booking Details */}
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                                                            {booking.service} | {booking.location}
                                                        </h3>
                                                        <p className="text-sm text-gray-600 mt-1">
                                                            {booking.date} • {booking.time}
                                                        </p>
                                                    </div>
                                                    <span className="text-sm font-semibold text-gray-900 ml-4">
                                                        {booking.cost}
                                                    </span>
                                                </div>

                                                {/* Action Buttons */}
                                                <div className="flex items-center space-x-4 mt-3">
                                                    <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                                                        <HelpCircle className="h-4 w-4" />
                                                        <span>Help</span>
                                                    </button>
                                                    <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                                                        <FileText className="h-4 w-4" />
                                                        <span>Details</span>
                                                    </button>
                                                    <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                                                        <RotateCcw className="h-4 w-4" />
                                                        <span>Rebook</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Call to Action */}
                    <div className="lg:col-span-1">
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 sticky top-24">
                            {/* Hero Image */}
                            <div className="w-full h-32 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-lg mb-4 flex items-center justify-center">
                                <Car className="h-12 w-12 text-blue-600" />
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                Get a wash in minutes
                            </h3>
                            <p className="text-sm text-gray-600 mb-6">
                                Book a car wash from a web browser, no app install necessary.
                            </p>

                            {/* Call to Action Button */}
                            <Button className="w-full bg-black text-white hover:bg-gray-800 py-3">
                                <Car className="h-4 w-4 mr-2" />
                                Book a Wash
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActivityPage;