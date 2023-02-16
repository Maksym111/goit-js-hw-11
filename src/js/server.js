import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '33699933-d3e83fded39d08dcf871d4bdf';

function fetchRequest(value) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: value,
    per_page: 40,
    page: 1,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  return axios
    .get(`${BASE_URL}?${params}`)
    .then(({ data }) => {
      if (data.hits.length === 0) {
        throw new Error();
      }
      return data.hits;
    })
    .catch(err => {
      console.log(err);
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    });
}

export { fetchRequest };
