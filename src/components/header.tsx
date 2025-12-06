import { useState, useRef } from 'react';
import { routes } from '../config/routes';
import mainstackLogo from '../assets/mainstack-logo.svg';
import menuIcon from '../assets/menu.svg';
import notificationsIcon from '../assets/notifications.svg';
import messageIcon from '../assets/chat.svg';
import arrowDownIcon from '../assets/arrow-down.svg';
import ProfileDropdown from './profile-dropdown';
import AppDropdown from './app-dropdown';
import getProfileQuery from '../hooks/get-profile.query';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isAppDropdownOpen, setIsAppDropdownOpen] = useState(false);
  const profileButtonRef = useRef<HTMLButtonElement>(null);
  const { data } = getProfileQuery();

  const profileData = data?.data || data;
  const firstName = profileData?.first_name || '';
  const lastName = profileData?.last_name || '';
  const initials =
    `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || 'OJ';

  return (
    <header className='bg-white shadow-[0_2px_6px_0_rgba(45,59,67,0.06),0_2px_4px_0_rgba(45,59,67,0.05)] rounded-[6.25rem] border-2 border-solid border-white sticky top-4 w-[98%] mx-auto z-50 mt-4'>
      <div className='px-4 '>
        <div className='flex items-center justify-between h-16'>
          <div className='shrink-0 flex items-center'>
            <img src={mainstackLogo} alt='Mainstack' className='h-9 w-9' />
          </div>

          <nav className='hidden md:flex items-center space-x-4 flex-1 justify-center'>
            {routes.map((route) => {
              const isActive = route.name === 'Revenue';
              const isApps = route.name === 'Apps';

              if (isApps) {
                return (
                  <div key={route.route} className='relative'>
                    <button
                      onClick={() => setIsAppDropdownOpen(!isAppDropdownOpen)}
                      className={`flex items-center text-center text-base not-italic font-semibold cursor-pointer leading-6 tracking-[-0.025rem] transition-colors rounded-[6.25rem] ${
                        isAppDropdownOpen
                          ? 'bg-[#131316] text-white px-0 py-2'
                          : 'text-[#56616B] px-4 py-2 hover:bg-gray-100 rounded-[6.25rem]'
                      }`}
                    >
                      {isAppDropdownOpen ? (
                        <>
                          <div className='flex items-center gap-2 px-4 border-r border-white/20'>
                            <img
                              src={route.image}
                              alt={route.name}
                              className='w-5 h-5 brightness-0 invert'
                            />
                            <span>{route.name}</span>
                          </div>
                          <div className='flex items-center gap-2 px-4'>
                            <span>Link in Bio</span>
                            <img
                              src={arrowDownIcon}
                              alt='Dropdown'
                              className='w-4 h-4 brightness-0 invert'
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <img
                            src={route.image}
                            alt={route.name}
                            className='w-5 h-5'
                          />
                          <span>{route.name}</span>
                        </>
                      )}
                    </button>
                    <AppDropdown
                      isOpen={isAppDropdownOpen}
                      onClose={() => setIsAppDropdownOpen(false)}
                    />
                  </div>
                );
              }

              return (
                <a
                  key={route.route}
                  href={route.route}
                  className={`flex items-center gap-2 px-4 py-2 text-center text-base not-italic font-semibold leading-6 tracking-[-0.025rem] transition-colors ${
                    isActive
                      ? 'bg-[#131316] text-white rounded-[6.25rem]'
                      : 'text-[#56616B] rounded-[6.25rem] hover:bg-gray-100'
                  }`}
                >
                  <img src={route.image} alt={route.name} className='w-5 h-5' />
                  <span>{route.name}</span>
                </a>
              );
            })}
          </nav>

          <div className='flex items-center gap-4'>
            <button className='relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 cursor-pointer rounded-[6.25rem] transition-colors'>
              <img
                src={notificationsIcon}
                alt='Notifications'
                className='w-5 h-5'
              />
            </button>

            <button className='relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 cursor-pointer rounded-[6.25rem] transition-colors'>
              <img src={messageIcon} alt='Messages' className='w-5 h-5' />
            </button>

            <div className='relative'>
              <button
                ref={profileButtonRef}
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className='bg-[#EFF1F6] flex items-center gap-2 pl-1.25 pr-3 py-1 cursor-pointer rounded-[6.25rem] hover:opacity-90 transition-opacity'
              >
                <h3 className='bg-[linear-gradient(139deg,#5C6670_2.33%,#131316_96.28%)] text-center text-[white] text-sm not-italic font-semibold leading-4 tracking-[-0.025rem] px-[0.56rem] py-2 cursor-pointer rounded-full'>
                  {initials}
                </h3>
                <img src={menuIcon} alt='Menu' className='w-6 h-6' />
              </button>
              <ProfileDropdown
                isOpen={isProfileDropdownOpen}
                onClose={() => setIsProfileDropdownOpen(false)}
                buttonRef={profileButtonRef}
              />
            </div>

            <button
              className='md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-[6.25rem] transition-colors'
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <img src={menuIcon} alt='Menu' className='w-6 h-6' />
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className='md:hidden border-t border-gray-200 py-4'>
            <nav className='flex flex-col space-y-2'>
              {routes.map((route) => {
                const isActive = route.name === 'Revenue';
                return (
                  <a
                    key={route.route}
                    href={route.route}
                    className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#131316] text-white rounded-[6.25rem]'
                        : 'text-gray-700 rounded-[6.25rem] hover:bg-gray-100'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <img
                      src={route.image}
                      alt={route.name}
                      className='w-5 h-5'
                    />
                    <span>{route.name}</span>
                  </a>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
