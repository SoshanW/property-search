import React from 'react';
import { List, ListItem, IconButton, Typography, Button, Paper, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Droppable } from '@hello-pangea/dnd';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';

// FavoritesList component definition
const FavoritesList = ({ favorites, onRemove, onClear }) => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:768px)');

  // Function to handle property click and navigate to property details
  const handlePropertyClick = (propertyId) => {
    navigate(`/property/${propertyId}`);
  };

  return (
    <Paper 
      elevation={2}
      className="favorites-list-container"
      sx={{
        width: isMobile ? '100%' : 300,
        backgroundColor: 'background.paper',
        borderRadius: 2,
        overflow: 'hidden'
      }}
    >
      <Typography 
        variant="h6" 
        sx={{ 
          p: 2, 
          borderBottom: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <span>Favorites ({favorites.length})</span>
        {favorites.length > 0 && (
          <Button 
            onClick={onClear}
            size="small"
            variant="outlined"
            color="error"
            sx={{ ml: 1 }}
          >
            Clear All
          </Button>
        )}
      </Typography>
      
      <Droppable droppableId="favoritesList"> 
        {/* Droppable area for drag-and-drop */}
        {(provided, snapshot) => (
          <List
            {...provided.droppableProps}  // Props for droppable functionality
            ref={provided.innerRef}   // Reference for the droppable area
            sx={{
              minHeight: isMobile ? 'auto' : 100,
              backgroundColor: snapshot.isDraggingOver ? 
                'rgba(25, 118, 210, 0.08)' : 
                'transparent',
              transition: 'background-color 0.2s ease',
              p: 0,
              maxHeight: isMobile ? '300px' : '500px',
              overflowY: 'auto'
            }}
          >
            {favorites.length === 0 ? ( // Check if there are no favorites
              <ListItem sx={{ justifyContent: 'center', py: 4 }}>
                <Typography color="text.secondary">
                  No favorites yet. Drag properties here or click the heart icon to add.
                </Typography>
              </ListItem>
            ) : (
              favorites.map((property, index) => ( // Map through favorites to display each property
                <ListItem 
                  key={property.id} // Unique key for each list item
                  sx={{
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    '&:last-child': {
                      borderBottom: 'none'
                    },
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p: 2,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: 'action.hover',
                      cursor: 'pointer'
                    }
                  }}
                >
                  <Box 
                    onClick={() => handlePropertyClick(property.id)} // Navigate to property details on click
                    sx={{ 
                      flex: 1,
                      mr: 1,
                      '&:hover': {
                        color: 'primary.main'
                      }
                    }}
                  >
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        mb: 0.5,
                        fontWeight: 500,
                        fontSize: isMobile ? '1rem' : 'inherit'
                      }}
                    >
                      {property.type} - {property.bedrooms} bed {/* Display property type and bedrooms */}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ 
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 2,
                        flexWrap: isMobile ? 'wrap' : 'nowrap'
                      }}
                    >
                      <span>{property.location}</span> {/* Display property location */}
                      <span style={{ fontWeight: 500, whiteSpace: 'nowrap' }}>
                        £{property.price.toLocaleString()} {/* Display property price */}
                      </span>
                    </Typography>
                  </Box>
                  <IconButton 
                    onClick={(e) => {
                      e.stopPropagation();  // Prevent click from bubbling up
                      onRemove(property.id); // Call onRemove function to remove property
                    }}
                    size="small"
                    sx={{
                      ml: 1,
                      '&:hover': {
                        color: 'error.main'
                      }
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </ListItem>
              ))
            )}
            {provided.placeholder} {/* Placeholder for drag-and-drop functionality */}
          </List>
        )}
      </Droppable>
    </Paper>
  );
};

export default FavoritesList;