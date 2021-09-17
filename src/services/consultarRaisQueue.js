const async = require('async') 
const { default: axios } = require('axios')

const queue = async.queue(async ({pis, apiKey}, callback) => {
    const query = "SELECT FROM 'RAIS'.'CONSULTA'"
    await axios.get(`https://irql.icheques.com.br/?q=${query}&pis=${pis}&apiKey=${apiKey}&json=true`).then(
        sucess => console.log(`Sucesso: PIS ${pis} para apiKey ${apiKey}`)
    ).catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error(error.response.data);
          console.error(error.response.status);
          console.error(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.error(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error', error.message);
        }
        console.error(error.config);
      });
    callback()
}, 5)

const consultarRaisQueue = {
    handle: ((task) => {
        queue.push(task)
    })
}

module.exports = consultarRaisQueue