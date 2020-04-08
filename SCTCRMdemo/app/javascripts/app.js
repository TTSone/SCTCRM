import '../stylesheets/app.css'
import { default as Web3 } from 'web3'

var publisherContract = web3.eth.contract();
var publisher = publisherContract.at("")

var accounts
var account

window.App = {
  start: function () {
    var self = this
    web3.eth.getAccounts(function (err, accs) {
      if (err != null) {
        alert('There was an error fetching your accounts.')
        return
      }

      if (accs.length === 0) {
        alert('Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.')
        return
      }

      accounts = accs
      account = accounts[0]
      web3.eth.defaultAccount = account
      console.log(web3.eth.defaultAccount);
      console.log(web3.version)
    
    })
  },
  applyNewPublisher: function () {
    var self = this

    var producerName = document.getElementById('producerName').value
    var producerNDNPk = document.getElementById('producerNDNPk').value
    var producerAddress = document.getElementById('producerAddress').value
    var email = document.getElementById('email').value
    

    publisher.applyNewPublisher(producerName, producerNDNPk, email, producerAddress, (err, res) => {
      if (err) {
        console.log(err)
        $('.alert-success').css('display', 'none')
        $('.alert-danger').css('display', 'block')
      } else {
        console.log(producerName);
        console.log(producerNDNPk);
        console.log(email);
        console.log(producerAddress);
       
        $('.alert-danger').css('display', 'none')
        $('.alert-success').css('display', 'block')
      }
    })
  


  }
}

window.addEventListener('load', function () {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn('Using web3 detected from external source. If you find that your accounts don\'t appear or you have 0 MetaCoin, ensure you\'ve configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask')
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
    this.console.log(window.web3.version)
  } else {
    console.warn('No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live, as it\'s inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask');
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
  }

  App.start()
})
