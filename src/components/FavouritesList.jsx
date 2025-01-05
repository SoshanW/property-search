import React from 'react';
import { List, ListItem, IconButton, Typography, Button, Paper, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';

const FavoritesList = ({ favorites, onRemove, onClear }) => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:768px)');

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
      
      <Droppable droppableId="favoritesList" isDropDisabled={false}>
        {(provided, snapshot) => (
          <List
            {...provided.droppableProps}
            ref={provided.innerRef}
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
            {favorites.length === 0 ? (
              <ListItem sx={{ justifyContent: 'center', py: 4 }}>
                <Typography color="text.secondary">
                  No favorites yet. Drag properties here or click the heart icon to add.
                </Typography>
              </ListItem>
            ) : (
              favorites.map((property, index) => (
                <Draggable 
                  key={property.id} 
                  draggableId={property.id} 
                  index={index}
                >
                  {(provided, snapshot) => (
                    <ListItem 
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
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
                        },
                        backgroundColor: snapshot.isDragging ? 'rgba(25, 118, 210, 0.08)' : 'transparent'
                      }}
                    >
                      <Box 
                        onClick={() => handlePropertyClick(property.id)}
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
                          {property.type} - {property.bedrooms} bed
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
                          <span>{property.location}</span>
                          <span style={{ fontWeight: 500, whiteSpace: 'nowrap' }}>
                            £{property.price.toLocaleString()}
                          </span>
                        </Typography>
                      </Box>
                      <IconButton 
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemove(property.id);
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
                  )}
                </Draggable>
              ))
            )}
            {provided.placeholder}
          </List>
        )}
      </Droppable>
    </Paper>
  );
};

export default FavoritesList;