const express = require('express');
const router = express.Router();
const Todo = require('../db/models/ToDo');
const aeh = require('../middleware/asyncErrorHandler');


//*****  Create Todo     ******//
router.post('/add', aeh(async function (req, res) {
  try {
    const { name, description } = req.body
    if (!name || !description) {
      return res.status(403).error("Please add necessary fields")
    }
    let data = await Todo.create({ name, description })
    return res.status(200).json({
      success: true,
      data: data
    })
  }
  catch (error) {
    console.log(error)
    throw error
  }
}));

//*****  Update Todo     ******//
router.post('/update', aeh(async function (req, res) {
  try {
    let { id, name, description, status } = req.body
    if (!id || !name || !status || !description) {
      return res.status(403).error("Please pass all details")
    }
    let DataExists = await Todo.find({ _id: id })
    if (!DataExists || DataExists.length == 0) {
      return res.status(403).error("Todo do not exists!")
    }
    await Todo.updateOne({ _id: id }, { name, status, description })
    return res.status(200).json({
      success: true,
      data: 'Updated Successfully'
    })
  }
  catch (error) {
    console.log(error)
    throw error
  }
}));

//*****  Update Status     ******//
router.post('/updateStatus', aeh(async function (req, res) {
  try {
    let { id, status } = req.body
    if (!id) {
      return res.status(403).error("Please pass Id")
    }
    let DataExists = await Todo.find({ _id: id })
    if (!DataExists || DataExists.length == 0) {
      return res.status(403).error("Todo do not exists!")
    }
      let update = await Todo.updateOne({ _id: id }, { status })
      return res.status(200).json({
        success: true,
        data: 'Updated Successfully'
      })
  }
  catch (error) {
    console.log(error)
    throw error
  }
}));

//*****  delete Todo     ******//
router.post('/delete/:id', aeh(async function (req, res) {
  try {
    const { id } = req.params
    if (!id) {
      return res.status(403).error("please pass id")
    }
    let dataExists = await Todo.find({ _id: id })
    if (!dataExists || dataExists.length == 0) {
      return res.status(403).error("Todo do not exists!")
    }
    await Todo.deleteOne({ _id: id })
    return res.status(200).json({
      success: true,
      data: 'deleted Successfully'
    })
  }
  catch (error) {
    console.log(error)
    throw error
  }
}));

//*****      Todo by id     ******//
router.get('/id/:todoId', aeh(async function (req, res) {
  try {
    const { todoId } = req.params
    if (!todoId) {
      return res.status(403).error("Please pass id")
    }
    let data = await Todo.find({ _id: todoId }).sort({ createdAt: -1 })
    return res.status(200).json({
      success: true,
      data: data[0]
    })
  }
  catch (error) {
    console.log(error)
    throw error
  }
}));

//*****      List all Todos     ******//
router.get('/list/:status', aeh(async function (req, res) {
  try {
    const { status } = req.params
    let TodoData = await Todo.find({ status: status })
    return res.status(200).json({
      success: true,
      data: TodoData
    })
  }
  catch (error) {
    console.log(error)
    throw error
  }
}));

module.exports = router;