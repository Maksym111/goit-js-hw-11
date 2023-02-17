import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';

export default class ImagesApiService {
  constructor() {
    this.querySearch = '';
    this.page = 1;
  }

  async fetchRequest() {
    try {
      const BASE_URL = 'https://pixabay.com/api/';
      const API_KEY = '33699933-d3e83fded39d08dcf871d4bdf';

      const params = new URLSearchParams({
        key: API_KEY,
        q: this.querySearch,
        per_page: 40,
        page: this.page,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      });

      const getRequest = await axios.get(`${BASE_URL}?${params}`);
      const data = getRequest.data;

      this.incrementPage();
      return sendMessageResult(data);
    } catch (err) {
      console.log(err);
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
  }

  get query() {
    return this.querySearch;
  }

  set query(newQuery) {
    this.querySearch = newQuery;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}

function sendMessageResult(data) {
  if (data.totalHits === 0 && data.hits.length === 0) {
    throw new Error();
  } else if (data.hits.length === 0) {
    Notify.info("We're sorry, but you've reached the end of search results.");
    return data.hits;
  }
  Notify.success(`Hooray! We found ${data.totalHits} images.`);
  return data.hits;
}
