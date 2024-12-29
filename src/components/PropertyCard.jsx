// Importing necessary react and Materual-UI components
import React from 'react';
import { Card, CardContent, CardActions, Typography, IconButton, Box, Chip } from '@mui/material';

// Importing drag and drop components from the DND library
import { Draggable } from '@hello-pangea/dnd';

// Importing icons from Material-UI
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BedIcon from '@mui/icons-material/Bed';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';

// PropertyCard component with destructed props
const PropertyCard = ({ 
  property, //Property data object 
  index,  //Index of the property in the list
  onFavorite,   //Function to handle favorite property
  isFavorite,   //Boolean value to check if the property is favorite
  showFavoriteIcon = true   //Boolean value to show favorite icon
}) => {
  
  return(
    // Draggable components for drag and drop funcitonality
    <Draggable draggableId={property.id} index={index}>
      {(provided, snapshot) => (

        // Material-UI Card with custome styling and drag props
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="property-card"
          sx={{
            //Hover and transition effects
            position: 'relative',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            },
            borderRadius: '12px',
            overflow: 'hidden',
            bgcolor: 'background.paper',
          }}
        >
          <Link 
            to={`/property/${property.id}`} // Link to navigate to the property details page
            style={{ textDecoration: 'none', color: 'inherit' }} // Remove default link styling
          >
            <Box
              sx={{
                position: 'relative',
                paddingTop: '66.67%', // 3:2 aspect ratio
                overflow: 'hidden',
              }}
            >
              <img
                src={property.picture} // Property image URL
                alt={property.location}  // Alt text for the image
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease-in-out',
                }}

                //Image zoom on hover
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              />
              
              <Box
                sx={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  display: 'flex',
                  gap: 1,
                }}
              >
                <Chip
                  icon={<HomeIcon sx={{ color: 'white' }} />}
                  label={property.type}
                  size="small"
                  sx={{
                    bgcolor: 'rgba(0, 0, 0, 0.6)',
                    color: 'white',
                    backdropFilter: 'blur(4px)',
                  }}
                />
                <Chip
                  icon={<BedIcon sx={{ color: 'white' }} />}
                  label={`${property.bedrooms} bed`}
                  size="small"
                  sx={{
                    bgcolor: 'rgba(0, 0, 0, 0.6)',
                    color: 'white',
                    backdropFilter: 'blur(4px)',
                  }}
                />
              </Box>
            </Box>
          </Link>
          <CardContent sx={{ pt: 2, pb: 1 }}> 
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600,
                mb: 1,
                fontSize: '1.5rem',
              }}
            >
              £{property.price.toLocaleString()} {/* Displaying property price formatted with commas */}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <LocationOnIcon sx={{ color: 'primary.main', mr: 1, fontSize: '1.2rem' }} />
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ 
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {property.location}
              </Typography>
            </Box>

            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                minHeight: '40px',
              }}
            >
              {property.description.replace(/<br>/g, ' ')} {/* // Displaying property description, replacing <br> with space */}
            </Typography>
          </CardContent>

          {showFavoriteIcon && (
            <CardActions sx={{ justifyContent: 'flex-end', pt: 0 }}>
              <IconButton 
                onClick={(e) => {
                  e.preventDefault();
                  onFavorite(property);
                }}
                sx={{
                  color: isFavorite ? 'error.main' : 'action.disabled',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.1)',
                    color: 'error.main',
                  }
                }}
              >
                <FavoriteIcon />
              </IconButton>
            </CardActions>
          )}
        </Card>
      )}
    </Draggable>
  );
};

export default PropertyCard;