import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Balance from '../balance';
import getWalletQuery from '../../hooks/get-wallet.query';
import { formatCurrency } from '../../utils/utils';

// Mock dependencies
vi.mock('../../hooks/get-wallet.query');
vi.mock('../../utils/utils', () => ({
  formatCurrency: vi.fn((amount) => `USD ${amount.toFixed(2)}`),
}));

describe('Balance', () => {
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
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it('should display loading state', () => {
    vi.mocked(getWalletQuery).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    } as any);

    render(<Balance />, { wrapper });

    // Check for loading skeleton elements
    const skeletons = document.querySelectorAll('.animate-pulse');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('should display error state', () => {
    vi.mocked(getWalletQuery).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    } as any);

    render(<Balance />, { wrapper });

    expect(screen.getByText('Error loading balance data')).toBeInTheDocument();
  });

  it('should display balance items when data is loaded', () => {
    const mockData = {
      ledger_balance: 1000,
      total_payout: 500,
      total_revenue: 2000,
      pending_payout: 100,
    };

    vi.mocked(getWalletQuery).mockReturnValue({
      data: mockData,
      isLoading: false,
      isError: false,
    } as any);

    render(<Balance />, { wrapper });

    expect(screen.getByText('Ledger Balance')).toBeInTheDocument();
    expect(screen.getByText('Total Payout')).toBeInTheDocument();
    expect(screen.getByText('Total Revenue')).toBeInTheDocument();
    expect(screen.getByText('Pending Payout')).toBeInTheDocument();
  });

  it('should format currency values correctly', () => {
    const mockData = {
      ledger_balance: 1000,
      total_payout: 500,
      total_revenue: 2000,
      pending_payout: 100,
    };

    vi.mocked(getWalletQuery).mockReturnValue({
      data: mockData,
      isLoading: false,
      isError: false,
    } as any);

    render(<Balance />, { wrapper });

    expect(formatCurrency).toHaveBeenCalledWith(1000);
    expect(formatCurrency).toHaveBeenCalledWith(500);
    expect(formatCurrency).toHaveBeenCalledWith(2000);
    expect(formatCurrency).toHaveBeenCalledWith(100);
  });

  it('should handle nested data structure', () => {
    const mockData = {
      data: {
        ledger_balance: 1000,
        total_payout: 500,
        total_revenue: 2000,
        pending_payout: 100,
      },
    };

    vi.mocked(getWalletQuery).mockReturnValue({
      data: mockData,
      isLoading: false,
      isError: false,
    } as any);

    render(<Balance />, { wrapper });

    expect(screen.getByText('Ledger Balance')).toBeInTheDocument();
  });

  it('should display info icons for each balance item', () => {
    const mockData = {
      ledger_balance: 1000,
      total_payout: 500,
      total_revenue: 2000,
      pending_payout: 100,
    };

    vi.mocked(getWalletQuery).mockReturnValue({
      data: mockData,
      isLoading: false,
      isError: false,
    } as any);

    render(<Balance />, { wrapper });

    const infoIcons = screen.getAllByAltText('Info');
    expect(infoIcons.length).toBe(4);
  });
});

