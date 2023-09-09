import { fetchBreeds, fetchCatByBreed } from './js/cat-api.js';

const loader = document.querySelector('.loader');
const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const errorElement = document.querySelector('.error');

// Create a <h2> element for the header
const header = document.createElement('h2');
header.textContent = name; // Set the text content of the header

// Create a <p> element for the description
const descriptionParagraph = document.createElement('p');

// Create a <span> element for the description text
const descriptionSpan = document.createElement('span');
descriptionParagraph.appendChild(descriptionSpan); // Append the <span> to the <p>

// Create a <p> and <b> element for the temperament
const temperamentParagraph = document.createElement('p');
const temperamentFat = document.createElement('b');
temperamentFat.textContent = 'Temperament: ';
temperamentParagraph.appendChild(temperamentFat);

// Create a <span> element for the temperament text
const temperamentSpan = document.createElement('span');
temperamentParagraph.appendChild(temperamentSpan); // Append the <span> to the <p>

// Append the created elements to the .cat-info container
catInfo.appendChild(header);
catInfo.appendChild(descriptionParagraph);
catInfo.appendChild(temperamentParagraph);

function updateDescription(name, description, temperament) {
  const header = catInfo.querySelector('h2');
  header.textContent = name;

  const spanElements = document.querySelectorAll('span');
  spanElements[0].textContent = description;
  spanElements[1].textContent = temperament;
}

function displayInfo() {
  catInfo.style.display = 'block';
}

function hideInfo() {
  catInfo.style.display = 'none';
}

function hideLoader() {
  loader.style.display = 'none';
}

function displayLoader() {
  loader.style.display = 'block';
}

function displayError() {
  errorElement.style.display = 'block';
}

function hideError() {
  errorElement.style.display = 'none';
}

hideError();
hideInfo();
displayLoader();

fetchBreeds()
  .then(breeds =>
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
      hideLoader();
    })
  )
  .catch(() => {
    displayError(); // Display error if there's an issue with the request
    hideLoader(); // Hide loader in case of error
  });

// Event listener to handle breed selection change
breedSelect.addEventListener('change', async event => {
  const breedId = event.target.value;
  displayLoader();
  hideInfo();

  const existingImage = document.querySelector('img');
  if (existingImage) {
    existingImage.remove();
  }

  fetchCatByBreed(breedId)
    .then(({ catData, imageData }) => {
      let image = document.createElement('img');
      image.style.width = '100%';
      image.style.height = 'auto';
      image.src = `${imageData.data.url}`;
      updateDescription(catData.name, catData.description, catData.temperament);
      document.body.appendChild(image);

      hideLoader();
      displayInfo();
    })
    .catch(() => {
      displayError(); // Display error if there's an issue with the request
      hideLoader(); // Hide loader in case of error
    });
});
