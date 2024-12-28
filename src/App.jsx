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

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

    </>
  )
}

export default App
