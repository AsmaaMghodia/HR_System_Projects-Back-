const mongoose = require('mongoose');
const express = require('express');
const Joi = require('joi');
const projects = require('./models/project');
app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.json());

mongoose.connect('mongodb://localhost/HR-System', { useNewUrlParser: true })
    .then(() => console.log('connected to db successfully'))
    .catch((err) => console.log(err));


projects.insertMany([{
    name: 'Nooon',
    projectRate: "good",
    notes: "online shooping",
    employees: ['ahmed', 'soha'],

}, ])

app.get('/getProjects', async(req, res) => {
    console.log("get");
    const result = await projects.find();
    res.send(result);
})



app.post('/createProject', async(req, res) => {
    console.log("post")
    const result = await projects.create(req.body);
    console.log("post");
    res.send("added successfully ");
})


app.delete('/deleteProject/:name', async(req, res) => {
    try {
        const result = await projects.find({ name: req.params.name });
        if (result.length > 0) {
            const deletedEmployee = await projects.deleteMany({ name: result[0].name })
            res.send(`${deletedEmployee.deletedCount} projects have the same name have been deleted`);

        } else {
            res.send('This project is not exist');

        }

    } catch (error) {
        console.log(error.message)
    }
})

app.put('/changeProjects/:name', async(req, res) => {
    try {
        console.log("put")
        const fresult = await projects.find({ name: req.params.name });
        if (fresult.length > 0) {
            const result = await projects.findOneAndUpdate(req.params.name, {
                name: req.body.name,
                projectRate: req.body.projectRate,
                notes: req.body.notes,
                employees: req.body.employees
            }, {
                new: true
            });
            res.send("changed data successfully");

        } else {
            res.send('This project is not exist');

        }

    } catch (error) {
        console.log(error.message)
    }
})

app.listen(4000, () => console.log('listining for requests...'))
