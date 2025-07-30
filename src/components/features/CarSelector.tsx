import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { CarIcon } from '../ui/CarIcons';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';

interface CarOption {
  id: string;
  make: string;
  model: string;
  year: number;
  color: string;
  type: string;
}

interface CarSelectorProps {
  cars: CarOption[];
  selectedCar?: CarOption;
  onSelectCar: (car: CarOption) => void;
  onAddCar: () => void;
}

export function CarSelector({ cars, selectedCar, onSelectCar, onAddCar }: CarSelectorProps) {
  const [view, setView] = useState<'2d' | '3d'>('2d');

  const carTypeIcons: Record<string, string> = {
    sedan: '🚗',
    suv: '🚙',
    hatchback: '🚕',
    coupe: '🏎️',
    truck: '🚚'
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Select Your Vehicle</h2>
        <div className="flex space-x-2">
          <Button
            variant={view === '2d' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setView('2d')}
          >
            2D View
          </Button>
          <Button
            variant={view === '3d' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setView('3d')}
          >
            3D View
          </Button>
        </div>
      </div>

      {view === '3d' && (
        <Card>
          <CardContent className="p-8">
            <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-20 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg flex items-center justify-center transform rotate-12">
                  <CarIcon className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">3D Car Preview</h3>
                <p className="text-gray-600">Interactive 3D model will appear here</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cars.map((car) => (
          <Card
            key={car.id}
            className={`cursor-pointer transition-all duration-200 ${selectedCar?.id === car.id
                ? 'ring-2 ring-blue-500 bg-blue-50'
                : 'hover:shadow-md'
              }`}
            onClick={() => onSelectCar(car)}
          >
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <div className="text-4xl">
                  {carTypeIcons[car.type] || '🚗'}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">
                    {car.year} {car.make} {car.model}
                  </h3>
                  <p className="text-sm text-gray-600 capitalize">
                    {car.color} {car.type}
                  </p>
                </div>
                {selectedCar?.id === car.id && (
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        <Card
          className="cursor-pointer border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
          onClick={onAddCar}
        >
          <CardContent className="p-4 flex items-center justify-center min-h-[100px]">
            <div className="text-center">
              <Plus className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Add New Vehicle</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}