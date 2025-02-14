import React, { useState, useMemo, useEffect } from 'react';
import { 
  TextField, 
  Select, 
  MenuItem, 
  Button, 
  FormControl, 
  InputLabel, 
  Box, 
  Slider, 
  Typography, 
  Collapse, 
  IconButton, 
  Grid, 
  Paper,
  Tooltip,
  Badge,
  InputAdornment
} from '@mui/material';
import { 
  Search as SearchIcon, 
  FilterList as FilterIcon, 
  Clear as ClearIcon,
  Home as HomeIcon,
  AttachMoney as MoneyIcon,
  Hotel as BedroomIcon,
  CalendarMonth as CalendarIcon,
  LocationOn as LocationIcon
} from '@mui/icons-material';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

// Default criteria object
const defaultCriteria = {
  type: '',
  minPrice: 100000,
  maxPrice: 1500000,
  minBedrooms: 1,
  maxBedrooms: 6,
  dateAfter: null,
  dateBefore: null,
  location: ''
};

const SearchForm = ({ onSearch, properties }) => {
  // Extract unique locations from properties
  const locations = useMemo(() => {
    const uniqueLocations = [...new Set(properties.map(prop => prop.location))];
    return uniqueLocations.sort();
  }, [properties]);

  // Initialize criteria from localStorage or use default
  const [criteria, setCriteria] = useState(() => {
    const savedCriteria = localStorage.getItem('searchCriteria');
    if (savedCriteria) {
      const parsed = JSON.parse(savedCriteria);
      // Convert date strings back to Date objects
      return {
        ...parsed,
        dateAfter: parsed.dateAfter ? new Date(parsed.dateAfter) : null,
        dateBefore: parsed.dateBefore ? new Date(parsed.dateBefore) : null
      };
    }
    return defaultCriteria;
  });

  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState(0);

  // Save criteria to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('searchCriteria', JSON.stringify(criteria));
    updateActiveFilters(criteria);
  }, [criteria]);

  // Count active filters
  const updateActiveFilters = (newCriteria) => {
    let count = 0;
    if (newCriteria.type) count++;
    if (newCriteria.location) count++;
    if (newCriteria.minPrice !== defaultCriteria.minPrice || newCriteria.maxPrice !== defaultCriteria.maxPrice) count++;
    if (newCriteria.minBedrooms !== defaultCriteria.minBedrooms || newCriteria.maxBedrooms !== defaultCriteria.maxBedrooms) count++;
    if (newCriteria.dateAfter || newCriteria.dateBefore) count++;
    setActiveFilters(count);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newCriteria = { ...criteria, [name]: value };
    setCriteria(newCriteria);
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    const numericValue = Number(value.replace(/[^0-9]/g, ''));
    
    if (name === 'minPrice' && numericValue > criteria.maxPrice) return;
    if (name === 'maxPrice' && numericValue < criteria.minPrice) return;

    const newCriteria = { ...criteria, [name]: numericValue || 0 };
    setCriteria(newCriteria);
  };

  const handleBedroomChange = (e) => {
    const { name, value } = e.target;
    const numericValue = Number(value);
    
    if (name === 'minBedrooms' && numericValue > criteria.maxBedrooms) return;
    if (name === 'maxBedrooms' && numericValue < criteria.minBedrooms) return;

    const newCriteria = { ...criteria, [name]: numericValue || 1 };
    setCriteria(newCriteria);
  };

  const handleSliderChange = (name) => (event, newValue) => {
    const newCriteria = {
      ...criteria,
      [`min${name.charAt(0).toUpperCase() + name.slice(1)}`]: newValue[0],
      [`max${name.charAt(0).toUpperCase() + name.slice(1)}`]: newValue[1]
    };
    setCriteria(newCriteria);
  };

  const handleDateChange = (date, field) => {
    const newCriteria = { ...criteria, [field]: date };
    setCriteria(newCriteria);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(criteria);
  };

  // Updated reset handler to clear localStorage
  const handleReset = () => {
    setCriteria(defaultCriteria);
    localStorage.removeItem('searchCriteria');
    onSearch(defaultCriteria);
  };

  // Initial search on component mount if criteria exists
  useEffect(() => {
    if (criteria !== defaultCriteria) {
      onSearch(criteria);
    }
  }, []);

  return (
    <Paper 
      component="form" 
      onSubmit={handleSubmit} 
      elevation={2}
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
        transition: 'all 0.3s ease-in-out',
      }}
    >
      <Box sx={{ p: 3 }}>
        {/* Header */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 3 
        }}>
          <Typography variant="h6" fontWeight="600" color="primary">
            Property Search
          </Typography>
          <Tooltip title={showAdvancedFilters ? "Hide filters" : "Show filters"}>
            <Badge badgeContent={activeFilters} color="primary">
              <IconButton 
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                color={showAdvancedFilters ? "primary" : "default"}
                sx={{ transform: showAdvancedFilters ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s ease' }}
              >
                <FilterIcon />
              </IconButton>
            </Badge>
          </Tooltip>
        </Box>

        {/* Basic Search Fields */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel>Property Type</InputLabel>
              <Select
                name="type"
                value={criteria.type}
                onChange={handleChange} // Handle change for location
                label="Property Type"
                startAdornment={<HomeIcon sx={{ mr: 1, ml: -0.5 }} />}
              >
                <MenuItem value="">Any</MenuItem>
                <MenuItem value="House">House</MenuItem>
                <MenuItem value="Flat">Flat</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel>Location</InputLabel>
              <Select
                name="location"
                value={criteria.location}
                onChange={handleChange}
                label="Location"
                startAdornment={<LocationIcon sx={{ mr: 1, ml: -0.5 }} />}
                endAdornment={
                  criteria.location && (
                    <IconButton 
                      size="small"
                      sx={{ mr: 2 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleChange({ target: { name: 'location', value: '' } });
                      }}
                    >
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  )
                }
              >
                <MenuItem value="">Any Location</MenuItem>
                {locations.map((location) => (
                  <MenuItem key={location} value={location}>
                    {location}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        
        {/* Advanced Filters */}
        <Collapse in={showAdvancedFilters} timeout={300}>
          <Box sx={{ mt: 3 }}>
            {/* Price Range */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <MoneyIcon fontSize="small" />
                Price Range
              </Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                  <Slider
                    value={[criteria.minPrice, criteria.maxPrice]}
                    onChange={handleSliderChange('price')}
                    min={50000}
                    max={2000000}
                    step={10000}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => `£${value.toLocaleString()}`}
                    sx={{ mt: 2 }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="minPrice"
                    label="Min Price"
                    value={criteria.minPrice.toLocaleString()}
                    onChange={handlePriceChange}
                    fullWidth
                    size="small"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">£</InputAdornment>
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="maxPrice"
                    label="Max Price"
                    value={criteria.maxPrice.toLocaleString()}
                    onChange={handlePriceChange}
                    fullWidth
                    size="small"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">£</InputAdornment>
                    }}
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Bedrooms */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <BedroomIcon fontSize="small" />
                Bedrooms
              </Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                  <Slider
                    value={[criteria.minBedrooms, criteria.maxBedrooms]}
                    onChange={handleSliderChange('bedrooms')}
                    min={1}
                    max={6}
                    step={1}
                    valueLabelDisplay="auto"
                    marks
                    sx={{ mt: 2 }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="minBedrooms"
                    label="Min Bedrooms"
                    type="number"
                    value={criteria.minBedrooms}
                    onChange={handleBedroomChange}
                    fullWidth
                    size="small"
                    inputProps={{ min: 1, max: criteria.maxBedrooms }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="maxBedrooms"
                    label="Max Bedrooms"
                    type="number"
                    value={criteria.maxBedrooms}
                    onChange={handleBedroomChange}
                    fullWidth
                    size="small"
                    inputProps={{ min: criteria.minBedrooms, max: 6 }}
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Date Range */}
            <Box>
              <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CalendarIcon fontSize="small" />
                Date Range
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <DatePicker
                    selected={criteria.dateAfter}
                    onChange={(date) => handleDateChange(date, 'dateAfter')}
                    placeholderText="Date After"
                    dateFormat="dd/MM/yyyy"
                    customInput={
                      <TextField 
                        fullWidth 
                        label="Date After" 
                        variant="outlined" 
                        size="small"
                      />
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <DatePicker
                    selected={criteria.dateBefore}
                    onChange={(date) => handleDateChange(date, 'dateBefore')}
                    placeholderText="Date Before"
                    dateFormat="dd/MM/yyyy"
                    customInput={
                      <TextField 
                        fullWidth 
                        label="Date Before" 
                        variant="outlined" 
                        size="small"
                      />
                    }
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Collapse>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', gap: 2, mt: 3, pt: 2, borderTop: 1, borderColor: 'divider' }}>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            startIcon={<SearchIcon />}
            sx={{ 
              flex: 2,
              transition: 'transform 0.2s ease',
              '&:hover': { transform: 'translateY(-2px)' }
            }}
          >
            Search Properties
          </Button>
          <Button 
            variant="outlined" 
            color="inherit" 
            onClick={handleReset}
            startIcon={<ClearIcon />}
            sx={{ 
              flex: 1,
              transition: 'transform 0.2s ease',
              '&:hover': { transform: 'translateY(-2px)' }
            }}
          >
            Reset
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default SearchForm;