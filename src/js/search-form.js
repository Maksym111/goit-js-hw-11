import ImagesApiService from './server';
import createElem from './create-elements';
import LoadMoreBtn from './load-more-btn';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  searchForm: document.querySelector('#search-form'),
  galleryEl: document.querySelector('.gallery'),
  scrollBtn: document.querySelector('[data-action="scroll-up"]'),
};

const imagesApiService = new ImagesApiService();
const loadMoreBtnEl = new LoadMoreBtn({
  selector: '[data-action="load-more-js"]',
  hidden: true,
});
const imageLightBox = new SimpleLightbox('.gallery a', {
  scrollZoom: false,
});

refs.searchForm.addEventListener('submit', onSearchForm);
loadMoreBtnEl.refs.button.addEventListener('click', onLoadMoreClick);
refs.scrollBtn.addEventListener('click', onScrollUpClick);

async function onSearchForm(e) {
  e.preventDefault();

  imagesApiService.query = e.currentTarget.elements.searchQuery.value;

  loadMoreBtnEl.show();
  loadMoreBtnEl.disable();

  clearGallery();
  imagesApiService.resetPage();
  await insertMarcup();

  imageLightBox.refresh();
}

async function insertMarcup() {
  await imagesApiService.fetchRequest().then(elements => {
    if (elements === undefined || elements.length === 0) {
      loadMoreBtnEl.hide();
      return;
    }
    refs.galleryEl.insertAdjacentHTML('beforeend', createElem(elements));

    loadMoreBtnEl.enable();
    refs.scrollBtn.classList.remove('btn-hide');
  });
}

function clearGallery() {
  refs.galleryEl.innerHTML = '';
  refs.scrollBtn.classList.add('btn-hide');
}

async function onLoadMoreClick() {
  loadMoreBtnEl.disable();
  await insertMarcup();
  imageLightBox.refresh();
}

function onScrollUpClick() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2.15,
    behavior: 'smooth',
  });
}
