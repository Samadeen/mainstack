import { useState } from 'react';
import arrowDownIcon from '../assets/arrow-down.svg';
import downloadIcon from '../assets/download.svg';
import getTransactionQuery from '../hooks/get-transaction.query';
import FilterModal from './filter-modal';
import { useFilters } from '../context/filter-context';
import { exportTransactionsToCSV } from '../utils/utils';

const TransactionFilter = () => {
  const { filters } = useFilters();
  const { data } = getTransactionQuery(filters);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const transactions = data?.data || data || [];
  const transactionCount = Array.isArray(transactions)
    ? transactions.length
    : 0;

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.startDate || filters.endDate) count++;
    if (filters.transactionTypes.length > 0) count++;
    if (filters.transactionStatuses.length > 0) count++;
    if (filters.dateRange && filters.dateRange !== 'Today') count++;
    return count;
  };

  const activeFilterCount = getActiveFilterCount();
  const hasActiveFilters = activeFilterCount > 0;

  return (
    <div className='flex gap-6 items-center pb-6 border-b border-[#EFF1F6]'>
      <div className='flex-1 flex flex-col items-start'>
        <h2 className='font-degular text-2xl font-bold text-[#131316] leading-8 tracking-[-0.6px]'>
          {transactionCount} Transaction{transactionCount !== 1 ? 's' : ''}
        </h2>
        <p className='font-degular text-sm font-medium text-[#56616B] leading-4 tracking-[-0.2px]'>
          Your transactions for the last 7 days
        </p>
      </div>

      <div className='flex gap-3 items-center'>
        <button
          onClick={() => setIsFilterModalOpen(true)}
          className={`${
            hasActiveFilters
              ? 'bg-[#131316] text-white'
              : 'bg-[#EFF1F6] text-[#131316]'
          } flex cursor-pointer  gap-3 items-center justify-center pl-[30px] pr-5 py-3 rounded-[100px] hover:opacity-90 transition-opacity relative`}
        >
          <span
            className={`font-degular text-base font-semibold leading-6 tracking-[-0.4px] whitespace-pre ${
              hasActiveFilters ? 'text-white' : 'text-[#131316]'
            }`}
          >
            Filter
          </span>
          {hasActiveFilters && (
            <span className='bg-white text-[#131316] rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold font-degular'>
              {activeFilterCount}
            </span>
          )}
          <img
            src={arrowDownIcon}
            alt='Filter'
            className={hasActiveFilters ? 'brightness-0 invert' : ''}
          />
        </button>

        <FilterModal
          isOpen={isFilterModalOpen}
          onClose={() => setIsFilterModalOpen(false)}
        />

        <button
          onClick={() => {
            const transactions = data?.data || data || [];
            exportTransactionsToCSV(transactions);
          }}
          className='bg-[#EFF1F6] flex cursor-pointer gap-3 items-center justify-center pl-[30px] pr-5 py-3 rounded-[100px] hover:opacity-90 transition-opacity'
        >
          <span className='font-degular text-base font-semibold text-[#131316] leading-6 tracking-[-0.4px] whitespace-pre'>
            Export list
          </span>
          <img src={downloadIcon} alt='Export' className='w-5 h-5' />
        </button>
      </div>
    </div>
  );
};

export default TransactionFilter;
