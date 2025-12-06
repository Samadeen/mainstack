# Testing Guide

This project uses **Vitest** and **React Testing Library** for testing.

## Running Tests

```bash
# Run tests in watch mode
pnpm test

# Run tests with UI
pnpm test:ui

# Run tests with coverage
pnpm test:coverage
```

## Test Structure

Tests are organized in `__tests__` directories next to the files they test:

- `src/utils/__tests__/` - Utility function tests
- `src/context/__tests__/` - Context provider tests
- `src/hooks/__tests__/` - Custom hook tests
- `src/components/__tests__/` - Component tests

## Test Coverage

The test suite covers:

1. **Utility Functions** (`utils.ts`)
   - `formatCurrency` - Currency formatting
   - `formatDate` - Date formatting
   - `getStatusColor` - Status color mapping
   - `exportTransactionsToCSV` - CSV export functionality

2. **Context Providers** (`filter-context.tsx`)
   - Filter state management
   - Filter updates
   - Filter clearing

3. **Custom Hooks** (`get-transaction.query.ts`)
   - Query parameter building
   - Filter integration
   - API request handling

4. **Components**
   - `TransactionFilter` - Filter UI and export functionality
   - `Balance` - Balance display and tooltips

## Writing New Tests

When adding new features, ensure you:

1. Write tests for utility functions first (easiest to test)
2. Test context providers and hooks
3. Test component behavior and user interactions
4. Aim for high coverage of business logic

