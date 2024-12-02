'use client';

import Image from 'next/image';
import { SubmitHandler, useForm } from 'react-hook-form';

import useRegisterMutation, {
  RegisterRequest,
} from '../hooks/useRegisterMutation';

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterRequest>({
    mode: 'onTouched',
  });

  const { mutate } = useRegisterMutation();

  const onSubmit: SubmitHandler<RegisterRequest> = (data) => {
    mutate(data);
  };

  return (
    <section className='flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900'>
      <div className='mx-auto flex w-full flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0'>
        <a
          href='#'
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
        <div className='w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0'>
          <div className='space-y-4 p-6 sm:p-8 md:space-y-6'>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl'>
              Sign up new account
            </h1>
            <form
              className='space-y-4 md:space-y-6'
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label
                  htmlFor='name'
                  className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
                >
                  Your name
                </label>
                <input
                  {...register('name', { required: 'Name is required' })}
                  type='text'
                  id='name'
                  className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
                  placeholder='John Doe'
                />
                {errors.name && (
                  <p className='text-xs text-red-500'>{errors.name.message}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor='email'
                  className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
                >
                  Your email
                </label>
                <input
                  {...register('email', { required: 'Email is required' })}
                  type='email'
                  id='email'
                  className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
                  placeholder='name@company.com'
                />
                {errors.email && (
                  <p className='text-xs text-red-500'>{errors.email.message}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor='telp_number'
                  className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
                >
                  Your phone number
                </label>
                <input
                  {...register('telp_number', {
                    required: 'Phone number is required',
                  })}
                  type='tel'
                  id='telp_number'
                  className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
                  placeholder='123-456-7890'
                />
                {errors.telp_number && (
                  <p className='text-xs text-red-500'>
                    {errors.telp_number.message}
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
                  {...register('password', {
                    required: 'Password is required',
                  })}
                  type='password'
                  id='password'
                  placeholder='••••••••'
                  className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
                />
                {errors.password && (
                  <p className='text-xs text-red-500'>
                    {errors.password.message}
                  </p>
                )}
              </div>
              <button
                type='submit'
                className='w-full rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
              >
                Sign up
              </button>
              <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                Already have an account?{' '}
                <a
                  href='/login'
                  className='font-medium text-primary-600 hover:underline dark:text-primary-500'
                >
                  Sign in
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
