'use client';

import Image from 'next/image';
import { SubmitHandler, useForm } from 'react-hook-form';

import withAuth from '@/components/hoc/withAuth';

import useLoginMutation, { LoginRequest } from '../hooks/useLoginMutation';

export default withAuth(LoginForm, 'public');
function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    mode: 'onSubmit',
  });

  const { mutate } = useLoginMutation();

  const onSubmit: SubmitHandler<LoginRequest> = (data) => {
    mutate(data);
  };

  return (
    <section className='flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900'>
      <div className='mx-auto flex w-full flex-col items-center justify-center px-6 py-8 md:py-0'>
        <a
          href='/'
          className='mb-6 flex items-center text-2xl font-semibold text-gray-900 dark:text-white'
        >
          <Image
            className='mr-2 h-8 w-8'
            src='/images/logo-its.png'
            alt='logo'
            width={500}
            height={300}
          />
          TokoITS
        </a>

        <div className='w-full max-w-md rounded-lg bg-white shadow-lg dark:border dark:border-gray-700 dark:bg-gray-800 xl:p-0'>
          <div className='space-y-4 p-6 sm:p-8 md:space-y-6'>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl'>
              Sign in to your account
            </h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='space-y-4 md:space-y-6'
            >
              <div>
                <label
                  htmlFor='email'
                  className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
                >
                  Your email
                </label>
                <input
                  type='email'
                  id='email'
                  className={`block w-full rounded-lg border p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder='name@company.com'
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: 'Please enter a valid email address',
                    },
                  })}
                />
                {errors.email && (
                  <p className='mt-1 text-xs text-red-500'>
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor='password'
                  className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
                >
                  Password
                </label>
                <input
                  type='password'
                  id='password'
                  className={`block w-full rounded-lg border p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder='••••••••'
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    },
                  })}
                />
                {errors.password && (
                  <p className='mt-1 text-xs text-red-500'>
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                type='submit'
                className='w-full rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
              >
                Sign in
              </button>

              <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                Don’t have an account yet?{' '}
                <a
                  href='/register'
                  className='font-medium text-primary-600 hover:underline dark:text-primary-500'
                >
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
