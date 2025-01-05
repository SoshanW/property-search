import React from 'react';
import { Grid, Box } from '@mui/material';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import PropertyCard from './PropertyCard';

const PropertyList = ({ properties, favorites, onFavorite }) => {
  return (
    <Box sx={{ width: '100%', overflow: 'visible' }}>
      <Droppable droppableId="propertyList" isDropDisabled={false}>
        {(provided, snapshot) => (
          <Grid
            container
            spacing={3}
            {...provided.droppableProps}
            ref={provided.innerRef}
            sx={{
              minHeight: '100px',
              width: '100%',
              margin: '0 !important', // Override default negative margins
              backgroundColor: snapshot.isDraggingOver ? 
                'rgba(25, 118, 210, 0.08)' : 
                'transparent',
              transition: 'background-color 0.2s ease',
              position: 'relative',
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
                      p: 2, // Consistent padding
                      transform: 'none !important', // Override potential transform conflicts
                      '&::after': snapshot.isDragging ? {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'transparent',
                        zIndex: -1,
                      } : {},
                    }}
                  >
                    <Box
                      sx={{
                        transition: 'transform 0.2s ease',
                        transform: snapshot.isDragging ? 'scale(1.02)' : 'scale(1)',
                        height: '100%',
                      }}
                    >
                      <PropertyCard 
                        property={property} 
                        index={index}
                        onFavorite={onFavorite}
                        isFavorite={favorites.some(f => f.id === property.id)}
                        isDragging={snapshot.isDragging}
                      />
                    </Box>
                  </Grid>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Grid>
        )}
      </Droppable>
    </Box>
  );
};

export default PropertyList;