import throttle from 'lodash.throttle';
import ImagesApiService from './server';
import createElem from './create-elements';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  searchForm: document.querySelector('#search-form'),
  galleryEl: document.querySelector('.gallery'),
  sentinel: document.querySelector('#sentinel'),
  scrollBtn: document.querySelector('[data-action="scroll-up"]'),
};

const imagesApiService = new ImagesApiService();

const imageLightBox = new SimpleLightbox('.gallery a', {
  scrollZoom: false,
});

refs.searchForm.addEventListener('submit', onSearchForm);
window.addEventListener('scroll', throttle(toFromBtnScroll, 500));
refs.scrollBtn.addEventListener('click', onScrollUpClick);

async function onSearchForm(e) {
  e.preventDefault();

  observer.unobserve(sentinel);
  observer.observe(sentinel);

  imagesApiService.query = e.currentTarget.elements.searchQuery.value;

  // loadMoreBtnEl.show();
  // loadMoreBtnEl.disable();

  clearGallery();
  imagesApiService.resetPage();
}

async function insertMarcup() {
  const elements = await imagesApiService.fetchRequest();
  if (elements === undefined || elements.length === 0) {
    // loadMoreBtnEl.hide();
    return;
  }
  refs.galleryEl.insertAdjacentHTML('beforeend', createElem(elements));
  // loadMoreBtnEl.enable();
}

async function addMoreMarcup() {
  await insertMarcup();
  imageLightBox.refresh();
}

function clearGallery() {
  refs.galleryEl.innerHTML = '';
  refs.scrollBtn.classList.add('btn-hide');
}

function onScrollUpClick(e) {
  // const { height: cardHeight } = document
  //   .querySelector('.gallery')
  //   .firstElementChild.getBoundingClientRect();
  // window.scrollBy({
  //   top: cardHeight * 2.15,
  //   behavior: 'smooth',
  // });

  const form = refs.searchForm;
  form.scrollIntoView({ behavior: 'smooth' });
}

function onEntry(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      addMoreMarcup();
    }
  });
}

function toFromBtnScroll() {
  if (window.pageYOffset > 1000) {
    refs.scrollBtn.classList.remove('btn-hide');
  } else {
    refs.scrollBtn.classList.add('btn-hide');
  }
}

const options = {
  rootMargin: '200px',
};
const observer = new IntersectionObserver(onEntry, options);

//Добавление картинок по кнопке, вместо бесконечного скрола
// import LoadMoreBtn from './load-more-btn';

// const loadMoreBtnEl = new LoadMoreBtn({
//   selector: '[data-action="load-more-js"]',
//   hidden: true,
// });

// loadMoreBtnEl.refs.button.addEventListener('click', onLoadMoreClick);

// async function onLoadMoreClick() {
//   loadMoreBtnEl.disable();
//   await insertMarcup();
//   imageLightBox.refresh();
// }
