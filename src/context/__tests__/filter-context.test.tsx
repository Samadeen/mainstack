import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { FilterProvider, useFilters } from '../filter-context';

describe('FilterContext', () => {
  it('should provide default filter state', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <FilterProvider>{children}</FilterProvider>
    );

    const { result } = renderHook(() => useFilters(), { wrapper });

    expect(result.current.filters).toEqual({
      dateRange: 'Today',
      transactionTypes: [],
      transactionStatuses: [],
    });
  });

  it('should update filters when setFilters is called', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <FilterProvider>{children}</FilterProvider>
    );

    const { result } = renderHook(() => useFilters(), { wrapper });

    act(() => {
      result.current.setFilters({
        dateRange: 'Last 7 days',
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-01-07'),
        transactionTypes: ['deposit', 'withdrawal'],
        transactionStatuses: ['successful'],
      });
    });

    expect(result.current.filters).toEqual({
      dateRange: 'Last 7 days',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-01-07'),
      transactionTypes: ['deposit', 'withdrawal'],
      transactionStatuses: ['successful'],
    });
  });

  it('should clear filters when clearFilters is called', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <FilterProvider>{children}</FilterProvider>
    );

    const { result } = renderHook(() => useFilters(), { wrapper });

    // Set some filters first
    act(() => {
      result.current.setFilters({
        dateRange: 'Last 7 days',
        transactionTypes: ['deposit'],
        transactionStatuses: ['successful'],
      });
    });

    // Clear filters
    act(() => {
      result.current.clearFilters();
    });

    expect(result.current.filters).toEqual({
      dateRange: 'Today',
      transactionTypes: [],
      transactionStatuses: [],
    });
  });

  it('should throw error when useFilters is used outside FilterProvider', () => {
    // Suppress console.error for this test
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      renderHook(() => useFilters());
    }).toThrow('useFilters must be used within a FilterProvider');

    consoleSpy.mockRestore();
  });
});

