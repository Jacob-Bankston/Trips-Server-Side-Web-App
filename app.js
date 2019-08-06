const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
const PORT = 3000
const Trip = require('./models/trips')

app.use(express.urlencoded())
app.use(express.static('styles'))

app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')

trips = []

// Main Page
app.get('/', (req,res) => {
    res.render('index', {trips: trips})
})

app.post('/add-trip',(req,res) => {
    let title = req.body.title
    let image = req.body.image
    let departureDate = req.body.departureDate
    let returnDate = req.body.returnDate
    let trip = new Trip(title, image, departureDate, returnDate)

    trips.push(trip)

    console.log(trip)
    console.log(trip.title)
    console.log(trip.image)
    console.log(trip.departureDate)
    console.log(trip.returnDate)
    res.redirect('/')

})

app.post('/delete-trip', (req,res) => {
    let tripName = req.body.tripName
    trips = trips.filter(trip => {
        trip.name != tripName
    })

    res.redirect('/')

})

app.listen(PORT, () => {
    console.log("Server is running...")
})