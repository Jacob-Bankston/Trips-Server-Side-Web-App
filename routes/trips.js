const express = require('express')
const router = express.Router()

const Trip = require('../models/tripsClass')
const tripUuid = require('uuid/v1')

router.get('/', (req,res) => {
    res.render('index', {trips: trips})
})

router.post('/add-trip',(req,res) => {
    let title = req.body.title
    let image = req.body.image
    let departureDate = req.body.departureDate
    let returnDate = req.body.returnDate
    let tripId = tripUuid()
    let trip = new Trip(title, image, departureDate, returnDate, tripId)
    
    trips.push(trip)
    
    res.redirect('/trips')
})

router.post('/delete-trip', (req,res) => {
    let tripTitle = req.body.tripTitle
    trips = trips.filter(trip => {
        return trip.title != tripTitle
    })
    res.redirect('/trips')
})

module.exports = router