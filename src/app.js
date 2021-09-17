const express = require('express')
const consultarRaisQueue = require('./services/consultarRaisQueue')

const app = express()

app.use(express.json())

app.post('/', async (req, res) => {
    consultarRaisQueue.handle(req.body)

    res.status(200).json({message: 'success'})
})

app.listen(3009, () => {
    console.log('Running at: http://localhost:3000')
})