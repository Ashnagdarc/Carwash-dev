import React, { useState } from 'react';
import { Users, Calendar, Settings, DollarSign, BarChart3, Car } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

export function AdminPanel() {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Total Bookings', value: '1,247', icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Active Users', value: '892', icon: Users, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Revenue (Month)', value: '₦2.4M', icon: DollarSign, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Vehicles Serviced', value: '3,451', icon: Car, color: 'text-amber-600', bg: 'bg-amber-50' }
  ];

  const recentBookings = [
    { id: 1, customer: 'John Doe', service: 'Premium Wash', car: 'Toyota Camry', date: '2024-01-15', status: 'Completed', amount: '₦8,500' },
    { id: 2, customer: 'Jane Smith', service: 'Deluxe Detail', car: 'Honda Accord', date: '2024-01-15', status: 'In Progress', amount: '₦15,000' },
    { id: 3, customer: 'Mike Johnson', service: 'Basic Wash', car: 'Nissan Altima', date: '2024-01-14', status: 'Scheduled', amount: '₦5,000' }
  ];

  const services = [
    { id: 1, name: 'Basic Wash', price: 5000, duration: 30, active: true },
    { id: 2, name: 'Premium Wash', price: 8500, duration: 45, active: true },
    { id: 3, name: 'Deluxe Detail', price: 15000, duration: 90, active: true }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'services', label: 'Services', icon: Settings },
    { id: 'users', label: 'Users', icon: Users }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage your car wash business operations</p>
      </div>

      <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${
              activeTab === tab.id
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-lg ${stat.bg}`}>
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-gray-900">Recent Bookings</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900">{booking.customer}</h3>
                        <p className="text-sm text-gray-600">{booking.service} - {booking.car}</p>
                        <p className="text-sm text-gray-500">{booking.date}</p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                          booking.status === 'Completed' 
                            ? 'bg-green-100 text-green-800'
                            : booking.status === 'In Progress'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {booking.status}
                        </span>
                        <p className="text-sm font-medium text-gray-900 mt-1">{booking.amount}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-gray-900">Revenue Chart</h2>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-blue-500 mx-auto mb-2" />
                    <p className="text-gray-600">Revenue analytics will appear here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'services' && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Manage Services</h2>
              <Button>Add New Service</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Service Name</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Price</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Duration</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((service) => (
                    <tr key={service.id} className="border-b border-gray-100">
                      <td className="py-3 px-4 font-medium">{service.name}</td>
                      <td className="py-3 px-4">₦{service.price.toLocaleString()}</td>
                      <td className="py-3 px-4">{service.duration} min</td>
                      <td className="py-3 px-4">
                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                          service.active 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {service.active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="ghost" size="sm">
                            {service.active ? 'Deactivate' : 'Activate'}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}