import React from 'react';
import { Button } from '../ui/Button';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Calendar, Bell } from 'lucide-react';
import { CarIcon } from '../ui/CarIcons';

interface QuickActionsProps {
    onBookService?: () => void;
    onAddVehicle?: () => void;
    onNotificationSettings?: () => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({
    onBookService,
    onAddVehicle,
    onNotificationSettings,
}) => (
    <Card>
        <CardHeader>
            <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
        </CardHeader>
        <CardContent className="space-y-4">
            <Button className="w-full" size="lg" onClick={onBookService}>
                <Calendar className="h-5 w-5 mr-2" />
                Book New Service
            </Button>
            <Button variant="outline" className="w-full" size="lg" onClick={onAddVehicle}>
                <CarIcon className="h-5 w-5 mr-2" />
                Add Vehicle
            </Button>
            <Button variant="outline" className="w-full" size="lg" onClick={onNotificationSettings}>
                <Bell className="h-5 w-5 mr-2" />
                Notification Settings
            </Button>
        </CardContent>
    </Card>
);

export default QuickActions; 