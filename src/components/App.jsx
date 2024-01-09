import { useState } from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const formSubmit = value => {
    setSearchQuery(value);
  };

  return (
    <>
      <Searchbar onSubmit={formSubmit} />
      <ToastContainer autoClose={3000} />
      <ImageGallery searchQuery={searchQuery} />
    </>
  );
};
