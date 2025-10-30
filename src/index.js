// Imports your SCSS stylesheet
import './styles/index.scss';
console.log('Application started version 2.0');

//we have already imported the car dataset in JSON format. You can now use the carData variable to access the dataset and implement the used car finder functionality.
/*
When the user interacts with the application, you can filter the carData based on the user's input criteria (year, make, model, etc.) and display the results accordingly.
Upon loading the application, the user sould be notified that they have to select a year before the make and model options become available. We are using the car-dataset.json file to get the data for the used car finder and splice accordingly based on the options that are available. 
*/
//1. ensure that the form sections are disabled until the year is selected.
//2. once the year is selected, enable the make dropdown and populate it with the makes available for that year.
//3. once the make is selected, enable the model dropdown and populate it with the models available for that year and make.
//4. finally, when the model is selected, display the relevant car details to the user.

//1. retrieve the car-dataset.json file and parse it to get the car data.
import carData from './car-dataset/car-dataset.json';

//2. get references to the dropdown elements in the HTML.
const yearDropdown = document.getElementById('year-dropdown');
const makeDropdown = document.getElementById('make-dropdown');
const modelDropdown = document.getElementById('model-dropdown');
const confirmBtn = document.getElementById('confirm-btn');

//3. populate the year dropdown with unique values from the car data.
const uniqueYears = [...new Set(carData.map(car => car.year))].sort((a, b) => b - a);
uniqueYears.forEach(year => {
  const option = document.createElement('option');
  option.value = year;
  option.textContent = year;
  yearDropdown.appendChild(option);
});
//4. Based on the selected year, populate the make dropdown with unique makes available for that year.(inside the .json file, make is represented by the "manufacturer" key)
yearDropdown.addEventListener('change', () => {
  const selectedYear = parseInt(yearDropdown.value);
  makeDropdown.innerHTML = '<option value="">Vehicle Make</option>'; // Reset make dropdown
  modelDropdown.innerHTML = '<option value="">Vehicle Model</option>'; // Reset model dropdown
  modelDropdown.disabled = true; // Disable model dropdown

  if (selectedYear) {
    const filteredMakes = carData
      .filter(car => car.year === selectedYear)
      .map(car => car.Manufacturer);
    const uniqueMakes = [...new Set(filteredMakes)].sort();

    uniqueMakes.forEach(make => {
      const option = document.createElement('option');
      option.value = make;
      option.textContent = make;
      makeDropdown.appendChild(option);
    });

    makeDropdown.disabled = false; // Enable make dropdown
  } else {
    makeDropdown.disabled = true; // Disable make dropdown if no year is selected
    modelDropdown.disabled = true; // Disable model dropdown
  }
});
//5. Based on the selected make, populate the model dropdown with unique models available for that year and make.(inside the .json file, model is represented by the "model" key)
makeDropdown.addEventListener('change', () => {
  const selectedYear = parseInt(yearDropdown.value);
  const selectedMake = makeDropdown.value;
  modelDropdown.innerHTML = '<option value="">Vehicle Model</option>'; // Reset model dropdown

  if (selectedMake) {
    const filteredModels = carData
      .filter(car => car.year === selectedYear && car.Manufacturer === selectedMake)
      .map(car => car.model);
    const uniqueModels = [...new Set(filteredModels)].sort();

    uniqueModels.forEach(model => {
      const option = document.createElement('option');
      option.value = model;
      option.textContent = model;
      modelDropdown.appendChild(option);
    });

    modelDropdown.disabled = false; // Enable model dropdown
  } else {
    modelDropdown.disabled = true; // Disable model dropdown if no make is selected
  }
});
//6. When the user confirms their selection, display a button that the user can click to see the car details based on their selections.The button is hidden until all three selections are made.
modelDropdown.addEventListener('change', () => {
  if (modelDropdown.value) {
    confirmBtn.style.display = 'block'; // Show confirm button
  } else {
    confirmBtn.style.display = 'none'; // Hide confirm button
  }
});
//7. When the user clicks the confirm button, display the relevant car details inside the console ONLY ONCE.
confirmBtn.addEventListener('click', () => {
  const selectedYear = parseInt(yearDropdown.value);
  const selectedMake = makeDropdown.value;
  const selectedModel = modelDropdown.value;

  const selectedCar = carData.find(car =>
    car.year === selectedYear &&
    car.Manufacturer === selectedMake &&
    car.model === selectedModel
  );
  console.clear();
    if (selectedCar) {
    console.log('Selected Car Details:');
    console.log(selectedCar);
    }
});



