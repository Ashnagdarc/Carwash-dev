import React from 'react';
import UberCard from '../../ui/UberCard';
import UberButton from '../../ui/UberButton';
import { Plus } from 'lucide-react';
import { CarIcon } from '../../ui/CarIcons';

interface Vehicle {
    name: string;
    licensePlate: string;
    lastService: string;
}

interface UserDashboardVehiclesProps {
    vehicles: Vehicle[];
    setShowVehicleModal: (show: boolean) => void;
}

const UserDashboardVehicles: React.FC<UserDashboardVehiclesProps> = ({
    vehicles,
    setShowVehicleModal
}) => (
    <div className="space-y-10">
        <UberCard variant="elevated" padding="lg">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-heading font-semibold text-gray-900">My Vehicles</h3>
                <UberButton
                    variant="primary"
                    size="md"
                    icon={<Plus className="h-5 w-5" />}
                    onClick={() => setShowVehicleModal(true)}
                >
                    Add Vehicle
                </UberButton>
            </div>
            <div className="space-y-6">
                {vehicles.map((vehicle, index) => (
                    <div key={index} className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                                <CarIcon className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-body font-semibold text-gray-900">{vehicle.name}</p>
                                <p className="text-caption text-gray-600">{vehicle.licensePlate}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <span className="text-caption text-gray-500">{vehicle.lastService}</span>
                            <UberButton variant="outline" size="sm">
                                Edit
                            </UberButton>
                        </div>
                    </div>
                ))}
            </div>
        </UberCard>
    </div>
);

export default UserDashboardVehicles; 