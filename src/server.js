const express = require('express')
const app = express()
const port = 3000
const weatherRouters = require('./routes/weathers')

app.use('/weathers', weatherRouters)

app.listen(3000,() => {
    console.log(`Server running on localhost:${port}`)
})