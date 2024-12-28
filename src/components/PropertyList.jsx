import React from 'react';
import { Grid, Paper } from '@mui/material';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import PropertyCard from './PropertyCard';

const PropertyList = ({ properties, favorites, onFavorite }) => {
  return (
    <Droppable droppableId="propertyList">
      {(provided, snapshot) => (
        <Grid
          container
          spacing={3}
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="property-list"
          sx={{
            minHeight: '100px',
            padding: 2,
            backgroundColor: snapshot.isDraggingOver ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
            transition: 'background-color 0.2s ease',
            borderRadius: 1
          }}
        >
          {properties.map((property, index) => (
            <Draggable 
              key={property.id} 
              draggableId={property.id} 
              index={index}
            >
              {(provided, snapshot) => (
                <Grid 
                  item 
                  xs={12} 
                  sm={6} 
                  lg={4}
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  sx={{
                    transition: 'transform 0.2s ease',
                    transform: snapshot.isDragging ? 'scale(1.02)' : 'scale(1)',
                    '& > *': { // Target the Card component
                      opacity: snapshot.isDragging ? 0.9 : 1,
                      boxShadow: snapshot.isDragging ? 
                        '0 8px 16px rgba(0,0,0,0.1)' : 
                        '0 2px 4px rgba(0,0,0,0.05)',
                    }
                  }}
                >
                  <PropertyCard 
                    property={property} 
                    index={index}
                    onFavorite={onFavorite}
                    isFavorite={favorites.some(f => f.id === property.id)}
                    isDragging={snapshot.isDragging}
                  />
                </Grid>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </Grid>
      )}
    </Droppable>
  );
};

export default PropertyList;