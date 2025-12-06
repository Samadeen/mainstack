import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Settings,
  FileText,
  Gift,
  Puzzle,
  Bug,
  UserCog,
  LogOut,
} from 'lucide-react';
import getProfileQuery from '../hooks/get-profile.query';

interface ProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  buttonRef?: React.RefObject<HTMLButtonElement | null>;
}

const ProfileDropdown = ({
  isOpen,
  onClose,
  buttonRef,
}: ProfileDropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data } = getProfileQuery();

  const profileData = data?.data || data;
  const firstName = profileData?.first_name || '';
  const lastName = profileData?.last_name || '';
  const email = profileData?.email || '';
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      const isOutsideDropdown =
        dropdownRef.current && !dropdownRef.current.contains(target);
      const isOutsideButton =
        buttonRef?.current && !buttonRef.current.contains(target);

      if (isOutsideDropdown && isOutsideButton) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, buttonRef]);

  const menuItems = [
    { icon: Settings, label: 'Settings' },
    { icon: FileText, label: 'Purchase History' },
    { icon: Gift, label: 'Refer and Earn' },
    { icon: Puzzle, label: 'Integrations' },
    { icon: Bug, label: 'Report Bug' },
    { icon: UserCog, label: 'Switch Account' },
    { icon: LogOut, label: 'Sign Out' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={dropdownRef}
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className='absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-lg border border-gray-100 z-50 overflow-hidden'
        >
          <div className='p-4 border-b border-gray-100'>
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 rounded-full bg-gradient-to-br from-[#5C6670] to-[#131316] flex items-center justify-center text-white font-semibold text-sm'>
                {initials}
              </div>
              <div className='flex-1 min-w-0'>
                <p className='font-degular text-base font-semibold text-[#131316] truncate'>
                  {firstName} {lastName}
                </p>
                <p className='font-degular text-sm font-medium text-[#56616B] truncate'>
                  {email}
                </p>
              </div>
            </div>
          </div>

          <div className='py-2'>
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03, duration: 0.2 }}
                  className='w-full flex cursor-pointer items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors'
                  onClick={() => {
                    console.log(`Clicked: ${item.label}`);
                    if (item.label === 'Sign Out') {
                      onClose();
                    }
                  }}
                >
                  <Icon className='w-5 h-5 text-[#131316] font-normal' />
                  <span className='font-degular text-sm cursor-pointer text-[#131316]'>
                    {item.label}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProfileDropdown;
