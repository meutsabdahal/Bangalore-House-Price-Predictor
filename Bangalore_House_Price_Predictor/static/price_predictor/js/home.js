// wait for the DOM to be fully loaded before attaching event listeners
document.addEventListener('DOMContentLoaded', function () {
    // get the form element by its ID
    const form = document.getElementById('pricePredictorForm');
    // attach an event listener to the form for the submit event
    form.addEventListener('submit', function (event) {
        // prevent the default form submission behavior
        event.preventDefault();
        // get the CSRF token from the hidden input field
        const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

        // get form field values
        const location = document.getElementById('location').value;
        const bhk = document.getElementById('bhk').value;
        const bathroom = document.getElementById('bathroom').value;
        const sqft = document.getElementById('sqft').value;

        // initialize a flag to track form validation
        let isValid = true;

        // clear previous error messages
        document.getElementById('location-error').textContent = '';
        document.getElementById('bhk-error').textContent = '';
        document.getElementById('bathroom-error').textContent = '';
        document.getElementById('sqft-error').textContent = '';

        // validate form fields
        if (!location) {
            // check if the location field is empty
            document.getElementById('location-error').textContent = 'Enter a value for this field.';
            isValid = false;
        }
        if (!bhk) {
            // check if the BHK field is empty
            document.getElementById('bhk-error').textContent = 'Enter a value for this field.';
            isValid = false;
        }
        if (!bathroom) {
            // check if the bathroom field is empty
            document.getElementById('bathroom-error').textContent = 'Enter a value for this field.';
            isValid = false;
        }
        if (!sqft) {
            // check if the square feet field is empty
            document.getElementById('sqft-error').textContent = 'Enter a value for this field.';
            isValid = false;
        }

        // if all form fields are valid, proceed with the fetch request
        if (isValid) {
            fetch('', {
                // set the request method to post
                method: 'POST',
                headers: {
                    // set the content type to json
                    'Content-Type': 'application/json',
                    // include the csrf token in the headers
                    'X-CSRFToken': csrftoken
                },
                // convert form data to JSON and include in the request body
                body: JSON.stringify({
                    location: location,
                    bhk: bhk,
                    bathroom: bathroom,
                    sqft: sqft
                })
            })
                // parse the response as json
                .then(response => response.json())
                // handle the response data
                .then(data => {
                    // display the predicted price
                    document.getElementById('predicted-price').textContent = data.prediction;
                    // show the result container
                    document.getElementById('result-container').style.display = 'block';
                })
                // log any errors to the console
                .catch(error => console.error('Error:', error));
        }
    });
});

