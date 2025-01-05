import React, { useState, useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Paper, 
  IconButton, 
  Chip,
  Grid,
  Divider,
  Fade,
  Slide
} from '@mui/material';
import { 
  ArrowBack,
  BedOutlined,
  HomeOutlined,
  LocationOnOutlined,
  AttachMoneyOutlined,
  GavelOutlined,
  Fullscreen,
  FullscreenExit,
  Close,
  NavigateNext,
  NavigateBefore
} from '@mui/icons-material';
import { GoogleMap, Marker } from '@react-google-maps/api';

// Enhanced Image Gallery Component
const ImageGallery = ({ images }) => {
  // State for controlling current image and fullscreen mode
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Add keyboard event listeners for navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      } else if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      } else if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [images.length, isFullscreen]);

  // Image navigation handlers
  const handleNext = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    setCurrentIndex((prev) => (prev + 1) % images.length); // Move to the next image
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length); // Move to the previous image
  };

  const toggleFullscreen = (e) => {
    e.stopPropagation();
    setIsFullscreen(!isFullscreen); // Toggle fullscreen state
  };

  return (
    <Box sx={{ position: 'relative', borderRadius: '16px', overflow: 'hidden' }}>
      {/* Main Image Container */}
      <Box
        sx={{
          position: isFullscreen ? 'fixed' : 'relative',
          backgroundColor: 'black',
          top: isFullscreen ? 0 : 'auto',
          left: isFullscreen ? 0 : 'auto',
          right: isFullscreen ? 0 : 'auto',
          bottom: isFullscreen ? 0 : 'auto',
          zIndex: isFullscreen ? 9999 : 1,
          width: isFullscreen ? '100vw' : '100%',
          height: isFullscreen ? '100vh' : 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {/* Current Image */}
        <img
          src={images[currentIndex]}
          alt={`Property image ${currentIndex + 1}`}
          style={{
            maxWidth: '100%',
            maxHeight: isFullscreen ? '100vh' : '600px',
            objectFit: 'contain',
            opacity: 1,
            transition: 'opacity 0.3s ease-in-out'
          }}
        />

        {/* Navigation Arrows */}
        <IconButton 
          onClick={handlePrev} // Click handler for previous image
          sx={{
            position: 'absolute',
            left: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            '&:hover': { 
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              transform: 'translateY(-50%) scale(1.1)',
            },
            transition: 'all 0.2s ease-in-out',
          }}
        >
          <NavigateBefore />
        </IconButton>

        <IconButton
          onClick={handleNext}
          sx={{
            position: 'absolute',
            right: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            '&:hover': { 
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              transform: 'translateY(-50%) scale(1.1)',
            },
            transition: 'all 0.2s ease-in-out',
          }}
        >
          <NavigateNext />
        </IconButton>

        {/* Fullscreen Toggle */}
        <IconButton
          onClick={toggleFullscreen}
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            '&:hover': { 
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              transform: 'scale(1.1)',
            },
            transition: 'all 0.2s ease-in-out',
          }}
        >
          {isFullscreen ? <FullscreenExit /> : <Fullscreen />}
        </IconButton>

        {/* Image Counter */}
        <Chip
          label={`${currentIndex + 1} / ${images.length}`}
          sx={{
            position: 'absolute',
            top: 16,
            left: 16,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            color: 'white',
            backdropFilter: 'blur(4px)',
          }}
        />

        {/* Thumbnail Strip */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            display: 'flex',
            gap: 1,
            p: 2,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            overflowX: 'auto',
            '&::-webkit-scrollbar': { height: 4 },
            '&::-webkit-scrollbar-thumb': { backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: 2 },
          }}
        >
          {images.map((img, idx) => (
            <Box
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(idx);
              }}
              sx={{
                width: 80,
                height: 60,
                flexShrink: 0,
                borderRadius: 1,
                overflow: 'hidden',
                border: idx === currentIndex ? '2px solid white' : 'none',
                opacity: idx === currentIndex ? 1 : 0.6,
                transition: 'all 0.2s ease-in-out',
                '&:hover': { 
                  opacity: 1,
                  transform: 'scale(1.05)',
                },
                cursor: 'pointer',
              }}
            >
              <img
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

// Feature Card Component for displaying property attributes
const PropertyFeatureCard = ({ icon, title, value }) => (
  <Paper
    elevation={0}
    sx={{
      p: 2,
      height: '100%',
      borderRadius: 2,
      backgroundColor: 'rgba(25, 118, 210, 0.04)',
      transition: 'all 0.2s ease-in-out',
      '&:hover': {
        backgroundColor: 'rgba(25, 118, 210, 0.08)',
        transform: 'translateY(-2px)',
      }
    }}
  >
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
      {icon}
      <Typography variant="subtitle2" color="text.secondary">
        {title}
      </Typography>
    </Box>
    <Typography variant="h6" sx={{ fontWeight: 600 }}>
      {value}
    </Typography>
  </Paper>
);

// Main PropertyDetails Component
const PropertyDetails = ({ properties }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = properties.find(p => p.id === id);
  const [map, setMap] = useState(null);

  // Default map center (Orpington)
  const mapCenter = {
    lat: 51.4034,
    lng: 0.0998
  };

  // Google Maps handlers
  const onLoad = useCallback((map) => {
    setMap(map); // Set map instance on load
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null); // Clear map instance on unmount
  }, []);

  // Handle case where property is not found
  if (!property) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography>Property not found</Typography>
        <IconButton onClick={() => navigate('/search')} sx={{ mt: 2 }}>
          <ArrowBack />
        </IconButton>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: { xs: 2, sm: 3 } }}>
      {/* Back Button - Now navigates to search page */}
      <IconButton
        onClick={() => navigate('/search')}
        sx={{
          position: 'fixed',
          top: 24,
          left: 24,
          zIndex: 10,
          backgroundColor: 'white',
          boxShadow: 2,
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
          }
        }}
      >
        <ArrowBack />
      </IconButton>

      {/* Main Content */}
      <Slide direction="up" in={true} mountOnEnter unmountOnExit>
        <Paper 
          elevation={0} 
          sx={{ 
            borderRadius: 4,
            overflow: 'hidden',
            backgroundColor: 'background.paper'
          }}
        >
          {/* Image Gallery */}
          <ImageGallery images={property.images || [property.picture]} />

          {/* Property Information Section */}
          <Box sx={{ p: 4 }}>
            {/* Price Header */}
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
              £{property.price.toLocaleString()}
            </Typography>

            {/* Property Tags */}
            <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
              <Chip 
                icon={<HomeOutlined />} 
                label={property.type}
                color="primary"
                variant="outlined"
              />
              <Chip 
                icon={<BedOutlined />} 
                label={`${property.bedrooms} bedrooms`}
                color="primary"
                variant="outlined"
              />
              <Chip 
                icon={<LocationOnOutlined />} 
                label={property.location}
                color="primary"
                variant="outlined"
              />
            </Box>

            {/* Key Features Grid */}
            <Grid container spacing={2} sx={{ mb: 4 }}>
              <Grid item xs={12} sm={6} md={3}>
                <PropertyFeatureCard
                  icon={<AttachMoneyOutlined color="primary" />}
                  title="Price"
                  value={`£${property.price.toLocaleString()}`}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <PropertyFeatureCard
                  icon={<BedOutlined color="primary" />}
                  title="Bedrooms"
                  value={property.bedrooms}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <PropertyFeatureCard
                  icon={<HomeOutlined color="primary" />}
                  title="Property Type"
                  value={property.type}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <PropertyFeatureCard
                  icon={<GavelOutlined color="primary" />}
                  title="Tenure"
                  value={property.tenure}
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 4 }} />

            {/* Property Description */}
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Property Description
            </Typography>
            <Typography 
              component="div" 
              sx={{ 
                color: 'text.secondary',
                lineHeight: 1.8,
                '& br': { display: 'block', content: '""', mt: 2 }
              }}
            >
              <div dangerouslySetInnerHTML={{ __html: property.description }} /> {/* Display property description */}
            </Typography>

            <Divider sx={{ my: 4 }} />

            {/* Location Map */}
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Location
            </Typography>
            <Paper 
              elevation={0} 
              sx={{ 
                height: 400, 
                borderRadius: 2,
                overflow: 'hidden',
                border: '1px solid',
                borderColor: 'divider'
              }}
            >
              <GoogleMap
                mapContainerStyle={{ width: '100%', height: '100%' }}
                center={mapCenter}
                zoom={14}
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={{
                  disableDefaultUI: false,
                  zoomControl: true,
                  streetViewControl: true,
                  scaleControl: true
                }}
              >
                <Marker position={mapCenter} />
                {/* Marker for the map center */}
              </GoogleMap>
            </Paper>
          </Box>
        </Paper>
      </Slide>
    </Box>
  );
};

export default PropertyDetails;