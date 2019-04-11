const weatherForm = document.querySelector('form');
let locationInput = weatherForm[0];
const searchButton = weatherForm[1];
const clearButton = weatherForm[2];
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');

locationInput.value = '';
searchButton.disabled = true;

locationInput.addEventListener('keyup', (e) => {
    clearResults();
    if (locationInput.value.trim().length > 0) {
        searchButton.disabled = false;
    } else {
        searchButton.disabled = true;
    }
});

clearButton.addEventListener('click', (e) => {
    e.preventDefault();
    clearResults();
    locationInput.value = '';
    searchButton.disabled = true;
});

clearResults = () => {
    message1.textContent = '';
    message2.textContent = '';
    message1.classList = '';
    message2.classList = '';
}

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchLocation = locationInput.value.trim();
    clearResults();

    if (searchLocation) {
        fetch(`/weather?address=${searchLocation}`).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    message1.classList.add('error');
                    message1.textContent = data.error;
                } else {
                    message1.classList.add('location');
                    message1.textContent = data.location;
                    message2.classList.add('forecast')
                    message2.textContent = data.forecast;
                }
            });
        }, (reject) => {

        });
    } else {
        message1.classList.add('error');
        message1.textContent = 'Please input something!';
    }
});