/* eslint-disable @next/next/no-img-element */
import { Dialog, Popover, Tab, Transition } from '@headlessui/react';
import {
  MenuIcon,
  SearchIcon,
  ShoppingBagIcon,
  XIcon,
} from '@heroicons/react/outline';
import { yupResolver } from '@hookform/resolvers/yup';
import { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useLocalStorage } from '../../hooks';
import { AuthModal } from '../auth-modal';
import { useCartContext } from '../cart/use-cart-context';
import { Input } from '../input';
import { useSearchModalContext } from '../search-modal/use-search-modal';
import { Navigation } from './types';
import { useCountrySelectorContext } from '../country-selector/use-currency-selector';
import { Modal } from '../modal';
import { useModalContext } from '../modal/use-modal-context';

interface NavProps {
  navigation: Navigation;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

type IRegisterFormInputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type ILoginFormInputs = {
  email: string;
  password: string;
};

const registerSchema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .required('Please Enter your password')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Passwords needs to match the information below.'
    ),
});

const loginSchema = yup.object({
  email: yup
    .string()
    .email('Email must be a valid email')
    .required('Email is a required field'),
  password: yup.string().required('Please Enter your password'),
});

export const NavBar: React.FC<NavProps> = ({ navigation }) => {
  const [open, setOpen] = useState(false);
  const [isBannerShown, setIsBannerShown] = useLocalStorage(
    'promotion-banner',
    true
  );

  const { openModal: openSearchModal } = useSearchModalContext();
  const { openCart, cartQuantity } = useCartContext();
  const { openModal: openCountryModal, setModalId: setCountryModalId } =
    useModalContext();
  const { openModal: openRegisterModal, setModalId } = useModalContext();
  const { openModal: openSignInModal, setModalId: setSignInModalId } =
    useModalContext();

  const handleOpenSignInModal = (value: string) => {
    setSignInModalId(value);
    openSignInModal();
  };

  const handleOpenRegisterModal = (value: string) => {
    setModalId(value);
    openRegisterModal();
  };

  const handleOpenCountryModal = (value: string) => {
    setCountryModalId(value);
    openCountryModal();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterFormInputs>({
    resolver: yupResolver(registerSchema),
  });

  const {
    register: login,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<ILoginFormInputs>({ resolver: yupResolver(loginSchema) });

  const onSubmit = (data: IRegisterFormInputs) => console.log(data);
  const onLoginSubmit = (data: ILoginFormInputs) => console.log(data);

  return (
    <div className='bg-white'>
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as='div' className='relative z-40 lg:hidden' onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter='transition-opacity ease-linear duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition-opacity ease-linear duration-300'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 flex z-40'>
            <Transition.Child
              as={Fragment}
              enter='transition ease-in-out duration-300 transform'
              enterFrom='-translate-x-full'
              enterTo='translate-x-0'
              leave='transition ease-in-out duration-300 transform'
              leaveFrom='translate-x-0'
              leaveTo='-translate-x-full'
            >
              <Dialog.Panel className='relative max-w-md w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto'>
                <div className='px-4 pt-5 pb-2 flex'>
                  <button
                    type='button'
                    className='-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400'
                    onClick={() => setOpen(false)}
                  >
                    <span className='sr-only'>Close menu</span>
                    <XIcon className='h-6 w-6' aria-hidden='true' />
                  </button>
                </div>

                {/* Links */}
                <Tab.Group as='div' className='mt-2'>
                  <div className='border-b border-gray-200'>
                    <Tab.List className='-mb-px flex px-4 space-x-8'>
                      {navigation.categories.map((category) => (
                        <Tab
                          key={category.name}
                          className={({ selected }: { selected: boolean }) =>
                            classNames(
                              selected
                                ? 'text-indigo-600 border-indigo-600'
                                : 'text-gray-900 border-transparent',
                              'flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium'
                            )
                          }
                        >
                          {category.name}
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>
                  <Tab.Panels as={Fragment}>
                    {navigation.categories.map((category) => (
                      <Tab.Panel
                        key={category.name}
                        className='pt-10 pb-8 px-4 space-y-10'
                      >
                        <div className='grid grid-cols-2 gap-x-4'>
                          {category.featured.map((item) => (
                            <div
                              key={item.name}
                              className='group relative text-sm'
                            >
                              <div className='aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75'>
                                <img
                                  src={item.imageSrc}
                                  alt={item.imageAlt}
                                  className='object-center object-cover'
                                />
                              </div>
                              <a
                                href={item.href}
                                className='mt-6 block font-medium text-gray-900'
                              >
                                <span
                                  className='absolute z-10 inset-0'
                                  aria-hidden='true'
                                />
                                {item.name}
                              </a>
                              <p aria-hidden='true' className='mt-1'>
                                Shop now
                              </p>
                            </div>
                          ))}
                        </div>
                        {category.sections.map((section) => (
                          <div key={section.name}>
                            <p
                              id={`${category.id}-${section.id}-heading-mobile`}
                              className='font-medium text-gray-900'
                            >
                              {section.name}
                            </p>
                            <ul
                              role='list'
                              aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                              className='mt-6 flex flex-col space-y-6'
                            >
                              {section.items.map((item) => (
                                <li key={item.name} className='flow-root'>
                                  <a
                                    href={item.href}
                                    className='-m-2 p-2 block text-gray-500'
                                  >
                                    {item.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>

                <div className='border-t border-gray-200 py-6 px-4 space-y-6'>
                  {navigation.pages.map((page) => (
                    <div key={page.name} className='flow-root'>
                      <a
                        href={page.href}
                        className='-m-2 p-2 block font-medium text-gray-900'
                      >
                        {page.name}
                      </a>
                    </div>
                  ))}
                </div>

                <div className='border-t border-gray-200 py-6 px-4 space-y-6'>
                  <div className='flow-root'>
                    <span
                      className='-m-2 p-2 block font-medium text-gray-900'
                      onClick={() => handleOpenSignInModal('sign-in')}
                    >
                      Sign in
                    </span>
                  </div>
                  <div className='flow-root'>
                    <span
                      className='-m-2 p-2 block font-medium text-gray-900'
                      onClick={() => handleOpenRegisterModal('create-account')}
                    >
                      Create account
                    </span>
                  </div>
                </div>

                <div className='border-t border-gray-200 py-6 px-4'>
                  <span
                    onClick={() => handleOpenCountryModal('country')}
                    className='-m-2 p-2 cursor-pointer flex items-center'
                  >
                    <img
                      src='https://tailwindui.com/img/flags/flag-canada.svg'
                      alt=''
                      className='w-5 h-auto block flex-shrink-0'
                    />
                    <span className='ml-3 block text-base font-medium text-gray-900'>
                      CAD
                    </span>
                    <span className='sr-only'>, change currency</span>
                  </span>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <Modal modalId='sign-in' containerClassName='p-12'>
        <form onSubmit={handleLoginSubmit(onLoginSubmit)}>
          <div className='flex justify-center pb-8 '>
            <svg
              width='64px'
              height='64px'
              viewBox='0 0 32 32'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className=''
            >
              <rect width='100%' height='100%' rx='16' fill='#000'></rect>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z'
                fill='#fff'
              ></path>
            </svg>
          </div>
          <div className='flex flex-col space-y-4'>
            <Input
              {...login('email')}
              placeholder='Email'
              isInvalid={Object(loginErrors.email).message?.length > 0}
              errorMessage={Object(loginErrors.email)?.message}
            />

            <Input
              type='password'
              {...login('password')}
              placeholder='Password'
              isInvalid={Object(loginErrors.password).message?.length > 0}
              errorMessage={Object(loginErrors.password)?.message}
            />
            <div className='pt-2 w-full flex flex-col'>
              <button
                type='submit'
                className='inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-slate-900 text-white hover:bg-slate-700 w-full'
              >
                <span>Sign in to account</span>
              </button>
            </div>
            <p className='mt-8 text-center'>
              <a href='/password/reset' className='text-sm hover:underline'>
                Forgot password?
              </a>
            </p>
          </div>
        </form>
      </Modal>

      <Modal modalId='create-account' containerClassName='p-12'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex justify-center pb-8 '>
            <svg
              width='64px'
              height='64px'
              viewBox='0 0 32 32'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className=''
            >
              <rect width='100%' height='100%' rx='16' fill='#000'></rect>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z'
                fill='#fff'
              ></path>
            </svg>
          </div>
          <div className='flex flex-col space-y-4'>
            <Input
              {...register('firstName')}
              placeholder='FirstName'
              isInvalid={Object(errors.firstName).message?.length > 0}
              errorMessage={Object(errors.firstName)?.message}
            />

            <Input
              {...register('lastName')}
              placeholder='LastName'
              isInvalid={Object(errors.lastName).message?.length > 0}
              errorMessage={Object(errors.lastName)?.message}
            />

            <Input
              {...register('email')}
              placeholder='Email'
              isInvalid={Object(errors.email).message?.length > 0}
              errorMessage={Object(errors.email)?.message}
            />

            <Input
              type='password'
              {...register('password')}
              placeholder='Password'
              isInvalid={Object(errors.password).message?.length > 0}
              errorMessage={Object(errors.password)?.message}
            />

            <span className='text-accent-8'>
              <span className='inline-block align-middle '>
                <svg
                  viewBox='0 0 24 24'
                  width='15'
                  height='15'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  fill='none'
                  shapeRendering='geometricPrecision'
                >
                  <circle cx='12' cy='12' r='10' fill='transparent'></circle>
                  <path d='M12 8v4' stroke='currentColor'></path>
                  <path d='M12 16h.01' stroke='currentColor'></path>
                </svg>
              </span>
              <span className='leading-6 text-sm ml-1'>
                <strong>Info</strong>
                {`:`} Passwords must be longer than 7 chars and include one
                number, one uppercase, one lowercase and one symbol.{' '}
              </span>
            </span>
            <div className='pt-2 w-full flex flex-col'>
              <button
                type='submit'
                className='inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-slate-900 text-white hover:bg-slate-700 w-full'
              >
                <span>Sign Up</span>
              </button>
            </div>
            <p className='mt-8 text-center'>
              Do you have an account?
              <a
                href='/password/reset'
                className='text-sm font-bold ml-2 hover:underline'
              >
                Login
              </a>
            </p>
          </div>
        </form>
      </Modal>

      <Modal modalId='country' title='Hello dude'>
        <span>country input works dude</span>
      </Modal>

      <header className='relative bg-white'>
        {isBannerShown && (
          <div className='bg-indigo-600 h-10 flex items-center justify-center text-sm font-medium text-white px-4 sm:px-6 lg:px-8'>
            <p className='ml-auto text-sm font-medium text-white'>
              Get free delivery on orders over $100
            </p>
            <button className='ml-auto' onClick={() => setIsBannerShown(false)}>
              <XIcon className='w-5 h-5 text-sm font-medium text-white' />{' '}
            </button>
          </div>
        )}

        <nav
          aria-label='Top'
          className='max-w-full mx-auto px-4 sm:px-6 lg:px-8'
        >
          <div className='border-b border-gray-200'>
            <div className='h-16 flex items-center'>
              <button
                type='button'
                className='bg-white p-2 rounded-md text-gray-400 lg:hidden'
                onClick={() => setOpen(true)}
              >
                <span className='sr-only'>Open menu</span>
                <MenuIcon className='h-6 w-6' aria-hidden='true' />
              </button>

              {/* Logo */}
              <div className='ml-4 flex lg:ml-0'>
                <a href='/'>
                  <span className='sr-only'>Workflow</span>
                  <img
                    className='h-8 w-auto'
                    src='https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600'
                    alt=''
                  />
                </a>
              </div>

              {/* Flyout menus */}
              <Popover.Group className='hidden lg:ml-8 lg:block lg:self-stretch'>
                <div className='h-full flex space-x-8'>
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className='flex'>
                      {({ open }: { open: boolean }) => (
                        <>
                          <div className='relative flex'>
                            <Popover.Button
                              className={classNames(
                                open
                                  ? 'border-indigo-600 text-indigo-600'
                                  : 'border-transparent text-gray-700 hover:text-gray-800',
                                'relative z-10 flex items-center transition-colors ease-out duration-200 text-sm font-medium border-b-2 -mb-px pt-px'
                              )}
                            >
                              {category.name}
                            </Popover.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter='transition ease-out duration-200'
                            enterFrom='opacity-0'
                            enterTo='opacity-100'
                            leave='transition ease-in duration-150'
                            leaveFrom='opacity-100'
                            leaveTo='opacity-0'
                          >
                            <Popover.Panel className='absolute top-full z-10 inset-x-0 text-sm text-gray-500'>
                              {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                              <div
                                className='absolute inset-0 top-1/2 bg-white shadow'
                                aria-hidden='true'
                              />

                              <div className='relative bg-white'>
                                <div className='max-w-7xl mx-auto px-8'>
                                  <div className='grid grid-cols-2 gap-y-10 gap-x-8 py-16'>
                                    <div className='col-start-2 grid grid-cols-2 gap-x-8'>
                                      {category.featured.map((item) => (
                                        <div
                                          key={item.name}
                                          className='group relative text-base sm:text-sm'
                                        >
                                          <div className='aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75'>
                                            <img
                                              src={item.imageSrc}
                                              alt={item.imageAlt}
                                              className='object-center object-cover'
                                            />
                                          </div>
                                          <a
                                            href={item.href}
                                            className='mt-6 block font-medium text-gray-900'
                                          >
                                            <span
                                              className='absolute z-10 inset-0'
                                              aria-hidden='true'
                                            />
                                            {item.name}
                                          </a>
                                          <p
                                            aria-hidden='true'
                                            className='mt-1'
                                          >
                                            Shop now
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                    <div className='row-start-1 grid grid-cols-3 gap-y-10 gap-x-8 text-sm'>
                                      {category.sections.map((section) => (
                                        <div key={section.name}>
                                          <p
                                            id={`${section.name}-heading`}
                                            className='font-medium text-gray-900'
                                          >
                                            {section.name}
                                          </p>
                                          <ul
                                            role='list'
                                            aria-labelledby={`${section.name}-heading`}
                                            className='mt-6 space-y-6 sm:mt-4 sm:space-y-4'
                                          >
                                            {section.items.map((item) => (
                                              <li
                                                key={item.name}
                                                className='flex'
                                              >
                                                <a
                                                  href={item.href}
                                                  className='hover:text-gray-800'
                                                >
                                                  {item.name}
                                                </a>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}

                  {navigation.pages.map((page) => (
                    <a
                      key={page.name}
                      href={page.href}
                      className='flex items-center text-sm font-medium text-gray-700 hover:text-gray-800'
                    >
                      {page.name}
                    </a>
                  ))}
                </div>
              </Popover.Group>

              <div className='ml-auto flex items-center'>
                <div className='hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6'>
                  <span
                    onClick={() => handleOpenSignInModal('sign-in')}
                    className='text-sm font-medium text-gray-700 cursor-pointer hover:text-gray-800'
                  >
                    Sign in
                  </span>
                  <span className='h-6 w-px bg-gray-200' aria-hidden='true' />
                  <span
                    onClick={() => handleOpenRegisterModal('create-account')}
                    className='text-sm font-medium text-gray-700 cursor-pointer hover:text-gray-800'
                  >
                    Create account
                  </span>
                </div>

                <div className='hidden lg:ml-8 lg:flex'>
                  <span
                    onClick={() => handleOpenCountryModal('country')}
                    className='text-gray-700 hover:text-gray-800 cursor-pointer flex items-center'
                  >
                    <img
                      src='https://tailwindui.com/img/flags/flag-canada.svg'
                      alt=''
                      className='w-5 h-auto block flex-shrink-0'
                    />
                    <span className='ml-3 block text-sm font-medium'>CAD</span>
                    <span className='sr-only'>, change currency</span>
                  </span>
                </div>

                {/* Search */}
                <div className='flex lg:ml-6'>
                  <span
                    onClick={openSearchModal}
                    className='p-2 text-gray-400 cursor-pointer hover:text-gray-500'
                  >
                    <span className='sr-only'>Search</span>
                    <SearchIcon className='w-6 h-6' aria-hidden='true' />
                  </span>
                </div>

                {/* Cart */}
                <div className='ml-4 flow-root lg:ml-6'>
                  <button
                    className='group -m-2 p-2 flex items-center'
                    onClick={openCart}
                  >
                    <ShoppingBagIcon
                      className='flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500'
                      aria-hidden='true'
                    />

                    <span className='ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800'>
                      {String(cartQuantity)}
                    </span>

                    <span className='sr-only'>items in cart, view bag</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};
