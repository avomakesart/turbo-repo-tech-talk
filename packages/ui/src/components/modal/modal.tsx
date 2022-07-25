import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, ReactNode, useEffect } from 'react';
import { useModalContext } from './use-modal-context';

interface ModalProps {
  children: ReactNode;
  title?: string;
  modalId: string;
  closable?: boolean;
  containerClassName?: string;
}

export const Modal: React.FC<ModalProps> = ({
  children,
  title,
  modalId,
  closable = true,
  containerClassName,
}) => {
  const { isOpen, closeModal, modalId: id, setModalId } = useModalContext();

  useEffect(() => {
    if (modalId === id) {
      setModalId(modalId);
    }

    return () => setModalId('');
  }, [id, modalId, setModalId]);

  return (
    <>
      {modalId === id && (
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as='div' className='relative z-10' onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <div className='fixed inset-0 bg-black bg-opacity-25' />
            </Transition.Child>

            <div className='fixed inset-0 overflow-y-auto'>
              <div className='flex min-h-full items-center justify-center p-4 text-center'>
                <Transition.Child
                  as={Fragment}
                  enter='ease-out duration-300'
                  enterFrom='opacity-0 scale-95'
                  enterTo='opacity-100 scale-100'
                  leave='ease-in duration-200'
                  leaveFrom='opacity-100 scale-100'
                  leaveTo='opacity-0 scale-95'
                >
                  <Dialog.Panel
                    className={`w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all ${
                      containerClassName ? containerClassName : ''
                    }`}
                  >
                    {title && (
                      <Dialog.Title
                        as='h3'
                        className='text-lg font-medium leading-6 text-gray-900'
                      >
                        {title}
                      </Dialog.Title>
                    )}
                    {closable && (
                      <button
                        type='button'
                        className='m-6 absolute right-0 top-0 text-gray-400 hover:text-gray-500'
                        tabIndex={0}
                        onClick={closeModal}
                      >
                        <span className='sr-only'>Close panel</span>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth='2'
                          stroke='currentColor'
                          aria-hidden='true'
                          className='h-6 w-6'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M6 18L18 6M6 6l12 12'
                          ></path>
                        </svg>
                      </button>
                    )}
                    {children}
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      )}
    </>
  );
};
