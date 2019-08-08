const express = require('express')
const mustacheExpress = require('mustache-express')
const app = express()
const path = require('path')
const User = require('./models/usersClass')
const session = require('express-session')
const PORT = 3000

app.use(session({
    secret: 'this isnt very secretive when posted to github',
    resave: false,
    saveUninitialized: true,
}))

app.all('/trips/*', authenticate)
app.all('/trips', authenticate)

app.use(express.json())
app.use(express.urlencoded())
app.use(express.static('styles'))

const VIEWS_PATH = path.join(__dirname,'/views')

app.engine('mustache',mustacheExpress(VIEWS_PATH + '/partials','.mustache'))
app.set('views', VIEWS_PATH)
app.set('view engine', 'mustache')

global.users = []
global.trips = []

const tripsRouter = require('./routes/trips')
app.use('/trips', tripsRouter)

function authenticate(req,res,next) {
    if(req.session) {
        if(req.session.username) {
            next()
        } else {
            res.redirect('/')
        }
    } else {
        res.redirect('/')
    }
}

app.get('/', (req,res) => {
    res.render('login')
})

app.post('/login', (req,res) => {
    let username = req.body.username
    let password = req.body.password

    let persistedUser = users.find(user => {
        return user.username == username && user.password == password
    })

    if(persistedUser) {
        if(req.session) {
            req.session.username = persistedUser.username
            res.redirect('/trips')
        }
    } else {
        res.render('login', {message: 'Invalid username or password'})
    }  
})

app.get('/register', (req,res) => {
    res.render('register')
})

app.post('/register',(req,res) => {
    let username = req.body.username
    let password = req.body.password
    let user = new User(username, password)

    users.push(user)

    res.redirect('/')
})

app.get('/logout', (req,res) => {
    if(req.session) {
        req.session.destroy(error => {
            if(error) {
                next(error)
            } else {
                res.redirect('/')
            }
        })
    }
})

app.listen(PORT, () => {
    console.log("Server is running...")
})