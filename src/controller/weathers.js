const getAllWeathers = (req, res) => {
  res.json({
    condition: "sunny",
  });
};

const createWeather = (req, res) => {
  res.send("create wesather succes");
};

module.exports = {
    getAllWeathers, createWeather
}

// Geolocation

// Weather