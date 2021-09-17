const express = require('express')
const morgan = require('morgan')
const logger = require('./providers/logger')
const consultarRaisQueue = require('./services/consultarRaisQueue')

const app = express()

app.use(express.json())

const stream = {
    // Use the http severity
    write: (message) => logger.http(message),
}

app.use(
    morgan(
        function(tokens, req, res) {
            return [
                tokens.date(req,res,'clf'),
                tokens.method(req, res),
                tokens.url(req, res),
                tokens.status(req, res),
                tokens.res(req, res, "content-length"),
                "-",
                tokens["response-time"](req, res),
                "ms",
                JSON.stringify(req.body),
            ].join(" ");
        }, 
        { stream }
    )
)

app.post('/', async (req, res) => {
    consultarRaisQueue.handle(req.body)

    res.status(200).json({message: 'success'})
})

app.listen(3009, () => {
    console.log('Running at: http://localhost:3000')
})