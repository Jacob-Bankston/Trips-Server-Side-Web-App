const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
const PORT = 3000
const Trip = require('./models/trips')

app.use(express.urlencoded())
app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')

trips = []

// Main Page
app.get('/', (req,res) => {
    res.render('index', trips)
})

app.post('/add-trip',(req,res) => {
    let title = req.body.title
    let image = req.body.image
    let departureDate = req.body.departureDate
    let returnDate = req.body.returnDate
    let trip = new Trip(title, image, departureDate, returnDate)

    trips.push(trip)

    res.redirect('/')

})

app.listen(PORT, () => {
    console.log("Server is running...")
})