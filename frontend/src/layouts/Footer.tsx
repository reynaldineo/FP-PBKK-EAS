import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className='bg-gray-200 dark:bg-gray-900'>
      <div className='mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8'>
        <div className='md:flex md:justify-between'>
          <div className='mb-6 md:mb-0'>
            <Link href='https://flowbite.com/'>
              <div className='flex items-center'>
                <Image
                  src='https://flowbite.com/docs/images/logo.svg'
                  alt='FlowBite Logo'
                  height={32}
                  width={32}
                  className='me-3 h-8'
                />
                <span className='self-center whitespace-nowrap text-2xl font-semibold dark:text-white'>
                  Flowbite
                </span>
              </div>
            </Link>
          </div>
          <div className='grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-6'>
            <div>
              <h2 className='mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white'>
                Resources
              </h2>
              <ul className='font-medium text-gray-500 dark:text-gray-400'>
                <li className='mb-4'>
                  <Link href='https://flowbite.com/'>
                    <span className='hover:underline'>Flowbite</span>
                  </Link>
                </li>
                <li>
                  <Link href='https://tailwindcss.com/'>
                    <span className='hover:underline'>Tailwind CSS</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className='mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white'>
                Follow us
              </h2>
              <ul className='font-medium text-gray-500 dark:text-gray-400'>
                <li className='mb-4'>
                  <Link href='#'>
                    <span className='hover:underline'>Github</span>
                  </Link>
                </li>
                <li>
                  <Link href='#'>
                    <span className='hover:underline'>Discord</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className='mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-white'>
                Legal
              </h2>
              <ul className='font-medium text-gray-500 dark:text-gray-400'>
                <li className='mb-4'>
                  <Link href='#'>
                    <span className='hover:underline'>Privacy Policy</span>
                  </Link>
                </li>
                <li>
                  <Link href='#'>
                    <span className='hover:underline'>
                      Terms &amp; Conditions
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className='my-6 border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-8' />
        <div className='sm:flex sm:items-center sm:justify-between'>
          <span className='text-sm text-gray-500 dark:text-gray-400 sm:text-center'>
            © 2023{' '}
            <Link href='https://flowbite.com/'>
              <span className='hover:underline'>Flowbite™</span>
            </Link>
            . All Rights Reserved.
          </span>
          <div className='mt-4 flex sm:mt-0 sm:justify-center'>
            <Link
              href='#'
              className='mx-2 text-gray-500 hover:text-gray-900 dark:hover:text-white'
            >
              <svg
                className='h-6 w-6'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='currentColor'
                viewBox='0 0 8 19'
              >
                <path
                  fillRule='evenodd'
                  d='M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z'
                  clipRule='evenodd'
                />
              </svg>
              <span className='sr-only'>Facebook page</span>
            </Link>
            <Link
              href='#'
              className='mx-2 text-gray-500 hover:text-gray-900 dark:hover:text-white'
            >
              <svg
                className='h-6 w-6'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='currentColor'
                viewBox='0 0 21 16'
              >
                <path d='M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z' />
              </svg>
              <span className='sr-only'>Discord community</span>
            </Link>
            <Link
              href='#'
              className='mx-2 text-gray-500 hover:text-gray-900 dark:hover:text-white'
            >
              <svg
                className='h-6 w-6'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='currentColor'
                viewBox='0 0 20 17'
              >
                <path
                  fillRule='evenodd'
                  d='M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.4a4.13 4.13 0 0 1-1.073.142c-.262 0-.518-.03-.769-.085.518 1.566 2.032 2.687 3.823 2.718a8.372 8.372 0 0 1-5.169 1.785A8.446 8.446 0 0 0 2 16.072a11.774 11.774 0 0 0 6.291 1.795c7.524 0 11.633-6.423 11.633-12.02 0-.183-.01-.366-.026-.548A8.39 8.39 0 0 0 20 1.892Z'
                />
              </svg>
              <span className='sr-only'>Twitter page</span>
            </Link>
            <Link
              href='#'
              className='mx-2 text-gray-500 hover:text-gray-900 dark:hover:text-white'
            >
              <svg
                className='h-6 w-6'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='currentColor'
                viewBox='0 0 20 20'
              >
                <path
                  fillRule='evenodd'
                  d='M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z'
                />
              </svg>
              <span className='sr-only'>GitHub account</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
