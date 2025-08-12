document.addEventListener("DOMContentLoaded", () => {
    const modelDropdown = document.getElementById("model"); 
    const form = document.getElementById("predictionForm");
    const result = document.getElementById("result");

    fetch("http://localhost:5000/get_model_names")
        .then(response => response.json())
        .then(data => {
            data.models.forEach(model => {
                let option = document.createElement("option");
                option.value = model;
                option.textContent = model;
                modelDropdown.appendChild(option);
            });
        })
        .catch(error => console.error("Error fetching models:", error));

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const requestData = {
            model: modelDropdown.value,
            make_year: parseFloat(document.getElementById("make_year").value),
            engine_capacity: parseFloat(document.getElementById("engine_capacity").value),
            km_driven: parseFloat(document.getElementById("km_driven").value),
            price: parseInt(document.getElementById("price").value),
            owners: parseInt(document.getElementById("owners").value),
            fuel_type_encoded: parseInt(document.getElementById("fuel_type").value),
            transmission_encoded: parseInt(document.getElementById("transmission").value),
        };

        fetch("http://localhost:5000/predict_car_price", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestData),
        })
        .then(response => response.json())
        .then(data => {
            if (data.estimated_price) {
                result.textContent = `Estimated Price: ₹${data.estimated_price}`;
            } else {
                result.textContent = "Error predicting price. Try again!";
            }
        })
        .catch(error => {
            console.error("Error predicting price:", error);
            result.textContent = "Server error. Please try again later.";
        });
    });
});
