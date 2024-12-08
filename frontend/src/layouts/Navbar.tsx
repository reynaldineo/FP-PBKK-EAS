'use client';

import Image from 'next/image';
import { useState } from 'react';

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
              <a href='#' title=''>
                <Image
                  className='block h-8 w-auto dark:hidden'
                  src='https://flowbite.s3.amazonaws.com/blocks/e-commerce/logo-full.svg'
                  alt=''
                  width={32}
                  height={32}
                />
                <Image
                  className='hidden h-8 w-auto dark:block'
                  src='https://flowbite.s3.amazonaws.com/blocks/e-commerce/logo-full-dark.svg'
                  alt=''
                  width={32}
                  height={32}
                />
              </a>
            </div>

            <ul className='hidden items-center justify-start gap-6 py-3 sm:justify-center lg:flex'>
              {[
                'Home',
                'Best Sellers',
                'Gift Ideas',
                "Today's Deals",
                'Sell',
              ].map((item) => (
                <li key={item} className='shrink-0'>
                  <a
                    href='#'
                    className='flex text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500'
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className='flex items-center lg:space-x-2'>
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
              <svg
                className='ms-1 hidden h-4 w-4 text-gray-900 dark:text-white sm:flex'
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
                  d='m19 9-7 7-7-7'
                />
              </svg>
            </button>

            {isCartOpen && (
              <div className='z-10 mx-auto hidden max-w-sm space-y-4 overflow-hidden rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800'>
                {/* Cart Items (use map for dynamic cart items if required) */}
                <a
                  href='#'
                  className='mb-2 inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800'
                >
                  Proceed to Checkout
                </a>
              </div>
            )}

            <button
              onClick={handleUserMenuToggle}
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
              Account
              <svg
                className='ms-1 h-4 w-4 text-gray-900 dark:text-white'
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
                  d='m19 9-7 7-7-7'
                />
              </svg>
            </button>

            {isUserMenuOpen && (
              <div className='z-10 hidden w-56 divide-y divide-gray-100 overflow-hidden rounded-lg bg-white shadow dark:bg-gray-700'>
                <ul className='p-2 text-sm font-medium text-gray-900 dark:text-white'>
                  <li>
                    <a
                      href='#'
                      className='inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600'
                    >
                      My Account
                    </a>
                  </li>
                  <li>
                    <a
                      href='#'
                      className='inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600'
                    >
                      My Orders
                    </a>
                  </li>
                  <li>
                    <a
                      href='#'
                      className='inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600'
                    >
                      Settings
                    </a>
                  </li>
                </ul>
              </div>
            )}

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
                  <a
                    href='#'
                    className='block text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500'
                  >
                    {item}
                  </a>
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
