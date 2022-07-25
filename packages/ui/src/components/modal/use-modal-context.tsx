import { createContext, ReactNode, useContext, useState } from 'react';

type ModalProviderProps = {
  children: ReactNode;
};

type ModalContext = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  modalId: string;
  setModalId: (value: string) => void;
};

const ModalContext = createContext({} as ModalContext);

export function useModalContext() {
  return useContext(ModalContext);
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalId, setModalId] = useState('');

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        openModal,
        closeModal,
        modalId,
        setModalId,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
