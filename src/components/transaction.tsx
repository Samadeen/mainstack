import TransactionFilter from './transaction-filter';
import TransactionTable from './transaction-table';

const Transaction = () => {
  return (
    <div className='my-20'>
      <TransactionFilter />
      <TransactionTable />
    </div>
  );
};

export default Transaction;
