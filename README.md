# Mainstack - Financial Dashboard Application

A modern, responsive financial dashboard application built with React, TypeScript, and Tailwind CSS. This application provides a comprehensive interface for managing and viewing financial transactions, balances, and analytics.

## 🚀 Features

### Core Functionality

- **Transaction Management**: View and filter financial transactions with detailed information
- **Balance Overview**: Display ledger balance, total payout, total revenue, and pending payout
- **Interactive Charts**: Visual representation of available balance over time
- **Advanced Filtering**: Comprehensive filter system with date range, transaction type, and status filters
- **User Profile**: User profile management with dropdown menu
- **App Navigation**: Quick access to various applications via dropdown menu

### Key Components

- **Header Navigation**: Responsive navigation bar with route management
- **Revenue Dashboard**: Balance cards and interactive chart visualization
- **Transaction Table**: Detailed transaction listing with filtering capabilities
- **Filter Modal**: Advanced filtering with calendar date picker (shadcn/ui)
- **Empty State**: User-friendly empty state when no transactions match filters
- **Profile & App Dropdowns**: Animated dropdown menus for user actions

## 🛠️ Tech Stack

### Core Technologies

- **React 19.2.0** - UI library
- **TypeScript 5.9.3** - Type safety
- **Vite 7.2.4** - Build tool and dev server
- **Tailwind CSS 4.1.17** - Utility-first CSS framework

### Key Libraries

- **@tanstack/react-query 5.90.12** - Data fetching and caching
- **axios 1.13.2** - HTTP client
- **motion 12.23.25** - Animation library
- **react-day-picker 9.11.3** - Date picker component
- **date-fns 4.1.0** - Date utility functions
- **lucide-react 0.556.0** - Icon library
- **class-variance-authority 0.7.1** - Component variant management
- **clsx & tailwind-merge** - Conditional class utilities

### UI Components

- **shadcn/ui** - Component library (Button, Calendar)
- Custom components built with Tailwind CSS

## 📁 Project Structure

```
src/
├── assets/              # Static assets (SVGs, fonts, images)
│   ├── fonts/          # Degular font family variants
│   └── *.svg           # Icon and image assets
├── components/         # React components
│   ├── ui/            # shadcn/ui components
│   │   ├── button.tsx
│   │   └── calendar.tsx
│   ├── header.tsx     # Main navigation header
│   ├── balance.tsx    # Balance display cards
│   ├── chart.tsx      # Balance chart visualization
│   ├── revenue.tsx    # Revenue section container
│   ├── transaction.tsx # Transaction section container
│   ├── transaction-filter.tsx # Filter controls
│   ├── transaction-table.tsx # Transaction list
│   ├── filter-modal.tsx # Advanced filter modal
│   ├── empty-state.tsx # Empty state component
│   ├── profile-dropdown.tsx # User profile menu
│   └── app-dropdown.tsx # Apps navigation menu
├── config/            # Configuration files
│   ├── api.service.ts # Axios API configuration
│   └── routes.ts      # Navigation routes
├── context/           # React Context providers
│   └── filter-context.tsx # Global filter state management
├── hooks/             # Custom React hooks
│   ├── get-wallet.query.ts # Wallet data fetching
│   ├── get-transaction.query.ts # Transaction data fetching
│   └── get-profile.query.ts # User profile data fetching
├── lib/               # Utility libraries
│   └── utils.ts       # Utility functions (cn helper)
├── types/             # TypeScript type definitions
│   ├── transaction.types.ts
│   └── routes.types.ts
├── utils/             # Utility functions
│   └── utils.ts       # Formatting and helper functions
├── App.tsx            # Main application component
├── main.tsx           # Application entry point
└── index.css          # Global styles and font definitions
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd mainstack
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```env
   VITE_BASE_URL=your_api_base_url
   ```

4. **Start the development server**

   ```bash
   pnpm dev
   # or
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

### Build for Production

```bash
pnpm build
# or
npm run build
```

The production build will be in the `dist/` directory.

### Preview Production Build

```bash
pnpm preview
# or
npm run preview
```

## 📝 Available Scripts

- `pnpm dev` - Start development server with HMR
- `pnpm build` - Build for production (TypeScript check + Vite build)
- `pnpm preview` - Preview production build locally
- `pnpm lint` - Run ESLint

## 🎨 Design System

### Typography

The application uses the **Degular** font family with multiple variants:

- **Degular** - Main font family (Regular, Medium, Semibold, Bold, etc.)
- **Degular Display** - Display variant
- **Degular Text** - Text variant
- **Degular Mono** - Monospace variant

All font weights (100-900) and italic variants are available.

### Color Palette

- **Primary Black**: `#131316`
- **Gray Scale**: `#EFF1F6`, `#56616B`, `#DBDEE5`
- **Success Green**: Used for successful transactions
- **Error Red**: Used for failed/pending transactions

### Components Styling

- Components use Tailwind CSS utility classes
- Custom design tokens defined in `index.css`
- Responsive design with mobile-first approach
- Consistent spacing and border radius throughout

## 🔌 API Integration

### API Configuration

The application uses Axios for API requests. Configure the base URL via environment variable:

```env
VITE_BASE_URL=https://api.example.com
```

### API Endpoints

#### Wallet Data

- **GET** `/wallet` - Fetch wallet balance information
  - Returns: `balance`, `total_payout`, `total_revenue`, `pending_payout`, `ledger_balance`

#### Transactions

- **GET** `/transactions` - Fetch transaction list
  - Query Parameters:
    - `startDate` (optional) - Start date filter (YYYY-MM-DD)
    - `endDate` (optional) - End date filter (YYYY-MM-DD)
    - `type` (optional) - Transaction type filter (comma-separated)
    - `status` (optional) - Transaction status filter (comma-separated)
  - Returns: Array of transaction objects

#### User Profile

- **GET** `/user` - Fetch user profile information
  - Returns: `first_name`, `last_name`, `email`

### Data Fetching

The application uses React Query for:

- Automatic caching
- Background refetching
- Loading and error states
- Optimistic updates

## 🧩 Key Components

### Header Component

- Navigation bar with route management
- Notification and message icons
- User profile dropdown
- Apps navigation dropdown
- Responsive mobile menu

### Filter Modal

- Slide-in modal from the right
- Date range selection with calendar (shadcn/ui)
- Transaction type multi-select
- Transaction status multi-select
- Quick date range buttons (Today, Last 7 days, This month)
- Clear and Apply actions

### Transaction Table

- Displays transaction list with icons
- Shows transaction type, amount, date, and status
- Color-coded status indicators
- Empty state when no results
- Loading skeletons

### Balance Cards

- Ledger Balance
- Total Payout
- Total Revenue
- Pending Payout
- Centered layout with proper spacing

### Chart Component

- SVG-based line chart
- Available balance display
- Withdraw button
- Date range labels
- Responsive design

## 🔄 State Management

### Filter Context

Global filter state managed via React Context:

- Date range filters
- Transaction type filters
- Transaction status filters
- Clear filters functionality

### React Query

- Server state management
- Automatic cache invalidation
- Optimistic updates
- Background synchronization

## 🎯 Features in Detail

### Filtering System

1. **Date Range Filtering**

   - Quick select buttons (Today, Last 7 days, This month)
   - Custom date range with calendar picker
   - Full-width calendar display

2. **Transaction Type Filtering**

   - Multi-select dropdown
   - Options: Store Transactions, Get Tipped, Withdrawals, Chargebacks, Cashbacks, Refer & Earn
   - Visual checkboxes with selected state

3. **Transaction Status Filtering**

   - Multi-select dropdown
   - Options: Successful, Pending, Failed
   - Visual checkboxes with selected state

4. **Filter Button Badge**
   - Shows active filter count when filters are applied
   - Button changes to black background when active
   - Badge displays number of active filter categories

### Empty State

- Displays when no transactions match the selected filters
- Shows empty icon from assets
- Provides "Clear Filter" button to reset filters
- User-friendly messaging

## 🎨 Animations

The application uses **Motion** (Framer Motion) for smooth animations:

- Modal slide-in/out transitions
- Dropdown fade and scale animations
- Staggered list item animations
- Hover effects and transitions

## 📱 Responsive Design

- Mobile-first approach
- Responsive navigation
- Adaptive layouts for different screen sizes
- Touch-friendly interactions

## 🔧 Development

### Code Style

- TypeScript for type safety
- ESLint for code quality
- Consistent component structure
- Utility functions for reusability

### Best Practices

- Component composition
- Custom hooks for data fetching
- Context API for global state
- Proper error handling
- Loading states
- Type safety throughout

## 📦 Dependencies

### Production Dependencies

- React & React DOM
- TypeScript
- Vite
- Tailwind CSS
- React Query
- Axios
- Motion (animations)
- react-day-picker
- date-fns
- lucide-react
- class-variance-authority
- clsx & tailwind-merge

### Development Dependencies

- TypeScript types
- ESLint
- Vite plugins
- TypeScript ESLint

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
