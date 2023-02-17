import ImagesApiService from './server';
import createElem from './create-elements';
import LoadMoreBtn from './load-more-btn';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  searchForm: document.querySelector('#search-form'),
  galleryEl: document.querySelector('.gallery'),
};

const imagesApiService = new ImagesApiService();
const loadMoreBtnEl = new LoadMoreBtn({
  selector: '[data-action="load-more-js"]',
  hidden: true,
});

refs.searchForm.addEventListener('submit', onSearchForm);
loadMoreBtnEl.refs.button.addEventListener('click', onLoadMoreClick);

const image = new SimpleLightbox('.gallery a', {
  scrollZoom: false,
});

function onSearchForm(e) {
  e.preventDefault();

  imagesApiService.query = e.currentTarget.elements.searchQuery.value;

  loadMoreBtnEl.show();
  loadMoreBtnEl.disable();

  clearGallery();
  imagesApiService.resetPage();
  insertMarcup();

  // console.log(image);

  // showLargeImg();
}

function insertMarcup() {
  imagesApiService.fetchRequest().then(elements => {
    if (elements === undefined || elements.length === 0) {
      loadMoreBtnEl.hide();
      return;
    }
    refs.galleryEl.insertAdjacentHTML('beforeend', createElem(elements));

    loadMoreBtnEl.enable();
  });
}

function clearGallery() {
  refs.galleryEl.innerHTML = '';
}

function onLoadMoreClick() {
  loadMoreBtnEl.disable();
  insertMarcup();
}

// new SimpleLightbox('.gallery a', {
//   scrollZoom: false,
// });
