const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser= require('body-parser')
const dotenv = require('dotenv')
dotenv.config()
const port = process.env.PORT || 3000



app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/assets', express.static('assets'));


// log user
const loginMhs = require('./router/login/loginMhs')
app.use('/', loginMhs)

const loginDos = require('./router/login/loginDos')
app.use('/', loginDos)

// show schedule
const jadwal = require('./router/jadwal/jadwal')
app.use('/', jadwal)

// user
const users = require('./router/users/getUser')
app.use('/', users)

const pass = require('./router/login/changePass')
app.use('/', pass)

//search
const search = require('./router/search/search')
app.use('/', search)

// ruangan
const ruangan = require('./router/ruangan')
app.use('/', ruangan)

// forget password
const forget = require('./router/forgetPass')
app.use('/', forget)

// get mk
const mk = require('./router/getadmin')
app.use('/', mk)

app.listen(port, () => {
    console.log(`App listening at ${process.env.BASE_URL}:${port}`)
})

