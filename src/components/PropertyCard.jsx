import { Draggable } from '@hello-pangea/dnd';
import { Card } from '@mui/material';
import React from 'react';

const PropertyCard = ({ 
  property,
  index,
  onFavourite,
  isFavourite,
  showFavourite = true,
}) => {
  return(
    <Draggable draggableId={property.id} index={index}>
      {(provided, snapshot) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="property-card"
          sx={{
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
            to={`/property/${property.id}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Box
              sx={{
                position: 'relative',
                paddingTop: '66.67%', // 3:2 aspect ratio
                overflow: 'hidden',
              }}
            >
              <img
                src={property.picture}
                alt={property.location}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease-in-out',
                }}
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
              £{property.price.toLocaleString()}
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
              {property.description.replace(/<br>/g, ' ')}
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