import TransactionFilter from './transaction-filter';
import TransactionTable from './transaction-table';

const Transaction = () => {
  return (
    <div className='my-8 sm:my-12 lg:my-20'>
      <TransactionFilter />
      <TransactionTable />
    </div>
  );
};

export default Transaction;
