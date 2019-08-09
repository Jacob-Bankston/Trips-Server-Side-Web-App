const express = require('express')
const router = express.Router()

const Trip = require('../models/tripsClass')
const uuid = require('uuid/v1')

const session = require('express-session')

router.use(session({
    secret: 'this isnt very secretive when posted to github',
    resave: false,
    saveUninitialized: true,
}))

router.get('/', (req,res) => {
    let newTrips = trips.filter(trip => {
        return trip.userId == req.session.userId
    })

    res.render('index', {trips: newTrips})
})

router.post('/add-trip', (req,res) => {
    let title = req.body.title
    let image = req.body.image
    let departureDate = req.body.departureDate
    let returnDate = req.body.returnDate
    let userId = req.session.userId
    let tripId = uuid()
    let trip = new Trip(title, image, departureDate, returnDate, userId, tripId)
    
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

router.get('/chat', (req,res) => {
    res.sendFile(__dirname + '/trips-chat.mustache')
})

module.exports = router