import getTransactionQuery from '../hooks/get-transaction.query';
import inwardsIcon from '../assets/inwards.svg';
import outwardsIcon from '../assets/outwards.svg';
import { formatDate, formatCurrency, getStatusColor } from '../utils/utils';
import type { Transaction } from '../types/transaction.types';
import { useFilters } from '../context/filter-context';
import EmptyState from './empty-state';

const TransactionTable = () => {
  const { filters } = useFilters();
  const { data, isLoading, isError } = getTransactionQuery(filters);

  const getTransactionTitle = (transaction: Transaction) => {
    if (transaction.type === 'withdrawal') {
      return 'Cash withdrawal';
    }
    return (
      transaction.metadata?.product_name ||
      transaction.metadata?.type ||
      'Transaction'
    );
  };

  const getTransactionSubtitle = (transaction: Transaction) => {
    if (transaction.type === 'withdrawal') {
      return transaction.status;
    }
    return transaction.metadata?.name || '';
  };

  if (isLoading) {
    return (
      <div className='flex flex-col gap-6'>
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div key={i} className='h-12 bg-gray-200 rounded animate-pulse'></div>
        ))}
      </div>
    );
  }

  if (isError || !data) {
    return <div>Error loading transactions</div>;
  }

  let transactions: Transaction[] = [];
  if (data) {
    if (Array.isArray(data)) {
      transactions = data;
    } else if (data.data && Array.isArray(data.data)) {
      transactions = data.data;
    } else if (Array.isArray(data.transactions)) {
      transactions = data.transactions;
    }
  }

  if (transactions.length === 0 && !isLoading) {
    return <EmptyState />;
  }

  return (
    <div className='flex flex-col gap-6 mt-8'>
      {transactions.map((transaction, index) => {
        const isDeposit = transaction.type === 'deposit';
        const iconBg = isDeposit ? 'bg-[#E3FCF2]' : 'bg-[#F9E3E0]';

        return (
          <div
            key={index}
            className='flex items-center justify-between relative gap-3 sm:gap-4'
          >
            <div className='flex items-center gap-3 sm:gap-4 flex-1 min-w-0'>
              <div
                className={`${iconBg} w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0`}
              >
                <img
                  src={isDeposit ? inwardsIcon : outwardsIcon}
                  alt={isDeposit ? 'Deposit' : 'Withdrawal'}
                />
              </div>

              <div className='flex flex-col justify-between min-w-0 flex-1'>
                <p className='text-[#131316] text-sm sm:text-base not-italic font-medium leading-5 sm:leading-6 tracking-[-0.0125rem] truncate'>
                  {getTransactionTitle(transaction)}
                </p>
                <p
                  className={`font-degular text-xs sm:text-sm not-italic font-medium leading-4 tracking-[-0.0125rem] capitalize mt-1 sm:mt-[0.56rem] ${
                    transaction.type === 'withdrawal'
                      ? getStatusColor(transaction.status)
                      : 'text-[#56616B]'
                  }`}
                >
                  {getTransactionSubtitle(transaction)}
                </p>
              </div>
            </div>

            <div className='flex flex-col items-end justify-between min-h-[49px] shrink-0'>
              <p className='font-degular text-[#131316] text-right text-sm sm:text-base not-italic font-bold leading-[150%] tracking-[-0.025rem]'>
                {formatCurrency(transaction.amount)}
              </p>
              <p className='font-degular text-[#56616B] text-right text-xs sm:text-sm not-italic font-medium leading-4 tracking-[-0.0125rem]'>
                {formatDate(transaction.date)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TransactionTable;
