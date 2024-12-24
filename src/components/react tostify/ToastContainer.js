import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastContainerWrapper = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={1000} // Пас аз 3 сония баста мешавад
      hideProgressBar={false} // Прогресс-бар намоиш дода шавад
      newestOnTop={true} // Тостҳои навтарин дар боло бошанд
      closeOnClick={true} // Ҳангоми клик баста шавад
      pauseOnFocusLoss={false}
      draggable={false}
      pauseOnHover={false} // Ҳангоми hover таваққуф накунад
      theme="light"
    />
  );
};

export default ToastContainerWrapper;
