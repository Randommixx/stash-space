import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Calendar, Trash2, Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { BookingModal } from '@/components/bookings/BookingModal';

// Mock data - would be fetched from backend in real app
const mockFavorites = [
  {
    id: '1',
    name: 'Sony A7S III',
    category: 'Camera',
    vendor: 'Pro Film Rentals',
    vendorRating: 4.8,
    dailyRate: 150,
    weeklyRate: 900,
    rating: 4.9,
    totalReviews: 234,
    image: '/placeholder.svg',
    availability: 'available' as const,
    addedDate: '2024-01-15',
  },
  {
    id: '2',
    name: 'Canon 24-70mm f/2.8',
    category: 'Lens',
    vendor: 'Lens Masters',
    vendorRating: 4.7,
    dailyRate: 75,
    weeklyRate: 450,
    rating: 4.8,
    totalReviews: 156,
    image: '/placeholder.svg',
    availability: 'rented' as const,
    addedDate: '2024-01-20',
  },
];

export const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState(mockFavorites);
  const [searchTerm, setSearchTerm] = useState('');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<any>(null);

  const filteredFavorites = favorites.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.vendor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRemoveFavorite = (id: string) => {
    setFavorites(favorites.filter(item => item.id !== id));
  };

  const handleBookNow = (item: any) => {
    setSelectedEquipment(item);
    setBookingModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">My Favorites</h1>
        <p className="text-muted-foreground mt-2">
          Equipment you've saved for later
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search favorites..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Favorites List */}
      {filteredFavorites.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Heart className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {favorites.length === 0 ? 'No favorites yet' : 'No results found'}
            </h3>
            <p className="text-muted-foreground text-center mb-6">
              {favorites.length === 0 
                ? 'Start adding equipment to your favorites to see them here'
                : 'Try adjusting your search'}
            </p>
            <Link to="/customer/browse">
              <Button variant="gradient">Browse Equipment</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredFavorites.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <Badge
                  className="absolute top-2 right-2"
                  variant={item.availability === 'available' ? 'default' : 'secondary'}
                >
                  {item.availability === 'available' ? 'Available' : 'Rented'}
                </Badge>
              </div>

              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                    <CardDescription className="mt-1">
                      {item.vendor} • {item.category}
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveFavorite(item.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-sm ${
                          i < Math.floor(item.rating)
                            ? 'text-yellow-400'
                            : 'text-muted'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {item.rating} ({item.totalReviews})
                  </span>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-foreground">
                    ₹{item.dailyRate}
                  </span>
                  <span className="text-sm text-muted-foreground">/day</span>
                  <span className="text-sm text-muted-foreground ml-2">
                    ₹{item.weeklyRate}/week
                  </span>
                </div>

                <div className="space-y-2">
                  <Button
                    variant="gradient"
                    size="lg"
                    className="w-full"
                    onClick={() => handleBookNow(item)}
                    disabled={item.availability !== 'available'}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {item.availability === 'available' ? 'Book Now' : 'Currently Rented'}
                  </Button>
                  <Button variant="outline" size="lg" className="w-full" asChild>
                    <Link to={`/customer/browse?equipment=${item.id}`}>
                      View Details
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Booking Modal */}
      {selectedEquipment && (
        <BookingModal
          isOpen={bookingModalOpen}
          onClose={() => setBookingModalOpen(false)}
          equipment={selectedEquipment}
        />
      )}
    </div>
  );
};
