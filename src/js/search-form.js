import { createElem } from './show-search';

const refs = {
  inputEl: document.querySelector('[name="searchQuery"]'),
  submitBtnEl: document.querySelector('.submit-btn'),
  galleryEl: document.querySelector('.gallery'),
};

refs.submitBtnEl.addEventListener('click', onSubmitBtnClick);

function onSubmitBtnClick(e) {
  e.preventDefault();

  const value = refs.inputEl.value;

  return createElem(value).then(data => (refs.galleryEl.innerHTML = data));
}
