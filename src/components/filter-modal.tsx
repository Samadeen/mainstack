import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronDown, ChevronUp, Check } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { useFilters } from '../context/filter-context';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FilterModal = ({ isOpen, onClose }: FilterModalProps) => {
  const { filters, setFilters } = useFilters();
  const modalRef = useRef<HTMLDivElement>(null);
  const [startDate, setStartDate] = useState<Date | undefined>(
    filters.startDate
  );
  const [endDate, setEndDate] = useState<Date | undefined>(filters.endDate);
  const [selectedDateRange, setSelectedDateRange] = useState<string>(
    filters.dateRange || 'Today'
  );
  const [isTransactionTypeOpen, setIsTransactionTypeOpen] = useState(false);
  const [isTransactionStatusOpen, setIsTransactionStatusOpen] = useState(false);
  const [selectedTransactionTypes, setSelectedTransactionTypes] = useState<
    string[]
  >(filters.transactionTypes || []);
  const [selectedTransactionStatus, setSelectedTransactionStatus] = useState<
    string[]
  >(filters.transactionStatuses || []);
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);

  const dateRangeOptions = ['Today', 'Last 7 days', 'This month'];

  const transactionTypes = [
    'Store Transactions',
    'Get Tipped',
    'Withdrawals',
    'Chargebacks',
    'Cashbacks',
    'Refer & Earn',
  ];

  const transactionStatuses = ['Successful', 'Pending', 'Failed'];

  useEffect(() => {
    if (isOpen) {
      setStartDate(filters.startDate);
      setEndDate(filters.endDate);
      setSelectedDateRange(filters.dateRange || 'Today');
      setSelectedTransactionTypes(filters.transactionTypes || []);
      setSelectedTransactionStatus(filters.transactionStatuses || []);
    }
  }, [isOpen, filters]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleDateRangeSelect = (range: string) => {
    setSelectedDateRange(range);
  };

  const toggleTransactionType = (type: string) => {
    setSelectedTransactionTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleTransactionStatus = (status: string) => {
    setSelectedTransactionStatus((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const handleClear = () => {
    setStartDate(undefined);
    setEndDate(undefined);
    setSelectedDateRange('Today');
    setSelectedTransactionTypes([]);
    setSelectedTransactionStatus([]);
    setFilters({
      dateRange: 'Today',
      transactionTypes: [],
      transactionStatuses: [],
    });
  };

  const handleApply = () => {
    setFilters({
      dateRange: selectedDateRange,
      startDate,
      endDate,
      transactionTypes: selectedTransactionTypes,
      transactionStatuses: selectedTransactionStatus,
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='fixed inset-0 bg-black/20 backdrop-blur-sm z-50'
            onClick={onClose}
          />

          <motion.div
            ref={modalRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className='fixed right-[1vh] top-[1vh] h-[98vh] w-[500px] bg-white shadow-[0px_16px_32px_0px_rgba(219,222,229,0.1),0px_12px_24px_0px_rgba(219,222,229,0.1),0px_8px_16px_4px_rgba(188,196,204,0.1)] z-50 overflow-y-auto rounded-[20px]'
          >
            <div className='flex flex-col h-full'>
              <div className='px-6 py-5 border-b-2 border-white bg-white'>
                <div className='flex items-center justify-between'>
                  <h2 className='font-degular text-2xl font-bold text-[#131316] capitalize'>
                    Filter
                  </h2>
                  <button
                    onClick={onClose}
                    className='w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors'
                  >
                    <X className='w-5 h-5 text-[#131316]' />
                  </button>
                </div>
              </div>

              <div className='flex-1 px-6 py-6 overflow-y-auto'>
                <div className='flex flex-col gap-6'>
                  <div className='flex flex-wrap gap-3'>
                    {dateRangeOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleDateRangeSelect(option)}
                        className={`px-[18px] py-[10px] rounded-[100px] border font-degular text-sm font-semibold tracking-[-0.4px] transition-colors ${
                          selectedDateRange === option
                            ? 'bg-[#131316] text-white border-[#131316]'
                            : 'bg-white text-[#131316] border-[#EFF1F6] hover:bg-gray-50'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>

                  <div className='flex flex-col gap-3'>
                    <div className='flex gap-3'>
                      <div className='flex-1 flex flex-col gap-3'>
                        <label className='font-degular text-base font-semibold text-[#131316] tracking-[-0.4px]'>
                          Date Range
                        </label>
                        <button
                          onClick={() => {
                            setShowStartCalendar(!showStartCalendar);
                            setShowEndCalendar(false);
                          }}
                          className={`w-full rounded-xl px-4 py-3.5 flex items-center justify-between ${
                            showStartCalendar
                              ? 'bg-white border-[3px] border-[#131316]'
                              : 'bg-[#EFF1F6] border border-[#EFF1F6]'
                          }`}
                        >
                          <span className='font-degular text-sm font-medium text-[#131316] tracking-[-0.2px]'>
                            {startDate
                              ? format(startDate, 'dd MMM yyyy')
                              : 'Select date'}
                          </span>
                          {showStartCalendar ? (
                            <ChevronUp className='w-5 h-5 text-[#131316]' />
                          ) : (
                            <ChevronDown className='w-5 h-5 text-[#131316]' />
                          )}
                        </button>
                      </div>
                      <div className='flex-1 flex flex-col gap-3'>
                        <label className='font-degular text-base font-semibold text-[#131316] tracking-[-0.4px] opacity-0'>
                          Date Range
                        </label>
                        <button
                          onClick={() => {
                            setShowEndCalendar(!showEndCalendar);
                            setShowStartCalendar(false);
                          }}
                          className={`w-full rounded-xl px-4 py-3.5 flex items-center justify-between ${
                            showEndCalendar
                              ? 'bg-white border-[3px] border-[#131316]'
                              : 'bg-[#EFF1F6] border border-[#EFF1F6]'
                          }`}
                        >
                          <span className='font-degular text-sm font-medium text-[#131316] tracking-[-0.2px]'>
                            {endDate
                              ? format(endDate, 'dd MMM yyyy')
                              : 'Select date'}
                          </span>
                          {showEndCalendar ? (
                            <ChevronUp className='w-5 h-5 text-[#131316]' />
                          ) : (
                            <ChevronDown className='w-5 h-5 text-[#131316]' />
                          )}
                        </button>
                      </div>
                    </div>
                    {(showStartCalendar || showEndCalendar) && (
                      <div className='w-full bg-white rounded-2xl shadow-[0px_4px_8px_0px_rgba(92,115,131,0.08),0px_6px_12px_0px_rgba(92,115,131,0.08)] z-20 p-8'>
                        <Calendar
                          mode='single'
                          selected={showStartCalendar ? startDate : endDate}
                          onSelect={(date: Date | undefined) => {
                            if (showStartCalendar) {
                              setStartDate(date);
                              setShowStartCalendar(false);
                            } else {
                              setEndDate(date);
                              setShowEndCalendar(false);
                            }
                          }}
                          className='rounded-xl w-full [--cell-size:2.5rem]'
                          buttonVariant='ghost'
                        />
                      </div>
                    )}
                  </div>

                  <div className='flex flex-col gap-3'>
                    <label className='font-degular text-base font-semibold text-[#131316] tracking-[-0.4px]'>
                      Transaction Type
                    </label>
                    <div className='relative'>
                      <button
                        onClick={() =>
                          setIsTransactionTypeOpen(!isTransactionTypeOpen)
                        }
                        className={`w-full rounded-xl px-4 py-3.5 flex items-center justify-between border-2 ${
                          isTransactionTypeOpen
                            ? 'bg-white border-[#131316]'
                            : 'bg-[#EFF1F6] border-[#EFF1F6]'
                        }`}
                      >
                        <span className='font-degular text-sm font-medium text-[#131316] tracking-[-0.2px] truncate'>
                          {selectedTransactionTypes.length > 0
                            ? selectedTransactionTypes.join(', ')
                            : 'Select transaction types'}
                        </span>
                        {isTransactionTypeOpen ? (
                          <ChevronUp className='w-5 h-5 text-[#131316]' />
                        ) : (
                          <ChevronDown className='w-5 h-5 text-[#131316]' />
                        )}
                      </button>
                      {isTransactionTypeOpen && (
                        <div className='absolute top-full left-0 mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-100 z-20 p-2'>
                          {transactionTypes.map((type) => {
                            const isSelected =
                              selectedTransactionTypes.includes(type);
                            return (
                              <button
                                key={type}
                                onClick={() => toggleTransactionType(type)}
                                className='w-full flex items-center gap-3 p-3.5 rounded-[10px] hover:bg-gray-50 transition-colors'
                              >
                                <div
                                  className={`w-5 h-5 border-2 border-[#131316] rounded flex items-center justify-center shrink-0 ${
                                    isSelected
                                      ? 'bg-[#131316]'
                                      : 'bg-transparent'
                                  }`}
                                >
                                  {isSelected && (
                                    <Check className='w-3 h-3 text-white' />
                                  )}
                                </div>
                                <span className='font-degular text-base font-semibold text-[#131316] tracking-[-0.4px]'>
                                  {type}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className='flex flex-col gap-3'>
                    <label className='font-degular text-base font-semibold text-[#131316] tracking-[-0.4px]'>
                      Transaction Status
                    </label>
                    <div className='relative'>
                      <button
                        onClick={() =>
                          setIsTransactionStatusOpen(!isTransactionStatusOpen)
                        }
                        className='w-full bg-[#EFF1F6] border border-[#EFF1F6] rounded-xl px-4 py-3.5 flex items-center justify-between'
                      >
                        <span className='font-degular text-sm font-medium text-[#131316] tracking-[-0.2px] truncate'>
                          {selectedTransactionStatus.length > 0
                            ? selectedTransactionStatus.join(', ')
                            : 'Select options'}
                        </span>
                        <ChevronDown className='w-5 h-5 text-[#131316]' />
                      </button>
                      {isTransactionStatusOpen && (
                        <div className='absolute top-full left-0 mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-100 z-20 p-2'>
                          {transactionStatuses.map((status) => {
                            const isSelected =
                              selectedTransactionStatus.includes(status);
                            return (
                              <button
                                key={status}
                                onClick={() => toggleTransactionStatus(status)}
                                className='w-full flex items-center gap-3 p-3.5 rounded-[10px] hover:bg-gray-50 transition-colors text-left'
                              >
                                <div
                                  className={`w-5 h-5 border-2 border-[#131316] rounded flex items-center justify-center shrink-0 ${
                                    isSelected
                                      ? 'bg-[#131316]'
                                      : 'bg-transparent'
                                  }`}
                                >
                                  {isSelected && (
                                    <Check className='w-3 h-3 text-white' />
                                  )}
                                </div>
                                <span className='font-degular text-base font-semibold text-[#131316] tracking-[-0.4px]'>
                                  {status}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className='px-6 py-5 border-t-2 border-white bg-white mt-auto'>
                <div className='flex gap-3'>
                  <button
                    onClick={handleClear}
                    className='flex-1 bg-white border border-[#EFF1F6] rounded-[100px] px-6 py-3 font-degular text-base font-semibold text-[#131316] tracking-[-0.4px] hover:bg-gray-50 transition-colors'
                  >
                    Clear
                  </button>
                  <button
                    onClick={handleApply}
                    className='flex-1 bg-[#131316] rounded-[100px] px-6 py-3 font-degular text-base font-semibold text-white tracking-[-0.4px] hover:opacity-90 transition-opacity'
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default FilterModal;
