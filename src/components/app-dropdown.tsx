import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar } from 'lucide-react';
import linkIcon from '../assets/link.svg';
import storeIcon from '../assets/store.svg';
import mediaIcon from '../assets/media.svg';
import invoicinIcon from '../assets/invoicin.svg';

interface AppDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AppItem {
  name: string;
  description: string;
  icon?: string;
  iconComponent?: React.ComponentType<{ className?: string }>;
}

const AppDropdown = ({ isOpen, onClose }: AppDropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const apps: AppItem[] = [
    {
      name: 'Link in Bio',
      description: 'Manage your Link in Bio',
      icon: linkIcon,
    },
    {
      name: 'Store',
      description: 'Manage your Store activities',
      icon: storeIcon,
    },
    {
      name: 'Media Kit',
      description: 'Manage your Media Kit',
      icon: mediaIcon,
    },
    {
      name: 'Invoicing',
      description: 'Manage your Invoices',
      icon: invoicinIcon,
    },
    {
      name: 'Bookings',
      description: 'Manage your Bookings',
      iconComponent: Calendar,
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={dropdownRef}
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className='absolute left-0 top-full mt-2 w-[400px] bg-white rounded-2xl shadow-lg border border-gray-100 z-50 overflow-hidden'
        >
          <div className='p-4'>
            {apps.map((app, index) => (
              <motion.button
                key={app.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05, duration: 0.2 }}
                className='w-full flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors text-left'
                onClick={() => {
                  console.log(`Clicked: ${app.name}`);
                  onClose();
                }}
              >
                <div className='w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center shrink-0'>
                  {app.icon ? (
                    <img src={app.icon} alt={app.name} className='w-6 h-6' />
                  ) : app.iconComponent ? (
                    <app.iconComponent className='w-6 h-6 text-[#131316]' />
                  ) : null}
                </div>
                <div className='flex-1 min-w-0'>
                  <p className='font-degular text-base font-semibold text-[#131316] mb-1'>
                    {app.name}
                  </p>
                  <p className='font-degular text-sm font-medium text-[#56616B]'>
                    {app.description}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AppDropdown;
