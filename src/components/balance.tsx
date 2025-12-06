import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import getWalletQuery from '../hooks/get-wallet.query';
import infoIcon from '../assets/info.svg';
import { formatCurrency } from '../utils/utils';

const Balance = () => {
  const { data, isLoading, isError } = getWalletQuery();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className='flex flex-col gap-8'>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className='flex flex-col gap-2 w-[271px]'>
            <div className='h-4 bg-gray-200 rounded animate-pulse'></div>
            <div className='h-10 bg-gray-200 rounded animate-pulse'></div>
          </div>
        ))}
      </div>
    );
  }

  if (isError || !data) {
    return <div>Error loading balance data</div>;
  }

  const walletData = data?.data || data;

  const balanceItems = [
    {
      label: 'Ledger Balance',
      value: walletData.ledger_balance,
      tooltip: 'The total amount of funds in your account',
    },
    {
      label: 'Total Payout',
      value: walletData.total_payout,
      tooltip: 'The total amount you have withdrawn',
    },
    {
      label: 'Total Revenue',
      value: walletData.total_revenue,
      tooltip: 'The total amount of revenue you have earned',
    },
    {
      label: 'Pending Payout',
      value: walletData.pending_payout,
      tooltip: 'The amount waiting to be processed',
    },
  ];

  return (
    <div className='flex flex-col gap-8 items-center flex-[35%]'>
      {balanceItems.map((item) => (
        <div key={item.label} className='flex flex-col gap-2 w-[271px]'>
          <div className='flex gap-2 items-center w-full'>
            <p className='flex-1 font-degular text-sm font-medium text-[#56616B] leading-4 tracking-[-0.2px]'>
              {item.label}
            </p>
            <div
              className='relative'
              onMouseEnter={() => setHoveredItem(item.label)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <img
                src={infoIcon}
                alt='Info'
                className='w-5 h-5 cursor-pointer'
              />
              <AnimatePresence>
                {hoveredItem === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 5, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 5, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className='absolute right-0 top-full mt-2 w-[200px] bg-[#131316] text-white rounded-lg px-3 py-2 z-50 shadow-lg'
                    style={{ transformOrigin: 'top right' }}
                  >
                    <p className='font-degular text-xs font-medium leading-4 text-white'>
                      {item.tooltip}
                    </p>
                    <div className='absolute -top-1 right-4 w-2 h-2 bg-[#131316] rotate-45'></div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <p className='font-degular text-[28px] font-bold text-[#131316] leading-[38px] tracking-[-0.6px]'>
            {formatCurrency(item.value)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Balance;
