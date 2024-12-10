const express = require('express')
const Routes = express.Router()

const FetchData = require('./FetchData/FetchData')
const Video = require('./Video/Video')
const Audio = require('./Audio/Audio')



Routes.get('/', (req, res) => {
    res.status(200).json({
        message: 'API is running',
        status: 200,
        data: null
    })
})

Routes.use('/fetchdata', FetchData)
Routes.use('/video',Video)
Routes.use('/audio',Audio)


module.exports = Routes