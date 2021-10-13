const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('./models/User')
const Notice = require('./models/Notice')


module.exports.all = async (req, res) => {
    let notices = await Notice.find({})
    res.send(notices)
}

module.exports.new = async (req, res) => {
    let notice = new Notice(req.body)
    notice.save().then(d => console.log(d)).catch(e => console.log(e))
    res.redirect('/')
}

module.exports.delete = (req, res) => {
    Notice.findByIdAndDelete(req.params.id).then(res.redirect('/'))
}

module.exports.edit = (req, res) => {
    Notice.findByIdAndUpdate(req.params.id, req.body).then(res.redirect('/'))
}

module.exports.loginPost = (req, res) => {
    req.body.name = req.body.name.toLowerCase()
    User.findOne({ name: req.body.name }).then(doc => {
        if (!doc) res.send(['user name or incorrect'])
        else {
            let verify = bcrypt.compareSync(req.body.password, doc.password)
            if (!verify) res.send(['user name or incorrect'])
            else {
                const token = jwt.sign({ _id: doc._id, admin: doc.admin }, process.env.TOKEN_SECRET)
                res.cookie('secureCookie', JSON.stringify(token), { secure: true, httpOnly: true, maxAge: 31536000 })
                res.send(['ok'])
            }
        }
    })
}

module.exports.verifyLog = (req, res, next) => {
    try {
        const token = JSON.parse(req.cookies.secureCookie)
        req.user = jwt.verify(token, process.env.TOKEN_SECRET)
        next()
    } catch (error) {
        res.send(['user not logged'])
    }
}

module.exports.admin = async (req, res, next) => {
    try {
        const token = JSON.parse(req.cookies.secureCookie)
        req.user = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user.admin ? res.send(['admin']) : res.send(['notAdmin'])
    } catch (error) {
        res.send(['user not logged'])
    }
}

module.exports.logout = (req, res) => {
    res.cookie('secureCookie', '')
    res.redirect('/')
}

module.exports.allUser = async (req, res) => {
    let user = await User.find({ admin: false })
    res.send(user)
}

module.exports.deleteUser = (req, res) => {
    User.findByIdAndDelete(req.params.id).then(res.send(['ok']))
}

module.exports.registerPost = (req, res) => {
    req.body.name = req.body.name.toLowerCase()
    User.findOne({ name: req.body.name }).then(doc => {
        if (doc) res.send([`user already exists`])
        else {
            const user = new User({
                name: req.body.name,
                password: bcrypt.hashSync(req.body.password),
            })
            user.save().then(() => res.send(['ok']))
        }
    })
}
