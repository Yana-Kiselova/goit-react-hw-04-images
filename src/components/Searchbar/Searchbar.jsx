import { useState } from 'react';
import { toast } from 'react-toastify';

import css from './Searchbar.module.css';

export const Searchbar = ({ onSubmit }) => {
  const [imageName, setImageName] = useState('');

  // Відповідає за оновлення стану
  const handleChange = e => {
    setImageName(e.target.value.toLowerCase());
  };

  //   // Викликається під час відправлення форми
  const handleSubmit = e => {
    e.preventDefault();
    if (imageName.trim() === '') {
      toast('Введіть назву картинки');
    }
    onSubmit(imageName);
  };

  return (
    <header className={css.searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button className={css.SearchFormButton} type="submit">
          <span className={css.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

// export class Searchbar extends Component {
//   state = {
//     imageName: '',
//   };

//   // Відповідає за оновлення стану
//   handleChange = e => {
//     this.setState({ imageName: e.target.value.toLowerCase() });
//   };

//   // Викликається під час відправлення форми
//   handleSubmit = e => {
//     e.preventDefault();
//     if (this.state.imageName.trim() === '') {
//       toast('Введіть назву картинки');
//       return;
//     }
//     this.props.onSubmit(this.state.imageName);
//   };

//   render() {
//     return (
//       <header className={css.searchbar}>
//         <form className={css.SearchForm} onSubmit={this.handleSubmit}>
//           <button className={css.SearchFormButton} type="submit">
//             <span className={css.SearchFormButtonLabel}>Search</span>
//           </button>

//           <input
//             className={css.SearchFormInput}
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             onChange={this.handleChange}
//           />
//         </form>
//       </header>
//     );
//   }
// }
