// Write a fetchBreeds() function that executes an HTTP request and returns a proxy with an array of breeds as the result of the request. Put it in the cat-api.js file and make a named export.
import axios from 'axios';
const apiKey =
  'live_G8G6TSAUebk57bIcPs5F6EKP3ZidTJytRenPTOuKBT0TXhBVbqlnxvLN7Wpp9ebG';
axios.defaults.headers.common['x-api-key'] = apiKey;
const API_URL = 'https://api.thecatapi.com/v1/';

export async function fetchBreeds() {
  console.log('HEEOOEJ');
  const response = await axios.get(API_URL + 'breeds');
  console.log(response);
  const breeds = response.data;
  console.log(breeds);
  return breeds;
}

export async function fetchCatByBreed(breedId) {
  const response = await axios.get(
    API_URL + `images/search?breed_ids=${breedId}`
  );

  const catData = response.data[0].breeds[0];
  const imageData = await axios.get(
    API_URL + `images/${catData.reference_image_id}`
  );
  return { catData, imageData };
}
