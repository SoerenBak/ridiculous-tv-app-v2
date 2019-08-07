module.exports = (Programs) => {
    
    let express = require('express');
    let router = express.Router();
    var mongoose = require('mongoose')

    var Schema = mongoose.Schema;

    var CategorySchema = new Schema({
        title: String,
    })

    var Category = mongoose.model('Category', CategorySchema)

    var ChannelSchema = new Schema({
        channel: String
    })

    var Channel = mongoose.model('Channel', ChannelSchema)

    var ProgramSchema = new Schema({
        title: String,
        description: String,
        category: String,
        channel: String,
        schedule: String,
        poster: String
    })

    var Program = mongoose.model("Program", ProgramSchema)
    var Programs = []

    router.post("/newProgram", (req, res) => {
        var newProgram = new Program(req.body)
        newProgram.save(function (err, newProgram) {
            if (err) {
                console.log(err)
            }
            res.json(201, newProgram)
            console.log("Program has been added", newProgram)
        })
    })

    router.get("/", (req, res) => {
        Program.find({}, (err, programs) => {
            if(err) {console.log(err)}
            res.send(programs)
        })
    })

    router.post("/newCategory", (req, res) => {
        var newCategory = new Category(req.body)
        newCategory.save(function (err, newCategory) {
            if(err) {
                return console.log(err)
            }
            res.json(201, newCategory)
            console.log("Category added", newCategory)
        })
    })

    router.get("/categories", (req, res) => {
        Category.find({}, (err, categories) => {
            if (err){
                console.log(err)
            }
            res.send(categories)
        })
    })

    router.post("/newChannel", (req, res) => {
        var newChannel = new Channel(req.body)
        newChannel.save(function (err, newChannel) {
            if (err) {
                return console.log(err)
            }
            res.json(201, newChannel)
            console.log("Channel has been added", newChannel)
        })
    })
  
    router.get("/channels", (req, res) => {
        Channel.find({}, (err, channels) => {
            if (err){
                console.log(err)
            }
            res.send(channels)
        })
    })

    router.delete('/:id', (req, res) => {
        Program.findById(req.params.id)
            .then(program => program.remove().then(() => res.json({ sucess: true})))
            .catch(err => res.status(404).json({ succes:false}))
    })

    return router;
};