import { useEffect, useState } from 'react';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';
import { Modal } from '../Modal/Modal';
import { toast } from 'react-toastify';

export const ImageGallery = ({ searchQuery }) => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('resolved');
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(false);
  const [modalImg, setModalImg] = useState('');
  const [modalAlt, setModalAlt] = useState('');

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setImages([]);
      setPage(1);
      setError(null);

      return;
    }
    if (query !== searchQuery) {
      setQuery(searchQuery);
      if (query !== '') {
        setImages([]);
        setPage(1);
        setError(null);

        if (page > 1) {
          return;
        }
      }
    }

    setStatus('pending');
    fetchImage();
  }, [searchQuery, page]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchImage = () => {
    fetch(
      `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=38060547-c8a3d7858038d11f3ac520262&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(
          new Error(`За таким запитом нічого не знайдено ${searchQuery}`)
        );
      })
      .then(images => {
        if (images.hits.length === 0) {
          setError(`За таким запитом нічого не знайдено ${searchQuery}`);
          setStatus('rejected');
          toast(`За таким запитом нічого не знайдено `);
          return;
        }
        setImages(prevImages => {
          return [...prevImages, ...images.hits];
        });
        setStatus('resolved');
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      })
      .finally(() => {
        if (page > 1) {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        }
      });
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
    setStatus('pending');
  };

  const closeModal = () => {
    setModal(false);
  };

  const closeModalBackdrop = event => {
    const target = event.target;
    const currentTarget = event.currentTarget;
    if (target === currentTarget) {
      setModal(false);
    }
  };

  const openModal = event => {
    const imgForModal = event.target.dataset.src;
    const altForModal = event.target.alt;

    setModalImg(imgForModal);
    setModalAlt(altForModal);
    setModal(true);
  };

  if (status === 'pending') {
    return (
      <div className={css.container}>
        {images.length >= 1 && (
          <ul className={css.gallery}>
            {images.map(image => {
              return (
                <ImageGalleryItem
                  handleClickImg={openModal}
                  key={image.id}
                  image={image}
                />
              );
            })}
          </ul>
        )}
        <Loader />
      </div>
    );
  }

  if (status === 'rejected') {
    return (
      <div className={css.container}>
        <p>{error?.message || error}</p>
      </div>
    );
  }

  if (status === 'resolved') {
    return (
      <>
        <div className={css.container}>
          <ul className={css.gallery}>
            {images.map(image => {
              return (
                <ImageGalleryItem
                  handleClickImg={openModal}
                  key={image.id}
                  image={image}
                />
              );
            })}
          </ul>

          {images?.length >= 1 && <Button onclick={loadMore}>Load More</Button>}
        </div>

        {modal && (
          <Modal
            src={modalImg}
            alt={modalAlt}
            closeModal={closeModal}
            closeBackdrop={closeModalBackdrop}
          />
        )}
      </>
    );
  }
};

// export class ImageGallery extends Component {
//   state = {
//     images: [],
//     error: null,
//     status: 'idle',
//     page: 1,
//     modal: false,
//     modalImg: '',
//     modalAlt: '',
//   };

//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.page > 1) {
//       window.scrollTo({
//         top: document.documentElement.scrollHeight,
//         behavior: 'smooth',
//       });
//     }

//     if (prevProps.searchQuery !== this.props.searchQuery) {
//       this.setState(() => ({
//         status: 'pending',
//         page: 1,
//         images: [],
//       }));

//       setTimeout(() => {
//         this.fetchImage();
//       });
//     }
//   }

//   fetchImage() {
//     fetch(
//       `https://pixabay.com/api/?q=${this.props.searchQuery}&page=${this.state.page}&key=38060547-c8a3d7858038d11f3ac520262&image_type=photo&orientation=horizontal&per_page=12`
//     )
//       .then(res => {
//         if (res.ok) {
//           return res.json();
//         }
//         return Promise.reject(
//           new Error(
//             `За таким запитом нічого не знайдено ${this.props.searchQuery}`
//           )
//         );
//       })
//       .then(images => {
//         if (images.hits.length === 0) {
//           this.setState({
//             error: {
//               message: `За таким запитом нічого не знайдено ${this.props.searchQuery}`,
//             },
//             status: 'rejected',
//           });
//           toast(`За таким запитом нічого не знайдено `);
//           return;
//         }
//         this.setState(prevState => {
//           return {
//             images: [...prevState.images, ...images.hits],
//             status: 'resolved',
//           };
//         });
//       })
//       .catch(error =>
//         this.setState({
//           error,
//           status: 'rejected',
//         })
//       );
//   }

//   loadMore = () => {
//     this.setState(prevState => {
//       return { page: prevState.page + 1, status: 'pending' };
//     });

//     setTimeout(() => {
//       this.fetchImage();
//     });
//   };

//   closeModal = () => {
//     this.setState({ modal: false });
//   };

//   openModal = event => {
//     const imgForModal = event.target.dataset.src;
//     const altForModal = event.target.alt;
//     this.setState({
//       modalImg: imgForModal,
//       modalAlt: altForModal,
//       modal: true,
//     });
//   };

//   render() {
//     const { images, error, status, modalImg, modalAlt, modal } = this.state;

//     if (status === 'pending') {
//       return (
//         <div className={css.container}>
//           {images.length >= 1 && (
//             <ul className={css.gallery}>
//               {images.map(image => {
//                 return (
//                   <ImageGalleryItem
//                     handleClickImg={this.openModal}
//                     key={image.id}
//                     image={image}
//                   />
//                 );
//               })}
//             </ul>
//           )}
//           <Loader />;
//         </div>
//       );
//     }

//     if (status === 'rejected') {
//       console.log(error.message);
//       return (
//         <div className={css.container}>
//           <p>{error.message}</p>
//         </div>
//       );
//     }

//     if (status === 'resolved') {
//       return (
//         <>
//           <div className={css.container}>
//             <ul className={css.gallery}>
//               {images.map(image => {
//                 return (
//                   <ImageGalleryItem
//                     handleClickImg={this.openModal}
//                     key={image.id}
//                     image={image}
//                   />
//                 );
//               })}
//             </ul>

//             {images?.length >= 1 && (
//               <Button onclick={this.loadMore}>Load More</Button>
//             )}
//           </div>

//           {modal && (
//             <Modal src={modalImg} alt={modalAlt} closeModal={this.closeModal} />
//           )}
//         </>
//       );
//     }
//   }
// }
