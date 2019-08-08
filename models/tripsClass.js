class Trip {
    constructor(title, image, departureDate, returnDate, user, tripId) {
        this.title = title
        this.image = image
        this.departureDate = departureDate
        this.returnDate = returnDate
        this.user = user
        this.tripId = tripId
    }
}

module.exports = Trip