document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const priceDiv = document.getElementById('price');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const data ={
            sqft_living15: Number(document.getElementById('sqft_living').value),
            sqft_above: Number(document.getElementById('sqft_above').value),
            sqft_lot15: Number(document.getElementById('sqft_lot').value),
            sqft_basement: Number(document.getElementById('sqft_basement').value),
            lat: Number(document.getElementById('lat').value),
            long: Number(document.getElementById('long').value),
            grade: Number(document.getElementById('grade').value),
            condition: Number(document.getElementById('condition').value),
            yr_built: Number(document.getElementById('yr_built').value),
            bathrooms: Number(document.getElementById('bathrooms').value),
            bedrooms: Number(document.getElementById('bedrooms').value),
            floors: Number(document.getElementById('floors').value),
            view: Number(document.getElementById('view').value),
            waterfront: Number(document.getElementById('waterfront').value),
            renovated: Number(document.getElementById('renovated').value)
        };

        fetch('http://localhost:5000/predict', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)  
        })
        .then(response => response.json())
        .then(result => {
            priceDiv.innerHTML = `<h3>Predicted Price: $${result.predicted_price.toLocaleString()}</h3>`;
        })
        .catch(error => {
            priceDiv.innerHTML = `<span style="color:red;">Error: ${error}</span>`;
        });
    });
});

