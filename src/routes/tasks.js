const express = require('express');
const router = express.Router();

const tasks = require('../models/tasks-schema');

router.get('/', async (req, res) => {
    const task = await tasks.find();
    res.json(task);
})

router.get('/:id', async (req, res) => {
    const task = await tasks.findById(req.params.id)
    res.json(task);
})

router.post('/', async (req, res) => {
    const taskpost = new tasks(req.body);
    await taskpost.save();
    console.log(taskpost);
    res.json('recibido');
})

router.put('/:id', async (req, res) => {
    await tasks.findByIdAndUpdate(req.params.id, req.body)
    res.json('recibido')
})

router.delete('/:id', async (req, res) => {
    await tasks.findByIdAndDelete(req.params.id, req.body)
    res.json('recibido')
})

module.exports = router;