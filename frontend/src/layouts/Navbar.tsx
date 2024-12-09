'use client';

import Image from 'next/image';
import Link from 'next/link'; // Import Link from next/link
import { useState } from 'react';
import toast from 'react-hot-toast';

import useAuthStore from '@/stores/useAuthStore';

const Navbar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleCartToggle = () => setIsCartOpen(!isCartOpen);
  const handleUserMenuToggle = () => setIsUserMenuOpen(!isUserMenuOpen);
  const handleMobileMenuToggle = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className='bg-gray-200 antialiased dark:bg-gray-800'>
      <div className='mx-auto max-w-screen-xl px-4 py-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-8'>
            <div className='shrink-0'>
              <Link href='/' title=''>
                <div className='flex items-center text-2xl font-semibold text-gray-900 dark:text-white'>
                  <Image
                    className='mr-2 h-8 w-8'
                    src='/images/logo-its.png'
                    alt='logo'
                    width={800}
                    height={300}
                  />
                  TokoITS
                </div>
              </Link>
            </div>

            {/* <ul className='hidden items-center justify-start gap-6 py-3 sm:justify-center lg:flex'>
              {[
                'Home',
                'Best Sellers',
                'Gift Ideas',
                "Today's Deals",
                'Sell',
              ].map((item) => (
                <li key={item} className='shrink-0'>
                  <Link
                    href='#'
                    className='flex text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500'
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul> */}
          </div>

          <div className='flex items-center lg:space-x-2'>
            <Link href='/cart'>
              <button
                onClick={handleCartToggle}
                className='inline-flex items-center p-2 text-sm font-medium leading-none text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'
              >
                <span className='sr-only'>Cart</span>
                <svg
                  className='h-5 w-5 lg:me-1'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312'
                  />
                </svg>
                <span className='hidden sm:flex'>My Cart</span>
              </button>
            </Link>

            <Link href='/order'>
              <button
                onClick={handleUserMenuToggle}
                className='inline-flex items-center p-2 text-sm font-medium leading-none text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'
              >
                <span className='sr-only'>Orders</span>
                <svg
                  className='h-5 w-5 lg:me-1'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M3 3h18v18H3V3zm3 3h12v12H6V6z'
                  />
                </svg>
                <span className='hidden sm:flex'>My Orders</span>
              </button>
            </Link>

            <LogoutModal />

            <button
              onClick={handleMobileMenuToggle}
              type='button'
              aria-controls='ecommerce-navbar-menu-1'
              aria-expanded={isMobileMenuOpen ? 'true' : 'false'}
              className='inline-flex items-center justify-center p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 lg:hidden'
            >
              <span className='sr-only'>Open Menu</span>
              <svg
                className='h-5 w-5'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                fill='none'
                viewBox='0 0 24 24'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M3 5h18M3 12h18M3 19h18'
                />
              </svg>
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className='mt-4 lg:hidden'>
            <ul className='space-y-4'>
              {[
                'Home',
                'Best Sellers',
                'Gift Ideas',
                "Today's Deals",
                'Sell',
              ].map((item) => (
                <li key={item}>
                  <Link
                    href='#'
                    className='block py-2 text-sm text-gray-900 dark:text-white'
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

const LogoutModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const { user, logout } = useAuthStore();

  const onSubmit = () => {
    logout();
    toast.success('You have been logged out.');
    closeModal();
  };

  return (
    <>
      {/* Button to open the modal */}
      {user ? (
        <button
          onClick={openModal}
          className='inline-flex items-center p-2 text-sm font-medium leading-none text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'
        >
          <svg
            className='me-1 h-5 w-5'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            fill='none'
            viewBox='0 0 24 24'
          >
            <path
              stroke='currentColor'
              strokeWidth='2'
              d='M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
            />
          </svg>
          {user.name}
        </button>
      ) : (
        <button
          onClick={() => (window.location.href = '/login')} // Or use your routing library like React Router
          className='inline-flex items-center p-2 text-sm font-medium leading-none text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'
        >
          <svg
            className='me-1 h-5 w-5'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            fill='none'
            viewBox='0 0 24 24'
          >
            <path
              stroke='currentColor'
              strokeWidth='2'
              d='M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
            />
          </svg>
          Login
        </button>
      )}

      {/* Modal Overlay and Content */}
      {isOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-900 bg-opacity-50'>
          <div className='relative w-full max-w-lg rounded-lg bg-white p-4 shadow dark:bg-gray-700'>
            <div className='flex items-center justify-between border-b p-4 dark:border-gray-600'>
              <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>
                Confirm Logout
              </h3>
              <button
                onClick={closeModal}
                className='inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white'
              >
                <svg
                  className='h-3 w-3'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 14 14'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                  />
                </svg>
                <span className='sr-only'>Close modal</span>
              </button>
            </div>

            <div className='p-4'>
              <div className='text-center'>
                <h4 className='text-lg font-semibold text-gray-900 dark:text-white'>
                  Are you sure you want to log out?
                </h4>
                <p className='mt-2 text-sm text-gray-600 dark:text-gray-300'>
                  You will need to log in again to access your account.
                </p>
              </div>

              {/* Modal Actions */}
              <div className='mt-4 flex justify-between'>
                <button
                  onClick={onSubmit}
                  className='rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800'
                >
                  Logout
                </button>
                <button
                  type='button'
                  onClick={closeModal}
                  className='rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:outline-none'
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
