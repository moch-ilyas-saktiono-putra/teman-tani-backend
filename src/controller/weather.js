const { PrismaClient } = require("@prisma/client");
const { getImageType } = require("@tensorflow/tfjs-node/dist/image");
const prisma = new PrismaClient();
require("dotenv").config();
const geoip = require("geoip-lite");
const axios = require('axios')

const apiKey = process.env.WEATHER_KEY;

const getLocation = async (req, res) => {
  const ipAddress =
    req.headers["cf-connecting-ip"] ||
    req.headers["x-real-ip"] ||
    req.headers["x-forwarded-for"] ||
    req.socket.remoteAddress;
  const geoData = geoip.lookup(ipAddress);

  if (!geoData) {
    return res.status(404).json({
      message: "Location data not found",
    });
  }

  const locationData = {
    city: geoData.city,
    region: geoData.region,
    country: geoData.country,
  };

  const city = locationData.city;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  try {
    const response = await axios.get(url);
    const dataCuaca = response.data;

    const cuaca = {
      suhu: dataCuaca.main.temp,
      deskripsi: dataCuaca.weather[0].description,
      kelembapan: dataCuaca.main.humidity,
      angin: dataCuaca.wind.speed,
    };
    return res.json(cuaca);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Terjadi kesalahan saat mengambil data cuaca");
  }
};

module.exports = {
  getLocation,
};
