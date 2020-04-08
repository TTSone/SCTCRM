// Allows us to use ES6 in our migrations and tests.
require('babel-register')

module.exports = {
  networks: {
    stt: {
      host: 'localhost',
      port: 8545,
      gas: 800000000, //愿意为本次部署最多支付多少gas
      network_id: '*' // Match any network id
    }
  }
}
