const express = require('express')
const cors = require('cors')
const pool = require('./db')
const app = express()
require('dotenv').config();

// middleware
app.use(cors())
app.use(express.json())

// ROUTES

// create a to do
app.post('/create', async (req, res) => {
    try {

        const { description } = req.body
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [description])
        res.json(newTodo.rows[0])

    } catch (error) {
        console.log(error.message);
    }
})

// get all to do
app.get('/getAll', async (req, res) => {
    try {

        const allTodos = await pool.query("SELECT * FROM todo")
        res.json(allTodos.rows)

    } catch (error) {
        console.log(error.message);
    }
})

// get a to do
app.get('/todo/:id', async (req, res) => {
    try {

        const { id } = req.params
        const allTodos = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id])
        res.status(allTodos.rows[0])

    } catch (error) {
        console.log(error.message);
    }
})

// update a to do
app.put('/update/:id', async (req, res) => {
    try {

        const { id } = req.params
        const { description } = req.body
        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING *",
            [description, id]
        )
        res.json(updateTodo.rows[0])

    } catch (error) {
        console.log(error.message);
    }
})

// delete a to do
app.delete('/delete/:id', async (req, res) => {
    try {

        const { id } = req.params
        await pool.query("DELETE FROM todo WHERE todo_id = $1", [id])
        res.json('Todo was deleted')

    } catch (error) {
        console.log(error.message);
    }
})

// delete all to do
app.delete('/deleteAll', async (req, res) => {
    try {

        const allTodos = await pool.query("DELETE FROM todo")
        res.json('All todos were deleted')

    } catch (error) {
        console.log(error.message);
    }
})


const port = process.env.PORT
app.listen(port, () => {
    console.log(`Servidor arriba en puerto ${port}`);
})