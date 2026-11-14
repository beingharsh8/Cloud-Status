const dotenv = require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express()
const port = 3000

app.use(cors());
app.use(express.static('public'));
app.use(express.json());



app.get('/weather', async (req, res) => {
  console.log("pahuch gyi req");
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${req.query.city}&appid=${process.env.Weather_API}&units=metric`

  const response = await fetch(URL, { method: "GET" })
  console.log(req.query.city);

  const data = await response.json();
  // console.log(url);
  console.log(data);
  res.json(data);

  // const send =res.json(data);


})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})