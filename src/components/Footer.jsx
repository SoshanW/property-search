import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  IconButton, 
  Divider,
  Link
} from '@mui/material';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  LinkedIn,
  Email,
  Phone,
  LocationOn
} from '@mui/icons-material';

const Footer = () => {
  return (
    <Box 
      component="footer"
      sx={{
        backgroundColor: 'background.paper',
        py: 6,
        mt: 8,
        borderTop: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info Column */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Property Search
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Your trusted partner in finding the perfect home in Orpington and surrounding areas.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton 
                href="https://facebook.com" 
                target="_blank" 
                color="primary" 
                size="small"
              >
                <Facebook />
              </IconButton>
              <IconButton 
                href="https://twitter.com" 
                target="_blank" 
                color="primary" 
                size="small"
              >
                <Twitter />
              </IconButton>
              <IconButton 
                href="https://instagram.com" 
                target="_blank" 
                color="primary" 
                size="small"
              >
                <Instagram />
              </IconButton>
              <IconButton 
                href="https://linkedin.com" 
                target="_blank" 
                color="primary" 
                size="small"
              >
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links Column */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/" color="text.secondary" underline="hover">
                Home
              </Link>
              <Link href="/search" color="text.secondary" underline="hover">
                Property Search
              </Link>
            </Box>
          </Grid>

          {/* Contact Info Column */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Email sx={{ mr: 2, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                soshanw123@gmail.com
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Phone sx={{ mr: 2, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                +94 77 831 5077
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LocationOn sx={{ mr: 2, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                232, Sadasiripura, Oruwala, Athurugiriya
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* Copyright Section */}
        <Typography 
          variant="body2" 
          color="text.secondary" 
          align="center"
        >
          © {new Date().getFullYear()} Soshan Wijayarathne. All Rights Reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;