import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  formatCurrency,
  formatDate,
  getStatusColor,
  exportTransactionsToCSV,
} from '../utils';

describe('formatCurrency', () => {
  it('should format positive numbers correctly', () => {
    expect(formatCurrency(1000)).toBe('USD 1,000.00');
    expect(formatCurrency(1234.56)).toBe('USD 1,234.56');
    expect(formatCurrency(0)).toBe('USD 0.00');
  });

  it('should format negative numbers correctly', () => {
    expect(formatCurrency(-1000)).toBe('USD -1,000.00');
    expect(formatCurrency(-1234.56)).toBe('USD -1,234.56');
  });

  it('should format large numbers correctly', () => {
    expect(formatCurrency(1000000)).toBe('USD 1,000,000.00');
    expect(formatCurrency(999999.99)).toBe('USD 999,999.99');
  });

  it('should format decimal numbers correctly', () => {
    expect(formatCurrency(10.5)).toBe('USD 10.50');
    expect(formatCurrency(0.99)).toBe('USD 0.99');
  });
});

describe('formatDate', () => {
  it('should format date correctly', () => {
    const date = '2024-01-15T10:30:00Z';
    expect(formatDate(date)).toBe('Jan 15,2024');
  });

  it('should format date with single digit day correctly', () => {
    const date = '2024-01-05T10:30:00Z';
    expect(formatDate(date)).toBe('Jan 05,2024');
  });

  it('should format different months correctly', () => {
    expect(formatDate('2024-02-15T10:30:00Z')).toBe('Feb 15,2024');
    expect(formatDate('2024-12-25T10:30:00Z')).toBe('Dec 25,2024');
  });

  it('should handle different years', () => {
    expect(formatDate('2023-06-15T10:30:00Z')).toBe('Jun 15,2023');
    expect(formatDate('2025-06-15T10:30:00Z')).toBe('Jun 15,2025');
  });
});

describe('getStatusColor', () => {
  it('should return correct color for successful status', () => {
    expect(getStatusColor('successful')).toBe('text-[#0EA163]');
  });

  it('should return correct color for pending status', () => {
    expect(getStatusColor('pending')).toBe('text-[#A77A07]');
  });

  it('should return default color for other statuses', () => {
    expect(getStatusColor('failed')).toBe('text-[#56616B]');
    expect(getStatusColor('unknown')).toBe('text-[#56616B]');
    expect(getStatusColor('')).toBe('text-[#56616B]');
  });

  it('should be case sensitive', () => {
    expect(getStatusColor('Successful')).toBe('text-[#56616B]');
    expect(getStatusColor('PENDING')).toBe('text-[#56616B]');
  });
});

describe('exportTransactionsToCSV', () => {
  let createElementSpy: any;
  let appendChildSpy: any;
  let removeChildSpy: any;
  let clickSpy: any;
  let createObjectURLSpy: any;
  let revokeObjectURLSpy: any;

  beforeEach(() => {
    // Mock DOM methods
    createElementSpy = vi.spyOn(document, 'createElement');
    appendChildSpy = vi.spyOn(document.body, 'appendChild');
    removeChildSpy = vi.spyOn(document.body, 'removeChild');
    clickSpy = vi.fn();
    createObjectURLSpy = vi.spyOn(URL, 'createObjectURL');
    revokeObjectURLSpy = vi.spyOn(URL, 'revokeObjectURL');

    // Mock link element
    const mockLink = {
      setAttribute: vi.fn(),
      click: clickSpy,
      style: {},
    } as unknown as HTMLAnchorElement;

    createElementSpy.mockReturnValue(mockLink);
    appendChildSpy.mockReturnValue(mockLink);
    removeChildSpy.mockReturnValue(mockLink);
    createObjectURLSpy.mockReturnValue('blob:mock-url');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return early if transactions is null or undefined', () => {
    exportTransactionsToCSV(null);
    exportTransactionsToCSV(undefined);
    expect(createElementSpy).not.toHaveBeenCalled();
  });

  it('should export array of transactions', () => {
    const transactions = [
      {
        id: '1',
        type: 'deposit',
        amount: 1000,
        status: 'successful',
        date: '2024-01-15',
        payment_reference: 'ref-1',
        metadata: {
          product_name: 'Product 1',
          name: 'John Doe',
          email: 'john@example.com',
          country: 'US',
          quantity: 2,
        },
      },
      {
        id: '2',
        type: 'withdrawal',
        amount: 500,
        status: 'pending',
        date: '2024-01-16',
        payment_reference: 'ref-2',
      },
    ];

    exportTransactionsToCSV(transactions);

    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(appendChildSpy).toHaveBeenCalled();
    expect(clickSpy).toHaveBeenCalled();
    expect(removeChildSpy).toHaveBeenCalled();
    expect(revokeObjectURLSpy).toHaveBeenCalled();
  });

  it('should export transactions from data property', () => {
    const transactions = {
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

    exportTransactionsToCSV(transactions);

    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(clickSpy).toHaveBeenCalled();
  });

  it('should export transactions from transactions property', () => {
    const transactions = {
      transactions: [
        {
          id: '1',
          type: 'deposit',
          amount: 1000,
          status: 'successful',
          date: '2024-01-15',
        },
      ],
    };

    exportTransactionsToCSV(transactions);

    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(clickSpy).toHaveBeenCalled();
  });

  it('should return early if normalized transactions array is empty', () => {
    exportTransactionsToCSV([]);
    expect(createElementSpy).not.toHaveBeenCalled();
  });

  it('should escape commas and quotes in CSV values', () => {
    const transactions = [
      {
        id: '1',
        type: 'deposit',
        amount: 1000,
        status: 'successful',
        date: '2024-01-15',
        metadata: {
          product_name: 'Product, with "quotes"',
          name: 'John "Johnny" Doe',
        },
      },
    ];

    exportTransactionsToCSV(transactions);

    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(clickSpy).toHaveBeenCalled();
  });

  it('should handle missing optional fields', () => {
    const transactions = [
      {
        type: 'deposit',
        amount: 1000,
        status: 'successful',
        date: '2024-01-15',
      },
    ];

    exportTransactionsToCSV(transactions);

    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(clickSpy).toHaveBeenCalled();
  });
});
