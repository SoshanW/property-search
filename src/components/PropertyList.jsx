import React from 'react';
import { Grid } from '@mui/material';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import PropertyCard from './PropertyCard';

const PropertyList = ({ properties, favorites, onFavorite }) => {
  return (
    // Droppable container that accepts dragged items
    // isDropDisabled={false} allows items to be dropped here
    <Droppable droppableId="propertyList" isDropDisabled={false}>
      {(provided, snapshot) => (
        // Material-UI Grid container with drag and drop functionality
        <Grid
          container
          spacing={3}
          {...provided.droppableProps}  // Spread droppable props from react-beautiful-dnd
          ref={provided.innerRef}       // Required ref for drag and drop
          className="property-list"
          sx={{
            minHeight: '100px',
            padding: 2,
            // Change background color when dragging over this area
            backgroundColor: snapshot.isDraggingOver ? 
              'rgba(25, 118, 210, 0.08)' : 
              'transparent',
            transition: 'background-color 0.2s ease',
            borderRadius: 1
          }}
        >
          {/* Map through properties array to create draggable property cards */}
          {properties.map((property, index) => (
            // Draggable wrapper for each property card
            <Draggable 
              key={property.id}         // Unique identifier for each draggable item
              draggableId={property.id}  // ID used by drag and drop library
              index={index}             // Position in the list
            >
              {(provided, snapshot) => (
                // Grid item container for each property card
                <Grid 
                  item 
                  xs={12}  
                  sm={6}
                  lg={4}   
                  ref={provided.innerRef}
                  {...provided.draggableProps}    // Props for draggable functionality
                  {...provided.dragHandleProps}   // Props for drag handle
                  sx={{
                    transition: 'transform 0.2s ease',
                    // Scale up slightly when being dragged
                    transform: snapshot.isDragging ? 'scale(1.02)' : 'scale(1)',
                    // Styling for the dragged item
                    '& > *': {
                      opacity: snapshot.isDragging ? 0.9 : 1,
                      boxShadow: snapshot.isDragging ? 
                        '0 8px 16px rgba(0,0,0,0.1)' : 
                        '0 2px 4px rgba(0,0,0,0.05)',
                    }
                  }}
                >
                  {/* Property card component */}
                  <PropertyCard 
                    property={property}   // Property data
                    index={index}         // Position in list
                    onFavorite={onFavorite}  // Favorite toggle handler
                    // Check if this property is in favorites
                    isFavorite={favorites.some(f => f.id === property.id)}
                    isDragging={snapshot.isDragging}  // Dragging state
                  />
                </Grid>
              )}
            </Draggable>
          ))}
          {/* Required placeholder for drag and drop functionality */}
          {provided.placeholder}
        </Grid>
      )}
    </Droppable>
  );
};

export default PropertyList;