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

// Define the libraries needed for Google Maps integration
const libraries = ['places'];

function App() { 
  // Initialize properties state with data from the properties JSON file
  const [properties] = useState(propertiesData.properties);
  
  // Initialize favorites state using custom localStorage hook
  // This persists favorites between page refreshes
  const [favorites, setFavorites] = useLocalStorage('favorites', []);
  
  // Initialize searchResults state with persisted filters
  // This maintains filter state when navigating between pages
  const [searchResults, setSearchResults] = useState(() => {
    // Check if there are any saved search criteria in localStorage
    const savedCriteria = localStorage.getItem('searchCriteria');
    if (savedCriteria) {
      // Parse the saved criteria from JSON
      const criteria = JSON.parse(savedCriteria);
      
      // Filter properties based on saved criteria
      return properties.filter(property => {
        // Apply type filter
        if (criteria.type && property.type !== criteria.type) return false;
        
        // Apply price range filters
        if (criteria.minPrice && property.price < parseInt(criteria.minPrice)) return false;
        if (criteria.maxPrice && property.price > parseInt(criteria.maxPrice)) return false;
        
        // Apply bedroom range filters
        if (criteria.minBedrooms && property.bedrooms < parseInt(criteria.minBedrooms)) return false;
        if (criteria.maxBedrooms && property.bedrooms > parseInt(criteria.maxBedrooms)) return false;
        
        // Apply location filter
        if (criteria.location && property.location !== criteria.location) return false;
        
        // Apply date range filters if either date is set
        if (criteria.dateAfter || criteria.dateBefore) {
          // Convert property date string to Date object
          const propertyDate = new Date(property.added.year, 
            new Date(Date.parse(property.added.month + " 1, 2012")).getMonth(), 
            property.added.day);
          
          // Check if property date is within the selected range
          if (criteria.dateAfter && propertyDate < new Date(criteria.dateAfter)) return false;
          if (criteria.dateBefore && propertyDate > new Date(criteria.dateBefore)) return false;
        }
        
        // Include property if it passes all filters
        return true;
      });
    }
    // If no saved criteria, return all properties
    return properties;
  });
  
  // Get current location for routing purposes
  const location = useLocation();
  
  // Determine whether to show header (hide on property details page)
  const showHeader = !location.pathname.includes('/property/');

  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    
    // Return if dropped outside a droppable area or dropped in the same place
    if (!destination || 
        (source.droppableId === destination.droppableId && 
         source.index === destination.index)) {
      return;
    }
    
    // Find the property being dragged
    const property = properties.find(p => p.id === draggableId);
    if (!property) return;

    // Handle dropping into favorites list
    if (destination.droppableId === 'favoritesList' && 
        source.droppableId === 'propertyList') {
      // Add to favorites if not already present
      if (!favorites.some(f => f.id === property.id)) {
        setFavorites(prev => [...prev, property]);
      }
    }
    // Handle removing from favorites list
    else if (source.droppableId === 'favoritesList' &&  destination.droppableId === 'propertyList') {
      // Remove from favorites
      setFavorites(prev => prev.filter(f => f.id !== property.id));
    }
  };
  
  // Handle property search based on filter criteria
  const handleSearch = (criteria) => {
    const filteredProperties = properties.filter(property => {
      // Apply the same filtering logic as in the initial state
      if (criteria.type && property.type !== criteria.type) return false;
      if (criteria.minPrice && property.price < parseInt(criteria.minPrice)) return false;
      if (criteria.maxPrice && property.price > parseInt(criteria.maxPrice)) return false;
      if (criteria.minBedrooms && property.bedrooms < parseInt(criteria.minBedrooms)) return false;
      if (criteria.maxBedrooms && property.bedrooms > parseInt(criteria.maxBedrooms)) return false;
      if (criteria.location && property.location !== criteria.location) return false;
      
      if (criteria.dateAfter || criteria.dateBefore) {
        const propertyDate = new Date(property.added.year, 
          new Date(Date.parse(property.added.month + " 1, 2012")).getMonth(), 
          property.added.day);
        
        if (criteria.dateAfter && propertyDate < new Date(criteria.dateAfter)) return false;
        if (criteria.dateBefore && propertyDate > new Date(criteria.dateBefore)) return false;
      }
      
      return true;
    });
    
    // Update the search results state
    setSearchResults(filteredProperties);
  };

  // Handle toggling property favorite status
  const handleFavoriteToggle = (property) => {
    setFavorites(prev => {
      // Check if property is already in favorites
      const exists = prev.some(f => f.id === property.id);
      // Remove if exists, add if doesn't exist
      return exists 
        ? prev.filter(f => f.id !== property.id)
        : [...prev, property];
    });
  };

  // Render search page content
  const renderContent = () => {
    if (location.pathname === '/search') {
      return (
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="search-page">
            <SearchForm 
              onSearch={handleSearch} 
              properties={properties}
            />
            <div className="content-wrapper">
              <PropertyList 
                properties={searchResults}
                favorites={favorites}
                onFavorite={handleFavoriteToggle}
              />
              <FavoritesList 
                favorites={favorites}
                onRemove={(id) => setFavorites(prev => prev.filter(f => f.id !== id))}
                onClear={() => setFavorites([])}
              />
            </div>
          </div>
        </DragDropContext>
      );
    }
    return null;
  };

  return (
    // Load Google Maps script with API key
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      libraries={libraries}
      loadingElement={<div>Loading maps...</div>}
    >
      <Box className="app">
        {/* Conditionally render header */}
        {showHeader && <Header />}
        
        {/* Main content area */}
        <Box sx={{ minHeight: '100vh' }}>
          {/* Route configuration */}
          <Routes>
            {/* Home page route */}
            <Route path="/" element={<HomePage />} />
            
            {/* Search page route */}
            <Route path="/search" element={renderContent()} />
            
            {/* Property details route */}
            <Route 
              path="/property/:id" 
              element={<PropertyDetails properties={properties} />}
            />
          </Routes>
        </Box>
      </Box>
    </LoadScript>
  );
}

export default App;