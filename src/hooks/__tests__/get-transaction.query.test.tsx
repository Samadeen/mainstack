import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import getTransactionQuery from '../get-transaction.query';
import request from '../../config/api.service';
import type { FilterState } from '../../context/filter-context';

// Mock the API service
vi.mock('../../config/api.service', () => ({
  default: {
    get: vi.fn(),
  },
}));

describe('getTransactionQuery', () => {
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

  it('should fetch transactions without filters', async () => {
    const mockData = {
      data: [
        {
          id: '1',
          type: 'deposit',
          amount: 1000,
          status: 'successful',
          date: '2024-01-15',
        },
      ],
    };

    vi.mocked(request.get).mockResolvedValue({ data: mockData });

    const { result } = renderHook(() => getTransactionQuery(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(request.get).toHaveBeenCalledWith('/transactions', { params: {} });
    expect(result.current.data).toEqual(mockData);
  });

  it('should include startDate in params when provided', async () => {
    const mockData = { data: [] };
    const startDate = new Date('2024-01-01');
    const filters: FilterState = {
      startDate,
      transactionTypes: [],
      transactionStatuses: [],
    };

    vi.mocked(request.get).mockResolvedValue({ data: mockData });

    const { result } = renderHook(() => getTransactionQuery(filters), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(request.get).toHaveBeenCalledWith('/transactions', {
      params: {
        startDate: '2024-01-01',
      },
    });
  });

  it('should include endDate in params when provided', async () => {
    const mockData = { data: [] };
    const endDate = new Date('2024-01-31');
    const filters: FilterState = {
      endDate,
      transactionTypes: [],
      transactionStatuses: [],
    };

    vi.mocked(request.get).mockResolvedValue({ data: mockData });

    const { result } = renderHook(() => getTransactionQuery(filters), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(request.get).toHaveBeenCalledWith('/transactions', {
      params: {
        endDate: '2024-01-31',
      },
    });
  });

  it('should include transaction types in params when provided', async () => {
    const mockData = { data: [] };
    const filters: FilterState = {
      transactionTypes: ['deposit', 'withdrawal'],
      transactionStatuses: [],
    };

    vi.mocked(request.get).mockResolvedValue({ data: mockData });

    const { result } = renderHook(() => getTransactionQuery(filters), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(request.get).toHaveBeenCalledWith('/transactions', {
      params: {
        type: 'deposit,withdrawal',
      },
    });
  });

  it('should include transaction statuses in params when provided', async () => {
    const mockData = { data: [] };
    const filters: FilterState = {
      transactionTypes: [],
      transactionStatuses: ['successful', 'pending'],
    };

    vi.mocked(request.get).mockResolvedValue({ data: mockData });

    const { result } = renderHook(() => getTransactionQuery(filters), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(request.get).toHaveBeenCalledWith('/transactions', {
      params: {
        status: 'successful,pending',
      },
    });
  });

  it('should combine all filter params when multiple filters are provided', async () => {
    const mockData = { data: [] };
    const startDate = new Date('2024-01-01');
    const endDate = new Date('2024-01-31');
    const filters: FilterState = {
      startDate,
      endDate,
      transactionTypes: ['deposit'],
      transactionStatuses: ['successful'],
    };

    vi.mocked(request.get).mockResolvedValue({ data: mockData });

    const { result } = renderHook(() => getTransactionQuery(filters), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(request.get).toHaveBeenCalledWith('/transactions', {
      params: {
        startDate: '2024-01-01',
        endDate: '2024-01-31',
        type: 'deposit',
        status: 'successful',
      },
    });
  });

  it('should not include empty arrays in params', async () => {
    const mockData = { data: [] };
    const filters: FilterState = {
      transactionTypes: [],
      transactionStatuses: [],
    };

    vi.mocked(request.get).mockResolvedValue({ data: mockData });

    const { result } = renderHook(() => getTransactionQuery(filters), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(request.get).toHaveBeenCalledWith('/transactions', {
      params: {},
    });
  });
});
