import emptyIcon from '../assets/empty-icon.svg';
import { useFilters } from '../context/filter-context';

const EmptyState = () => {
  const { clearFilters } = useFilters();

  return (
    <div className='flex flex-col gap-8 items-start py-16 mt-8 max-w-92 mx-auto'>
      <img src={emptyIcon} alt='Empty state' />

      <div className='flex flex-col gap-2.5 items-center max-w-md'>
        <h3 className='font-degular text-[28px] font-bold text-[#131316] leading-10 tracking-[-0.6px]'>
          No matching transaction found for the selected filter
        </h3>
        <p className='font-degular text-base font-medium text-[#56616B] leading-6 tracking-[-0.2px] text-left w-full'>
          Change your filters to see more results, or add a new product.
        </p>
      </div>

      <button
        onClick={clearFilters}
        className='bg-[#EFF1F6] px-6 py-3 rounded-[100px] font-degular text-base font-semibold text-[#131316] tracking-[-0.4px] hover:opacity-90 transition-opacity'
      >
        Clear Filter
      </button>
    </div>
  );
};

export default EmptyState;
