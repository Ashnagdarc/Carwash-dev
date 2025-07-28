import React, { useState } from 'react';
import { Calendar, Clock, MapPin, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface BookingFormProps {
  selectedService?: { name: string; price: number; duration: number };
  selectedCar?: { make: string; model: string; year: number };
  onSubmit: (data: BookingData) => void;
}

interface BookingData {
  date: string;
  time: string;
  address: string;
  specialInstructions: string;
}

export function BookingForm({ selectedService, selectedCar, onSubmit }: BookingFormProps) {
  const [formData, setFormData] = useState<BookingData>({
    date: '',
    time: '',
    address: '',
    specialInstructions: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00'
  ];

  return (
    <Card>
      <CardHeader>
        <h2 className="text-2xl font-bold text-gray-900">Book Your Service</h2>
        {selectedService && selectedCar && (
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-800 mb-1">
              <strong>{selectedService.name}</strong> for {selectedCar.year} {selectedCar.make} {selectedCar.model}
            </p>
            <p className="text-2xl font-bold text-blue-900">₦{selectedService.price.toLocaleString()}</p>
          </div>
        )}
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              type="date"
              label="Select Date"
              icon={<Calendar className="h-5 w-5" />}
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              min={new Date().toISOString().split('T')[0]}
              required
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="h-4 w-4 inline mr-1" />
                Select Time
              </label>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    type="button"
                    className={`p-2 text-sm rounded-lg border transition-colors ${
                      formData.time === time
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                    }`}
                    onClick={() => setFormData(prev => ({ ...prev, time }))}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <Input
            type="text"
            label="Service Address"
            icon={<MapPin className="h-5 w-5" />}
            placeholder="Enter your address"
            value={formData.address}
            onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MessageSquare className="h-4 w-4 inline mr-1" />
              Special Instructions (Optional)
            </label>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500"
              rows={3}
              placeholder="Any special instructions for our team..."
              value={formData.specialInstructions}
              onChange={(e) => setFormData(prev => ({ ...prev, specialInstructions: e.target.value }))}
            />
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Service Duration:</span>
              <span className="font-medium">{selectedService?.duration || 0} minutes</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Service Fee:</span>
              <span className="font-medium">₦{selectedService?.price.toLocaleString() || 0}</span>
            </div>
            <div className="border-t pt-2">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-2xl font-bold text-blue-600">
                  ₦{selectedService?.price.toLocaleString() || 0}
                </span>
              </div>
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full">
            Proceed to Payment
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}