import linkIcon from '../assets/link.svg';
import storeIcon from '../assets/store.svg';
import mediaIcon from '../assets/media.svg';
import invoicinIcon from '../assets/invoicin.svg';

const AppBar = () => {
  return (
    <div className=' bg-white shadow-[0_4px_8px_0_rgba(92,115,131,0.08),0_6px_12px_0_rgba(92,115,131,0.08)] rounded-[6.25rem] w-12 p-1 space-y-6 flex items-center flex-col py-6 fixed left-4 bottom-1/2 translate-y-1/2 '>
      <img
        className='grayscale cursor-pointer hover:grayscale-0 transition-all'
        src={linkIcon}
        alt='Link'
      />
      <img
        className='grayscale cursor-pointer hover:grayscale-0 transition-all'
        src={storeIcon}
        alt='Store'
      />
      <img
        className='grayscale cursor-pointer hover:grayscale-0 transition-all'
        src={mediaIcon}
        alt='Media'
      />
      <img
        className='grayscale cursor-pointer hover:grayscale-0 transition-all'
        src={invoicinIcon}
        alt='Invoicing'
      />
    </div>
  );
};

export default AppBar;
