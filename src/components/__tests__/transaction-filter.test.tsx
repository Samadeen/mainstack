import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TransactionFilter from '../transaction-filter';
import { FilterProvider, useFilters } from '../../context/filter-context';
import getTransactionQuery from '../../hooks/get-transaction.query';
import { exportTransactionsToCSV } from '../../utils/utils';

// Mock dependencies
vi.mock('../../hooks/get-transaction.query');
vi.mock('../../utils/utils', () => ({
  exportTransactionsToCSV: vi.fn(),
}));

describe('TransactionFilter', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    vi.clearAllMocks();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <FilterProvider>{children}</FilterProvider>
    </QueryClientProvider>
  );

  it('should display transaction count', () => {
    const mockData = {
      data: [
        { id: '1', type: 'deposit', amount: 1000, status: 'successful' },
        { id: '2', type: 'withdrawal', amount: 500, status: 'pending' },
      ],
    };

    vi.mocked(getTransactionQuery).mockReturnValue({
      data: mockData,
      isLoading: false,
      isError: false,
    } as any);

    render(<TransactionFilter />, { wrapper });

    expect(screen.getByText('2 Transactions')).toBeInTheDocument();
  });

  it('should display singular form for single transaction', () => {
    const mockData = {
      data: [{ id: '1', type: 'deposit', amount: 1000, status: 'successful' }],
    };

    vi.mocked(getTransactionQuery).mockReturnValue({
      data: mockData,
      isLoading: false,
      isError: false,
    } as any);

    render(<TransactionFilter />, { wrapper });

    expect(screen.getByText('1 Transaction')).toBeInTheDocument();
  });

  it('should show filter button with default styling when no filters are active', () => {
    vi.mocked(getTransactionQuery).mockReturnValue({
      data: { data: [] },
      isLoading: false,
      isError: false,
    } as any);

    render(<TransactionFilter />, { wrapper });

    const filterButton = screen.getByText('Filter').closest('button');
    expect(filterButton).toHaveClass('bg-[#EFF1F6]');
  });

  it('should show filter button with active styling when filters are applied', async () => {
    vi.mocked(getTransactionQuery).mockReturnValue({
      data: { data: [] },
      isLoading: false,
      isError: false,
    } as any);

    const wrapperWithFilters = ({ children }: { children: React.ReactNode }) => {
      const queryClient = new QueryClient({
        defaultOptions: { queries: { retry: false } },
      });
      return (
        <QueryClientProvider client={queryClient}>
          <FilterProvider>
            <SetFiltersComponent />
            {children}
          </FilterProvider>
        </QueryClientProvider>
      );
    };

    const SetFiltersComponent = () => {
      const { setFilters } = useFilters();
      React.useEffect(() => {
        setFilters({
          transactionTypes: ['deposit'],
          transactionStatuses: [],
        });
      }, [setFilters]);
      return null;
    };

    render(<TransactionFilter />, { wrapper: wrapperWithFilters });

    await waitFor(() => {
      const filterButton = screen.getByText('Filter').closest('button');
      expect(filterButton).toHaveClass('bg-[#131316]');
    });
  });

  it('should call exportTransactionsToCSV when export button is clicked', async () => {
    const user = userEvent.setup();
    const mockData = {
      data: [
        { id: '1', type: 'deposit', amount: 1000, status: 'successful' },
      ],
    };

    vi.mocked(getTransactionQuery).mockReturnValue({
      data: mockData,
      isLoading: false,
      isError: false,
    } as any);

    render(<TransactionFilter />, { wrapper });

    const exportButton = screen.getByText('Export list').closest('button');
    await user.click(exportButton!);

    expect(exportTransactionsToCSV).toHaveBeenCalledWith(mockData.data);
  });

  it('should handle empty transactions array', () => {
    vi.mocked(getTransactionQuery).mockReturnValue({
      data: { data: [] },
      isLoading: false,
      isError: false,
    } as any);

    render(<TransactionFilter />, { wrapper });

    expect(screen.getByText('0 Transactions')).toBeInTheDocument();
  });
});

