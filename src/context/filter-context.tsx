import { createContext, useContext, useState, ReactNode } from 'react';

export interface FilterState {
  dateRange?: string;
  startDate?: Date;
  endDate?: Date;
  transactionTypes: string[];
  transactionStatuses: string[];
}

interface FilterContextType {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  clearFilters: () => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setFilters] = useState<FilterState>({
    dateRange: 'Today',
    transactionTypes: [],
    transactionStatuses: [],
  });

  const clearFilters = () => {
    setFilters({
      dateRange: 'Today',
      transactionTypes: [],
      transactionStatuses: [],
    });
  };

  return (
    <FilterContext.Provider value={{ filters, setFilters, clearFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
};

