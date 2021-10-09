const mogoose = require('mongoose')

const noticeSchema = new mogoose.Schema({
    title:{type:String, required:true},
    desc:{type:String, required:true},
    createdAt: {type: Date, default: Date.now}
})

module.exports = mogoose.model('Notice', noticeSchema)