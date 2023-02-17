export default function createElem(elements) {
  return elements
    .map(elem => {
      return marcupElem(elem);
    })
    .join('');
}

function marcupElem(elem) {
  return `<a href="${elem.largeImageURL}" class="photo-card">
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
    <a>`;
}
