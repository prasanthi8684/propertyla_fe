# PropertyLa - Real Estate Platform

A modern, feature-rich real estate platform built with Next.js 15 for property listings, search, and management in Malaysia.

## Overview

PropertyLa is a comprehensive real estate web application that allows users to browse, search, and manage property listings across Malaysia. The platform features advanced search capabilities, interactive maps, property comparisons, and user-friendly interfaces for both property seekers and listing agents.

## Tech Stack

### Frontend Framework

- **Next.js 15.2.0** - React framework with App Router
- **React 19.0.0** - UI library
- **TypeScript 5** - Type-safe development

### Styling & UI

- **Bootstrap 5.3.3** - CSS framework
- **Sass 1.75.0** - CSS preprocessor
- **Lucide React 0.552.0** - Icon library
- **Swiper 11.2.4** - Carousel/slider component
- **Slick Carousel 1.8.1** - Additional carousel support

### State Management

- **Redux Toolkit 2.6.1** - State management
- **React Redux 9.2.0** - React bindings
- **Redux Persist 6.0.0** - State persistence

### Forms & Validation

- **React Hook Form 7.54.2** - Form management
- **Yup 1.6.1** - Schema validation
- **@hookform/resolvers 4.1.3** - Form validation integration

### Maps & Charts

- **@react-google-maps/api 2.20.7** - Google Maps integration
- **@googlemaps/js-api-loader 2.0.1** - Google Maps API loader
- **ApexCharts 4.5.0** - Chart library
- **React ApexCharts 1.7.0** - React chart components

### Utilities & Tools

- **Axios 1.13.5** - HTTP client
- **Sonner 2.0.1** - Toast notifications
- **Lodash Debounce 4.0.8** - Debouncing utility
- **React Use 17.6.0** - React hooks library

### Development Tools

- **ESLint 9** - Code linting
- **Sharp 0.34.5** - Image optimization

## Project Structure

```
propertyla_fe/
├── public/                 # Static assets (images, icons)
├── src/
│   ├── app/               # Next.js App Router pages
│   │   ├── (dashboard)/   # Dashboard routes
│   │   ├── (homes)/       # Home page variants
│   │   ├── (pages)/       # Additional pages
│   │   ├── (RealEstate)/  # Real estate specific pages
│   │   ├── (shop)/        # Shop/e-commerce pages
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Home page
│   ├── components/        # Reusable UI components
│   │   ├── Common/        # Common components (BackToTop, etc.)
│   │   ├── Form/          # Form components
│   │   ├── HeroBanner/    # Hero section components
│   │   ├── Property/      # Property-related components
│   │   ├── RealEstate/    # Real estate components
│   │   └── ...            # Other component categories
│   ├── config/            # Configuration files
│   │   ├── axios.ts       # API client configuration
│   │   └── constants.ts   # App constants
│   ├── hooks/             # Custom React hooks
│   ├── layouts/           # Layout components
│   │   ├── Headers/       # Header components
│   │   ├── Footers/       # Footer components
│   │   └── Wrapper.tsx    # Main wrapper layout
│   ├── provider/          # Context providers
│   ├── redux/             # Redux store configuration
│   │   ├── slices/        # Redux slices
│   │   ├── store.ts       # Main store configuration
│   │   └── provider.tsx   # Redux provider
│   ├── types/             # TypeScript type definitions
│   └── schemas/           # Validation schemas
├── .env.example           # Environment variables template
├── .env.local             # Local environment variables
├── next.config.ts         # Next.js configuration
├── package.json           # Dependencies and scripts
└── tsconfig.json          # TypeScript configuration
```

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd propertyla_fe
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

4. **Configure environment variables** (see Environment Variables section below)

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# API Base URL for backend
NEXT_PUBLIC_API_URL=http://165.245.184.61:3008/api

# Environment (local, development, production)
NEXT_PUBLIC_ENV=production
```

### Available Environment Files

- `.env.example` - Template file with example values
- `.env.local` - Local development overrides (highest priority)
- `.env.development` - Development environment settings
- `.env.production` - Production environment settings

## How to Run

### Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

### Clean Dependencies

```bash
npm run clean
```

## API Integration

The application connects to a backend API at `http://165.245.184.61:3008/api` by default. The API client is configured in `src/config/axios.ts` with:

- Automatic authentication token handling
- Request/response interceptors for debugging
- Error handling and logging in development mode
- Timeout configuration (10 seconds)

## Features

### Core Features

- **Property Search & Filtering**: Advanced search with multiple criteria
- **Interactive Maps**: Google Maps integration for property locations
- **Property Listings**: Detailed property cards with images and information
- **User Authentication**: Secure login and token management
- **Responsive Design**: Mobile-first approach with Bootstrap 5
- **State Management**: Redux Toolkit for application state
- **Form Validation**: React Hook Form with Yup validation

### Advanced Features

- **Property Comparisons**: Side-by-side property comparison
- **Saved Properties**: Wishlist/favorites functionality
- **Image Galleries**: Slick carousel for property images
- **Charts & Analytics**: ApexCharts for property statistics
- **Toast Notifications**: User-friendly feedback system
- **SEO Optimization**: Meta tags and OpenGraph support

### UI/UX Features

- **Modern Design**: Clean, professional interface
- **Smooth Animations**: Wow.js for scroll animations
- **Loading States**: Proper loading indicators
- **Error Handling**: User-friendly error messages
- **Accessibility**: Semantic HTML and ARIA support

## Architecture & Design Patterns

### Architecture

- **Component-Based Architecture**: Reusable, modular components
- **App Router Structure**: Next.js 15 App Router for routing
- **Provider Pattern**: Context providers for global state
- **Slice Pattern**: Redux Toolkit slices for state management

### Design Patterns

- **Container/Presentation**: Separation of logic and UI
- **Custom Hooks**: Reusable stateful logic
- **Higher-Order Components**: Cross-cutting concerns
- **Strategy Pattern**: Different rendering strategies

## Future Improvements

### Planned Features

- **Advanced Search Filters**: More granular search options
- **Property Valuation Tool**: Automated property value estimation
- **Virtual Tours**: 360° property viewing
- **Mobile App**: React Native companion app
- **Real-time Notifications**: WebSocket integration
- **Multi-language Support**: Internationalization (i18n)

### Technical Improvements

- **Performance Optimization**: Code splitting and lazy loading
- **Testing Suite**: Unit and integration tests
- **CI/CD Pipeline**: Automated deployment
- **Monitoring**: Application performance monitoring
- **Caching Strategy**: Improved caching mechanisms
- **Security Enhancements**: Additional security measures

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.
