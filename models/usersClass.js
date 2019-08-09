const uuid = require('uuid/v1')

class User {
    constructor(username, password) {
        this.username = username
        this.password = password
        this.userId = uuid()
    }
}

module.exports = User