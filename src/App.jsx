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
  const [properties] = useState(propertiesData.properties);
  const [favorites, setFavorites] = useLocalStorage('favorites', []);
  const [searchResults, setSearchResults] = useState(properties);
  const location = useLocation();
  
  // Hide header on property details page
  const showHeader = !location.pathname.includes('/property/');

  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    
    const property = properties.find(p => p.id === draggableId);
    
    if (destination.droppableId === 'favoritesList' && 
        !favorites.some(f => f.id === property.id)) {
      setFavorites(prev => [...prev, property]);
    } 
    else if (source.droppableId === 'favoritesList' && destination.droppableId === 'propertyList') {
      setFavorites(prev => prev.filter(f => f.id !== property.id));
    }
  };

  const handleSearch = (criteria) => {
    const filteredProperties = properties.filter(property => {
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
    
    setSearchResults(filteredProperties);
  };

  const handleFavoriteToggle = (property) => {
    setFavorites(prev => {
      const exists = prev.some(f => f.id === property.id);
      return exists 
        ? prev.filter(f => f.id !== property.id)
        : [...prev, property];
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
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      libraries={libraries}
      loadingElement={<div>Loading maps...</div>}
    >
      <Box className="app">
        {showHeader && <Header />}
        <Box sx={{ minHeight: '100vh' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={renderContent()} />
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