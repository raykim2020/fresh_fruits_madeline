////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express");
const Fruit = require("../models/fruit");

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router();

/////////////////////////////////////////
// Routes
/////////////////////////////////////////


router.get('/seed', (req, res) => {
    const startFruits = [
        { name: "Orange", color: "orange", readyToEat: false },
        { name: "Grape", color: "purple", readyToEat: false },
        { name: "Banana", color: "orange", readyToEat: false },
        { name: "Strawberry", color: "red", readyToEat: false },
        { name: "Coconut", color: "brown", readyToEat: false },
    ]

    //Delete all fruits
    Fruit.deleteMany({}).then((data) => {
        Fruit.create(startFruits).then((data) => {
            res.json(data);
        })
    }).catch((err) => {
        res.status(400).send(err)
    })
})

//Index

router.get("/", (req, res) => {
    Fruit.find({})

        .then((fruits) => {
            res.render("fruits/Index", { fruits });
        })
        .catch((error) => {
            res.status(400).json({ error })
        })
})

//New
router.get('/new', (req, res) => {
    res.render('fruits/New')
})
//Delete
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    Fruit.findByIdAndDelete(id)
        .then(() => {
            res.redirect('/fruits')
        })
        .catch((error) => {
            res.status(400), json({ error })
        })
})
//Update
router.put('/:id', (req, res) => {
    const { id } = req.params;
    req.body.readyToEat = req.body.readyToEat === 'on' ? true : false;

    Fruit.findByIdAndUpdate(id, req.body, { new: true })
        .then(() => {
            res.redirect(`/fruits/${id}`)
        })
        .catch((error) => {
            res.status(400).json({ error })
        })
})
//Create
router.post('/', (req, res) => {
    req.body.readyToEat = req.body.readyToEat === 'on' ? true : false
    Fruit.create(req.body)
        .then((createdFruit) => {
            res.redirect(`/fruits/${createdFruit._id}`)
        })
        .catch((error) => {
            res.status(400).json({ error })
        })
})
//Edit
router.get('/:id/edit', (req, res) => {
    const { id } = req.params
    Fruit.findById(id)
        .then((fruit) => {
            res.render('fruits/Edit', { fruit })
        })
        .catch((error) => {
            res.status(400).json({ error })
        })
})


// Show

router.get('/:id', (req, res) => {
    const { id } = req.params

    Fruit.findById(id)
        .then((fruit) => {
            res.render('fruits/Show', { fruit })

        })
        .catch((error) => {
            res.status(400).json({ error })
        })
})

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router;