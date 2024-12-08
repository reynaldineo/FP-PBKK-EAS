'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <section className='flex min-h-screen items-center justify-center bg-white dark:bg-gray-900'>
      <div className='mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16'>
        <div className='mx-auto max-w-screen-sm text-center'>
          <h1 className='mb-4 text-7xl font-extrabold tracking-tight text-primary-600 dark:text-primary-500 lg:text-9xl'>
            404
          </h1>
          <p className='mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl'>
            Not Found
          </p>
          <p className='mb-4 text-lg font-light text-gray-500 dark:text-gray-400'>
            Sorry, we couldn&apos;t find the page you&apos;re looking for.
          </p>
          <div className='flex justify-center gap-4'>
            <button
              onClick={() => router.back()}
              className='my-4 inline-flex rounded-lg border-2 border-primary-600 px-6 py-3 text-center text-sm font-medium text-primary-600 hover:bg-primary-600 hover:text-white focus:outline-none focus:ring-4 focus:ring-primary-300 dark:border-primary-500 dark:text-primary-500 dark:hover:bg-primary-500 dark:hover:text-white dark:focus:ring-primary-900'
            >
              Back to Previous Page
            </button>
            <Link href='/'>
              <button className='my-4 inline-flex rounded-lg bg-primary-600 px-6 py-3 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900'>
                Back to Homepage
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
