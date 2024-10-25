const express = require("express");
// const path = require("path");
const axios = require("axios");
require("dotenv").config();

const app = express();

// Serve static files from the React frontend
// app.use(express.static(path.join(__dirname, "../client/dist")));

// API routes
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from the server!" });
});

// All other requests serve the frontend
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
// });

app.get("/api/recipes", async (req, res) => {
  // console.log(req.query);

  const params = {
    from: req.query.from ?? 0,
    to: req.query.to ?? 10,
    q: req.query.term,
    ...(req.query.selectedCuisineTypes && {
      cuisineType: req.query.selectedCuisineTypes,
    }),
    ...(req.query.selectedMealTypes && {
      mealType: req.query.selectedMealTypes,
    }),
    app_id: process.env.EDAMAM_APP_ID,
    app_key: process.env.EDAMAM_APP_KEY,
  };

  const queryParams = objectToParams(params);
  const url = `https://api.edamam.com/search?${queryParams}`; // Old API version allows "from" and "to" params
  //   const url = `https://api.edamam.com/api/recipes/v2?${queryParams}`;
  // console.log(url);

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching recipes" });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

function objectToParams(obj) {
  const params = new URLSearchParams();

  for (const key in obj) {
    if (Array.isArray(obj[key])) {
      obj[key].forEach((value) => {
        params.append(key, value);
      });
    } else {
      params.append(key, obj[key]);
    }
  }

  return params.toString();
}

module.exports = app;
