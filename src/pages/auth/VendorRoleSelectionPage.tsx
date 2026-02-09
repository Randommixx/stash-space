import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Truck, Camera, Film, ArrowLeft } from 'lucide-react';

const VendorRoleSelectionPage: React.FC = () => {
  const roles = [
    {
      id: 'driver',
      title: 'Driver',
      description: 'Access trip logs, fuel entries, and geofence monitoring',
      icon: Truck,
      path: '/vendor/driver/login',
    },
    {
      id: 'camera_crew',
      title: 'Camera Man',
      description: 'Manage asset handovers, camera reports, and expendables',
      icon: Camera,
      path: '/vendor/cameraman/login',
    },
    {
      id: 'producer',
      title: 'Producer',
      description: 'Full access to all modules, reports, and management features',
      icon: Film,
      path: '/vendor/producer/login',
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">Vendor Login</h1>
          <p className="text-muted-foreground">Select your role to continue</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {roles.map((role) => (
            <Link key={role.id} to={role.path}>
              <Card className="h-full hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary">
                <CardHeader className="text-center pb-2">
                  <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
                    <role.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-lg">{role.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-sm">
                    {role.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Are you a customer?{' '}
            <Link to="/customer/login" className="text-primary hover:underline font-medium">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VendorRoleSelectionPage;
