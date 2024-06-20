// Form submission and validation
document.getElementById('pricePredictorForm').addEventListener('submit', function (event) {
    var location = document.getElementById('location');
    var bhk = document.getElementById('bhk');
    var bathroom = document.getElementById('bathroom');
    var sqft = document.getElementById('sqft');
    var isValid = true;

    // Validate location
    if (!location.value) {
        document.getElementById('location-error').innerText = 'Enter a value for this field.';
        isValid = false;
    } else {
        document.getElementById('location-error').innerText = '';
    }

    // Validate BHK
    if (!bhk.value) {
        document.getElementById('bhk-error').innerText = 'Enter a value for this field.';
        isValid = false;
    } else {
        document.getElementById('bhk-error').innerText = '';
    }

    // Validate Bathroom
    if (!bathroom.value) {
        document.getElementById('bathroom-error').innerText = 'Enter a value for this field.';
        isValid = false;
    } else {
        document.getElementById('bathroom-error').innerText = '';
    }

    // Validate Sqft
    if (!sqft.value) {
        document.getElementById('sqft-error').innerText = 'Enter a value for this field.';
        isValid = false;
    } else {
        document.getElementById('sqft-error').innerText = '';
    }

    if (!isValid) {
        event.preventDefault(); // Prevent form submission if validation fails
    }
});