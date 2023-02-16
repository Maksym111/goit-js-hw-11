import { fetchRequest } from './server';

function createElem(value) {
  return fetchRequest(value).then(elements => {
    const marcup = elements
      .map(elem => {
        return marcupElem(elem);
      })
      .join('');

    return marcup;
  });
}

function marcupElem(elem) {
  return `<div class="photo-card">
            <img src="${elem.webformatURL}" alt="Зображення" loading="lazy" />
            <div class="info">
                <p class="info-item">
                    <b>Likes</b></br>
                    ${elem.likes}
                </p>
                <p class="info-item">
                    <b>Views</b></br>
                    ${elem.views}
                </p>
                <p class="info-item">
                    <b>Comments</b></br>
                    ${elem.comments}
                </p>
                <p class="info-item">
                    <b>Downloads</b></br>
                    ${elem.downloads}
                </p>
            </div>
    </div>`;
}

export { createElem };
