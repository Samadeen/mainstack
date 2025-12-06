import getWalletQuery from '../hooks/get-wallet.query';
import { formatCurrency } from '../utils/utils';

const Chart = () => {
  const { data, isLoading, isError } = getWalletQuery();

  if (isLoading) {
    return (
      <div className='flex gap-16 items-center'>
        <div className='flex flex-col gap-2'>
          <div className='h-4 w-32 bg-gray-200 rounded animate-pulse'></div>
          <div className='h-12 w-48 bg-gray-200 rounded animate-pulse'></div>
        </div>
        <div className='h-12 w-32 bg-gray-200 rounded-full animate-pulse'></div>
      </div>
    );
  }

  if (isError || !data) {
    return <div>Error loading chart data</div>;
  }

  const walletData = data?.data || data;
  const availableBalance = walletData.balance || 0;

  return (
    <div className='flex-[65%]'>
      <div className='flex gap-16 items-center'>
        <div className='flex flex-col gap-2 items-start'>
          <p className='font-degular text-sm font-medium text-[#56616B] leading-4 tracking-[-0.2px] whitespace-pre'>
            Available Balance
          </p>
          <p className='font-degular text-[36px] font-bold text-[#131316] leading-[48px] tracking-[-1.5px] whitespace-pre'>
            {formatCurrency(availableBalance)}
          </p>
        </div>

        <button className='bg-[#131316] flex cursor-pointer gap-2 items-center justify-center px-7 py-3.5 rounded-[100px] w-[167px] hover:opacity-90 transition-opacity'>
          <p className='font-degular text-base font-semibold text-white leading-6 tracking-[-0.4px] whitespace-pre'>
            Withdraw
          </p>
        </button>
      </div>
      <div className='mt-20 w-full'>
        <svg
          viewBox='0 0 800 220'
          className='w-full h-auto'
          preserveAspectRatio='xMidYMid meet'
        >
          <line
            x1='0'
            y1='180'
            x2='800'
            y2='180'
            stroke='#E5E7EB'
            strokeWidth='1'
          />

          <g>
            <circle cx='5' cy='180' r='3' fill='#9CA3AF' />
            <text
              x='5'
              y='200'
              textAnchor='start'
              className='font-degular text-xs'
              fill='#9CA3AF'
              fontSize='12'
            >
              Apr 1, 2022
            </text>
          </g>

          <g>
            <circle cx='795' cy='180' r='3' fill='#9CA3AF' />
            <text
              x='795'
              y='200'
              textAnchor='end'
              className='font-degular text-xs'
              fill='#9CA3AF'
              fontSize='12'
            >
              Apr 30, 2022
            </text>
          </g>

          <path
            d='M 0 140 
               C 130 50, 170 30, 230 40
               C 270 50, 310 80, 350 150
               C 390 160, 430 140, 470 100
               C 510 60, 550 50, 600 70
               C 630 80, 670 100, 800 150'
            fill='none'
            stroke='#FF6B35'
            strokeWidth='3'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </div>
    </div>
  );
};

export default Chart;
