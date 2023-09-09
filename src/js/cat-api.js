import axios from 'axios';


const apiKey = "live_G8G6TSAUebk57bIcPs5F6EKP3ZidTJytRenPTOuKBT0TXhBVbqlnxvLN7Wpp9ebG"; // Replace with your actual API key

axios.defaults.headers.common["x-api-key"] = apiKey;

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
temperamentParagraph.appendChild(temperamentFat)

// Create a <span> element for the temperament text
const temperamentSpan = document.createElement('span');
temperamentParagraph.appendChild(temperamentSpan); // Append the <span> to the <p>

// Append the created elements to the .cat-info container
catInfo.appendChild(header);
catInfo.appendChild(descriptionParagraph);
catInfo.appendChild(temperamentParagraph);

// function addDescription(name, description, temperament) {
//   // Create a <h2> element for the header
//   const header = document.createElement('h2');
//   header.textContent = name; // Set the text content of the header

//   // Create a <p> element for the description
//   const descriptionParagraph = document.createElement('p');
//   // descriptionParagraph.textContent = 'Description: ' + description;

//   // Create a <span> element for the description text
//   const descriptionSpan = document.createElement('span');
//   descriptionSpan.textContent = description
//   descriptionParagraph.appendChild(descriptionSpan); // Append the <span> to the <p>

//   // Create a <p> and <b> element for the temperament
//   const temperamentParagraph = document.createElement('p');
//   const temperamentFat = document.createElement('b');
//   temperamentFat.textContent = 'Temperament: ';
//   temperamentParagraph.appendChild(temperamentFat)

//   // Create a <span> element for the temperament text
//   const temperamentSpan = document.createElement('span');
//   temperamentSpan.textContent = temperament
//   temperamentParagraph.appendChild(temperamentSpan); // Append the <span> to the <p>

//   // Append the created elements to the .cat-info container
//   catInfo.appendChild(header);
//   catInfo.appendChild(descriptionParagraph);
//   catInfo.appendChild(temperamentParagraph);
// }

function updateDescription(name, description, temperament) {
  const header = catInfo.querySelector('h2');
  header.textContent = name;
  
  const spanElements = document.querySelectorAll('span');
  spanElements[0].textContent = description;
  spanElements[1].textContent = temperament;
}

// Function to fetch and populate cat breeds
export async function fetchBreeds() {
  try {
    const response = await axios.get("https://api.thecatapi.com/v1/breeds");
    const breeds = response.data;

    breeds.forEach((breed) => {
      const option = document.createElement("option");
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });

    hideLoader();
  } catch (error) {
    displayError();
  }
}

// Function to fetch and display cat information by breed ID
export async function fetchCatByBreed(breedId) {
  try {
    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
    );

    const catData = response.data[0].breeds[0];
    const imageData = await axios.get(
      `https://api.thecatapi.com/v1/images/${catData.reference_image_id}`
    );
    // Remove the existing image if it exists
    const existingImage = document.querySelector('img');
    if (existingImage) {
      existingImage.remove();
    }
    let image = document.createElement('img');
    image.style.width = "100%"
    image.style.height = "auto"
    image.src = `${imageData.data.url}`;
    updateDescription(catData.name, catData.description, catData.temperament)
    document.body.appendChild(image);

    hideLoader();
    showInfo();
  } catch (error) {
    console.log(error)
    displayError();
  }
}

function showInfo() {
  catInfo.style.display = 'block'
}

function hideLoader() {
  loader.style.display = 'none';
}

function displayError() {
  loader.style.display = 'none';
  errorElement.style.display = 'block';
}

// Event listener to handle breed selection change
breedSelect.addEventListener("change", (event) => {
  const breedId = event.target.value;
  loader.style.display = 'block';
  catInfo.style.display = 'none';
  errorElement.style.display = 'none';
  console.log("done")
  
  fetchCatByBreed(breedId);
});

// Initial fetch of cat breeds
fetchBreeds();
