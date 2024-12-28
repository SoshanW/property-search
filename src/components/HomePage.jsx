import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Grid,
  Paper,
  IconButton,
  useTheme,
  Fade,
  Slide
} from '@mui/material';
import { 
  Search as SearchIcon,
  KeyboardArrowDown as ArrowDownIcon,
  House as HouseIcon,
  LocationOn as LocationIcon,
  TrendingUp as TrendingIcon,
  Support as SupportIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate('/search');
  };

  const scrollToFeatures = () => {
    document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
  };

  // Feature cards data
  const features = [
    {
      icon: <HouseIcon sx={{ fontSize: 40 }} />,
      title: 'Wide Selection',
      description: 'Browse through our extensive collection of properties ranging from cozy apartments to luxury homes.'
    },
    {
      icon: <LocationIcon sx={{ fontSize: 40 }} />,
      title: 'Prime Locations',
      description: 'Find properties in the most sought-after neighborhoods and upcoming areas in Orpington.'
    },
    {
      icon: <TrendingIcon sx={{ fontSize: 40 }} />,
      title: 'Market Insights',
      description: 'Stay informed with the latest market trends, property values, and investment opportunities.'
    },
    {
      icon: <SupportIcon sx={{ fontSize: 40 }} />,
      title: 'Expert Support',
      description: 'Our team of real estate professionals is here to guide you through your property journey.'
    }
  ];

  return (
    <Box sx={{ overflow: 'hidden' }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          minHeight: 'calc(100vh - 64px)', // Subtract header height
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'black',
          overflow: 'hidden',
        }}
      >
        {/* Background Image */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url(/images/Banner3.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.6,
            filter: 'blur(2px)',
            transform: 'scale(1.1)',
          }}
        />

        {/* Content */}
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Fade in={true} timeout={1000}>
            <Box sx={{ color: 'white', textAlign: 'center' }}>
              <Typography 
                variant="h2" 
                component="h1" 
                sx={{ 
                  fontWeight: 700,
                  mt: 8,
                  mb: 3,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                }}
              >
                Find Your Dream Home in Orpington
              </Typography>
              <Typography 
                variant="h5" 
                sx={{ 
                  mb: 4,
                  opacity: 0.9,
                  textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                  marginBottom: 6
                }}
              >
                Discover a curated selection of properties in prime locations
              </Typography>

              {/* Centered container for button and scroll indicator */}
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                {/* Search Button */}
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleExplore}
                  startIcon={<SearchIcon />}
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    borderRadius: 2,
                    backgroundColor: 'rgba(25, 118, 210, 0.9)',
                    backdropFilter: 'blur(4px)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      backgroundColor: 'primary.main',
                    }
                  }}
                >
                  Start Your Search
                </Button>

                {/* Scroll Indicator */}
                <IconButton 
                  onClick={scrollToFeatures}
                  sx={{ 
                    color: 'white',
                    animation: 'bounce 2s infinite',
                    '@keyframes bounce': {
                      '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
                      '40%': { transform: 'translateY(-10px)' },
                      '60%': { transform: 'translateY(-5px)' }
                    }
                  }}
                >
                  <ArrowDownIcon />
                </IconButton>
              </Box>
            </Box>
          </Fade>
        </Container>
      </Box>

      {/* Features Section */}
      <Box 
        id="features" 
        sx={{ 
          py: 8,
          backgroundColor: theme.palette.background.default 
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Slide 
                  direction="up" 
                  in={true} 
                  timeout={500 + index * 200}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      height: '100%',
                      textAlign: 'center',
                      borderRadius: 4,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                      },
                      backgroundColor: 'background.paper',
                    }}
                  >
                    <Box 
                      sx={{ 
                        mb: 2,
                        color: 'primary.main',
                        transform: 'scale(1)',
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.1)',
                        }
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography 
                      variant="h6" 
                      gutterBottom
                      sx={{ fontWeight: 600 }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography 
                      variant="body2"
                      color="text.secondary"
                      sx={{ lineHeight: 1.6 }}
                    >
                      {feature.description}
                    </Typography>
                  </Paper>
                </Slide>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;