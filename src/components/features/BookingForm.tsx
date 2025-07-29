import React, { useState } from 'react';
import { Calendar, Clock, MapPin, MessageSquare } from 'lucide-react';
import UberCard from '../ui/UberCard';
import UberButton from '../ui/UberButton';
import UberInput from '../ui/UberInput';

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
    <UberCard variant="elevated" padding="lg">
      <div className="mb-8">
        <h2 className="text-heading font-semibold text-gray-900 mb-6">Book Your Service</h2>
        {selectedService && selectedCar && (
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
            <p className="text-body text-blue-800 mb-2">
              <strong>{selectedService.name}</strong> for {selectedCar.year} {selectedCar.make} {selectedCar.model}
            </p>
            <p className="text-subheading font-bold text-blue-900">₦{selectedService.price.toLocaleString()}</p>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UberInput
            type="date"
            label="Select Date"
            icon={<Calendar className="h-4 w-4" />}
            value={formData.date}
            onChange={(value) => setFormData(prev => ({ ...prev, date: value }))}
            required
          />

          <div>
            <label className="block text-caption font-medium text-gray-700 mb-3">
              <Clock className="h-4 w-4 inline mr-2" />
              Select Time
            </label>
            <div className="grid grid-cols-3 gap-3">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  type="button"
                  className={`p-3 text-caption rounded-xl border transition-all duration-200 font-medium ${formData.time === time
                      ? 'bg-blue-500 text-white border-blue-500 shadow-md'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300 hover:shadow-sm'
                    }`}
                  onClick={() => setFormData(prev => ({ ...prev, time }))}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>

        <UberInput
          type="text"
          label="Service Address"
          icon={<MapPin className="h-4 w-4" />}
          placeholder="Enter your address"
          value={formData.address}
          onChange={(value) => setFormData(prev => ({ ...prev, address: value }))}
          required
        />

        <div>
          <label className="block text-caption font-medium text-gray-700 mb-3">
            <MessageSquare className="h-4 w-4 inline mr-2" />
            Special Instructions (Optional)
          </label>
          <textarea
            className="w-full px-4 py-3 border border-gray-300 rounded-xl text-body focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none"
            rows={3}
            placeholder="Any special instructions for our team..."
            value={formData.specialInstructions}
            onChange={(e) => setFormData(prev => ({ ...prev, specialInstructions: e.target.value }))}
          />
        </div>

        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-body text-gray-600">Service Duration:</span>
              <span className="text-body font-medium">{selectedService?.duration || 0} minutes</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-body text-gray-600">Service Fee:</span>
              <span className="text-body font-medium">₦{selectedService?.price.toLocaleString() || 0}</span>
            </div>
            <div className="border-t border-gray-300 pt-3">
              <div className="flex justify-between items-center">
                <span className="text-subheading font-semibold text-gray-900">Total:</span>
                <span className="text-subheading font-bold text-blue-600">
                  ₦{selectedService?.price.toLocaleString() || 0}
                </span>
              </div>
            </div>
          </div>
        </div>

        <UberButton
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
        >
          Proceed to Payment
        </UberButton>
      </form>
    </UberCard>
  );
}