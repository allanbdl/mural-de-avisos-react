require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001
const path = require('path')
const mogoose = require('mongoose')
const cookieParser = require("cookie-parser")
const fun = require('./functions')


mogoose.connect(process.env.URL_MONGO, (err, db) => {
    if (err) console.log(err)
    else (console.log(db.name))
})

app.use('/', express.json(), express.urlencoded())
app.use(cookieParser())
app.use('/api', fun.verifyLog)

app.get('/api/in',(req,res)=>res.send(['ok']))
app.get(`/api/all`, fun.all)
app.get(`/api/delete/:id`, fun.delete)
app.get('/api/alluser', fun.allUser)
app.get('/api/deleteuser/:id', fun.deleteUser)
app.get('/api/logout', fun.logout)
app.get('/api/admin', fun.admin)

app.post(`/api/new`,fun.new)
app.post(`/api/edit/:id`, fun.edit)
app.post(`/api/register`,fun.registerPost)

app.post(`/login`, fun.loginPost)


if (process.env.NODE_ENV != 'dev') {
    app.use(express.static(path.join(__dirname, 'client/build')))
    app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'client/build/index.html')))
}

app.listen(PORT, ()=>console.log('Server Running Port',PORT))