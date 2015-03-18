
var FAUCET_URL = 'http://testnet.helloblock.io/v1/faucet/withdrawal'
var request = require('request')
var querystring = require('querystring')
var concat = require('concat-stream')

function withdraw(address, amount, callback) {
  var data = querystring.stringify({
    toAddress: address,
    value: amount
  })

  var req = request.post(FAUCET_URL, {
    body: data,
    json: true,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': data.length
    }
  }, function(err, resp, body) {
    if (err) return callback(err)

    var txId = reverse(new Buffer(body.data.txHash, 'hex')).toString('hex')
    callback(null, {
      id: txId
    })
  })
}

function reverse (buf) {
  var rev = new Buffer(buf)
  Array.prototype.reverse.call(rev)
  return rev
}

module.exports = {
  withdraw: withdraw
}
