const async = require('async') 
const { default: axios } = require('axios')

const queue = async.queue(async ({pis, apiKey}, callback) => {
    const query = "SELECT FROM 'RAIS'.'CONSULTA'"
    await axios.get(`https://irql.icheques.com.br/?q=${query}&pis=${pis}&apiKey=${apiKey}&json=true`)
    callback()
}, 5)

const consultarRaisQueue = {
    handle: ((task) => {
        queue.push(task)
    })
}

module.exports = consultarRaisQueue