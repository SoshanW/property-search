# Property Search App

## Overview
This is a comprehensive property search application built with React, Material-UI, and integrated with Google Maps. The app allows users to search, filter, and explore properties in the Orpington area with an intuitive drag-and-drop interface for managing favorite properties.

## Features

### Home Page
* Responsive landing page with hero section
* Animated feature cards
* Call-to-action button to start property search

### Property Search
* Advance search filters:
* * Property type
* * Price range
* * Number of bedrooms
* * Location
* * Date range
* Drag-and-drop functionality for favourites
* Responsive grid layouts

### Property Details
* Detailed property information
* Image gallery with fullscreen mode
* Location map integration
* Responsive design

### Favourites Management
* Add/remove properties to favourites
* Drag-and-drop support
* Local storage persistence

## Tech Stack
* React 18
* Vite
* React Router
* Material-UI
* @hello-pangea/dnd (Drag and Drop)
* Google Maps API
* React Image Gallery
* React Datepicker

## Prerequisites

* Node.js (v14+)
* npm or yarn
* Google Maps API Key

## Installation
1. Clone the repository
```
git clone https://github.com/yourusername/property-search-app.git
cd property-search-app
```
2. Install dependencies
```
npm install
```
3. Create a `.env` file in the root directory
```
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```
4. Start the development server
```
npm run dev
```

## Environmental Variables
* VITE_GOOGLE_MAPS_API_KEY: Required for Google Maps integration

## Folder Structure
```
src/
├── components/
│   ├── FavoritesList.jsx
│   ├── Header.jsx
│   ├── HomePage.jsx
│   ├── ImageGallery.jsx
│   ├── PropertyCard.jsx
│   ├── PropertyDetails.jsx
│   ├── PropertyList.jsx
│   └── SearchForm.jsx
├── data/
│   └── properties.json
├── hooks/
│   └── useLocalStorage.js
├── App.jsx
└── main.jsx
```

## Responsive Design
The application is fully responsive and adapts to different screen sizes, with specific optimizatations for mobile devices.

## Browser Compatibility
* Chrome
* Firefox
* Safari
* Edge

## Performance Optimization
* Lazy loading
* Memoization
* Efficient state management
* Code splitting

## Future Enhancements 
* User authentication
* Save search filters
* Advanced property comparison
* More detailed property insights

## License
Distributed under the MIT License.

## Contact
Soshan Wijayarathne - soshanw123@gmail.com
Prioject Link: 