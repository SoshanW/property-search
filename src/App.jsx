import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import { DragDropContext } from '@hello-pangea/dnd';
import { LoadScript } from '@react-google-maps/api';
import SearchForm from './components/SearchForm';
import PropertyList from './components/PropertyList';
import FavoritesList from './components/FavouritesList';
import PropertyDetails from './components/PropertyDetails';
import HomePage from './components/HomePage';
import useLocalStorage from './hooks/useLocalStorage';
import propertiesData from './data/properties';
import { Box } from '@mui/material';

// Libraries for Google Maps
const libraries = ['places'];

function App() { 
  const [properties] = useState(propertiesData.properties); // State for properties data
  const [favorites, setFavorites] = useLocalStorage('favorites', []); // State for favorites using local storage
  const [searchResults, setSearchResults] = useState(properties); // State for search results
  const location = useLocation();  // Hook to get the current location
  
  // Hide header on property details page
  const showHeader = !location.pathname.includes('/property/'); //Header should not be shown on property details page

  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    
    const property = properties.find(p => p.id === draggableId);
    
    // If the property is dropped in the favorites list and is not already a favorite
    if (destination.droppableId === 'favoritesList' && 
        !favorites.some(f => f.id === property.id)) {
      setFavorites(prev => [...prev, property]);
    } 
    // If the property is dragged out of favorites to the property list
    else if (source.droppableId === 'favoritesList' && destination.droppableId === 'propertyList') {
      setFavorites(prev => prev.filter(f => f.id !== property.id)); // Remove the property from favorites
    } 
  };

  // Handle search based on criteria
  const handleSearch = (criteria) => {
    
    // Filter properties based on search criteria
    const filteredProperties = properties.filter(property => {
      if (criteria.type && property.type !== criteria.type) return false;
      if (criteria.minPrice && property.price < parseInt(criteria.minPrice)) return false;
      if (criteria.maxPrice && property.price > parseInt(criteria.maxPrice)) return false;
      if (criteria.minBedrooms && property.bedrooms < parseInt(criteria.minBedrooms)) return false;
      if (criteria.maxBedrooms && property.bedrooms > parseInt(criteria.maxBedrooms)) return false;
      if (criteria.location && property.location !== criteria.location) return false;
      
      // Handle date filtering
      if (criteria.dateAfter || criteria.dateBefore) {
        const propertyDate = new Date(property.added.year, 
          new Date(Date.parse(property.added.month + " 1, 2012")).getMonth(), 
          property.added.day);
        
        if (criteria.dateAfter && propertyDate < new Date(criteria.dateAfter)) return false;
        if (criteria.dateBefore && propertyDate > new Date(criteria.dateBefore)) return false;
      }
      
      return true; // Include property if it meets all criteria
    });
    
    setSearchResults(filteredProperties);  // Update search results state
  };


  // Handle toggling of favorite status for a property
  const handleFavoriteToggle = (property) => {
    setFavorites(prev => {
      const exists = prev.some(f => f.id === property.id); // Check if property is already a favorite
      return exists 
        ? prev.filter(f => f.id !== property.id) // Remove from favorites if it exists
        : [...prev, property]; // Add to favorites if it doesn't exist
    });
  };

  // Only show DragDropContext on search page
  const renderContent = () => {
    if (location.pathname === '/search') {
      return (
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="search-page">
            <SearchForm onSearch={handleSearch} properties={properties} />
            <div className="content-wrapper">
              <PropertyList 
                properties={searchResults} // List of properties based on search results
                favorites={favorites} // List of favorite properties
                onFavorite={handleFavoriteToggle} // Function to toggle favorite status
              />
              <FavoritesList 
                favorites={favorites} // List of favorite properties
                onRemove={(id) => setFavorites(prev => prev.filter(f => f.id !== id))}
                onClear={() => setFavorites([])}
              />
            </div>
          </div>
        </DragDropContext>
      );
    }
    return null; // Return null if not on search page
  };

  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} // Load Google Maps API key from environment variables
      libraries={libraries} // Load specified libraries for Google Maps
      loadingElement={<div>Loading maps...</div>} // Loading element while maps are being loaded
    >
      <Box className="app">
        {showHeader && <Header />}
        <Box sx={{ minHeight: '100vh' }}>
          <Routes>
            <Route path="/" element={<HomePage />} /> {/* Route for home page */}
            <Route path="/search" element={renderContent()} /> {/* Route for search page */}
            <Route 
              path="/property/:id" 
              element={<PropertyDetails properties={properties} />} // Route for property details page
            />
          </Routes>
        </Box>
      </Box>
    </LoadScript>
  );
}

export default App;