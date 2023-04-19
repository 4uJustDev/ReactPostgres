const Pool = require('pg').Pool

const pool = new Pool({
  host: 'localhost',
  user: 'my_user',
  database: 'my_database',
  password: 'root',
  port: 5000,
});

const getMerchants = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM merchants ORDER BY id ASC', (err, result) => {
      if (err) {
        reject(err)
      }
      resolve(result.rows);
    })
  }) 
}

const createMerchant = (body) => {
  return new Promise(function(resolve, reject) {
    const { name, email } = body

    pool.query('INSERT INTO merchants (name, email) VALUES ($1, $2) RETURNING *', [name, email], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`A new merchant has been added: ${JSON.stringify(results.rows[0])}`)
    })
  })
}

const deleteMerchant = (merchantId) => {
  return new Promise(function(resolve, reject) {
    const id = parseInt(merchantId)

    pool.query('DELETE FROM merchants WHERE id = $1', [id], (error, results) => {
      if (error) {
        reject('error on pool query')
      }
      resolve(`Merchant deleted with ID: ${id}`)
    })
  })
}

module.exports = {
  getMerchants,
  createMerchant,
  deleteMerchant
}