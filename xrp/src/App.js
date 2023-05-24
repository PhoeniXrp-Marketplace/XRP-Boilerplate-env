import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import getWalletDetails from './helpers/get-wallet-details';
import { Client, dropsToXrp, rippleTimeToISOTime } from 'xrpl';
// import addXrplLogo from './src/helpers/render-xrpl-logo.js';
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

const xrpl = require('xrpl');

// async function main() {
const client = new xrpl.Client('wss://s.altnet.rippletest.net:51233');
//   await client.connect();

//   const response = await client.request({
//     command: "account_info",
//     account: "rPT1Sjq2YGrBMTttX4GZHjKu9dyfzbpAYe",
//     ledger_index: "validated",
//   });
//   console.log(response);

//   client.disconnect();
// }
// main();

// addXrplLogo();

// const client = new Client(process.env.CLIENT); // Get the client from the environment variables

// Get the elements from the DOM
const connectWalletButton = document.querySelector('#connect_wallet_button'); // TODO: Implement this logic
const walletElement = document.querySelector('#wallet');
const walletLoadingDiv = document.querySelector('#loading_wallet_details');
const ledgerLoadingDiv = document.querySelector('#loading_ledger_details');

// Connect to the wallet,
connectWalletButton.addEventListener('click', () => {
  window.location.pathname = '/src/assets/connect-wallet/connect-wallet.html';
});

// Self-invoking function to connect to the client
(async () => {
  try {
    await client.connect(); // Connect to the client

    // Subscribe to the ledger stream
    await client.request({
      command: 'subscribe',
      streams: ['ledger'],
    });

    // Fetch the wallet details
    getWalletDetails({ client })
      .then(({ account_data, accountReserves, xAddress, address }) => {
        console.log(account_data, 'account_data');
        walletElement.querySelector(
          '.wallet_address'
        ).textContent = `Wallet Address: ${account_data.Account}`;
        walletElement.querySelector(
          '.wallet_balance'
        ).textContent = `Wallet Balance: ${dropsToXrp(
          account_data.Balance
        )} XRP`;
        walletElement.querySelector(
          '.wallet_reserve'
        ).textContent = `Wallet Reserve: ${accountReserves} XRP`;
        walletElement.querySelector(
          '.wallet_xaddress'
        ).textContent = `X-Address: ${xAddress}`;

        // Redirect on View More link click
        walletElement
          .querySelector('#view_more_button')
          .addEventListener('click', () => {
            window.open(
              `https://${process.env.EXPLORER_NETWORK}.xrpl.org/accounts/${address}`,
              '_blank'
            );
          });
      })
      .finally(() => {
        walletLoadingDiv.style.display = 'none';
      });

    // Fetch the latest ledger details
    client.on('ledgerClosed', (ledger) => {
      ledgerLoadingDiv.style.display = 'none';
      const ledgerIndex = document.querySelector('#ledger_index');
      const ledgerHash = document.querySelector('#ledger_hash');
      const closeTime = document.querySelector('#close_time');
      ledgerIndex.textContent = `Ledger Index: ${ledger.ledger_index}`;
      ledgerHash.textContent = `Ledger Hash: ${ledger.ledger_hash}`;
      closeTime.textContent = `Close Time: ${rippleTimeToISOTime(
        ledger.ledger_time
      )}`;
    });
  } catch (error) {
    await client.disconnect();
    console.log(error);
  }
})();

function App() {
  const [showWallet, setShowWallet] = useState(false);
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Welcome to XRP Wallet!
        </a>
      </header>
    </div>
  );
}

export default App;
