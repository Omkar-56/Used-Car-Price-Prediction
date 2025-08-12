const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { spawn } = require("child_process");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/get_model_names", (req, res) => {
    fs.readFile("./artifacts/columns.json", "utf8", (err, data) => {

        if (err) {
            return res.status(500).json({ error: "Error reading JSON file" });
        }

        const jsonData = JSON.parse(data);
        const models = jsonData.data_columns.slice(7);
        res.json({models});
    });
});

app.post("/predict_car_price", (req, res) => {
    const { model,make_year,engine_capacity, km_driven, price, owners, fuel_type_encoded, transmission_encoded } = req.body;

    const pythonProcess = spawn("python", ["predict.py", model,make_year,engine_capacity, km_driven, price, owners, fuel_type_encoded, transmission_encoded]);

    pythonProcess.stdout.on("data", (data) => {
        if (!res.headersSent) {  
            res.json({ estimated_price: data.toString().trim() });
        }
    });
    
    pythonProcess.stderr.on("data", (data) => {
        console.error(`Python Error: ${data.toString()}`);
        if (!res.headersSent) {  
            res.status(500).json({ error: data.toString() });
        }
    });
    
    pythonProcess.on("close", (code) => {
        if (code !== 0 && !res.headersSent) {
            res.status(500).json({ error: "Python script exited with an error" });
        }
    });
    
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
