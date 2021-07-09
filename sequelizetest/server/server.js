const express = require('express');
const app= express();

const sequelize = require('./models').sequelize;
const bodyParser = require('body-parser');

sequelize.sync();

app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const{ Cstmr, Sample1, Sample2, Sequelize: {Op} } = require('./models');

sequelize.query('SET NAMES utf8;');

app.post('/add/data', (req,res) => {
    console.log(req.body);

    Sample1.create({
        name : req.body.name,
        email : req.body.email
    })
    .then (result =>{
        res.send(result)
    })
    .catch( err => {
        console.log(err)
        throw err;
    })
})

app.get('/get/data/cstmr', (req,res) => {
    Cstmr.findAll()
    .then(result => {res.send(result)})
    .catch(err => {throw err})
})

app.get('/get/data/sample1', (req,res) => {
    Sample1.findAll()
    .then(result => {res.send(result)})
    .catch(err => {throw err})
})

app.get('/get/data/sample2', (req,res) => {
    Sample2.findAll()
    .then(result => {res.send(result)})
    .catch(err => {throw err})
})

app.post('/get/keywordData', (req,res) => {
    Sample1.findAll({
        where: {[Op.or]: [{name: req.body.name}, {email : req.body.email}]}
    })
    .then (result => {res.send(result)})
    .catch(err => {throw err})
})

app.post('/modify/data', (req, res) => {
    Sample1.update({name: req.body.modify.newName}, {
        where : {id:req.body.modify.id}
    })
    .then (result => {res. send(result)})
    .catch(err => {throw err})
})

app.post('/modify/multiData', (req, res) => {
    Sample1.update({name: req.body.modify.newName}, {
        where : {[Op.or]: [{id: req.body.modify.targetId}, {name : req.body.modify.targetName}]}
    })
    .then(result => {res.send(result)})
    .catch(err => {throw err})
})

app.post('/delete/data', (req, res) => {
    Sample1.destroy({
        where: {id: req.body.delete.id}
    })
    .then(res.sendStatus(200))
    .catch(err => {throw err})
})

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`);
})