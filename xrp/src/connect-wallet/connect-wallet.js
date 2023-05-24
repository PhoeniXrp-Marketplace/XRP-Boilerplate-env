import { Client, Wallet, dropsToXrp, isValidClassicAddress, xrpToDrops } from 'xrpl';

import getWalletDetails from '../helpers/get-wallet-details';
// import renderXrplLogo from '../helpers/render-xrpl-logo';

// renderXrplLogo();

// Get references to the DOM elements
const connectWalletButton = document.getElementById('connect_wallet_button');
const walletAddressElement = document.querySelector('.wallet_address');
const walletBalanceElement = document.querySelector('.wallet_balance');
const walletReserveElement = document.querySelector('.wallet_reserve');
const walletXAddressElement = document.querySelector('.wallet_xaddress');

// Add event listener to the "Connect Wallet" button
connectWalletButton.addEventListener('click', async () => {
  try {
    // Call the getWalletDetails function and pass the necessary parameters
    const walletDetails = await getWalletDetails({ client }); // Adjust the parameters based on your setup

    // Update the DOM elements with the retrieved wallet details
    walletAddressElement.textContent = `Wallet Address: ${walletDetails.address}`;
    walletBalanceElement.textContent = `Wallet Balance: ${walletDetails.account_data.Balance}`;
    walletReserveElement.textContent = `Wallet Reserve: ${walletDetails.accountReserves}`;
    walletXAddressElement.textContent = `X-Address: ${walletDetails.xAddress}`;

    // You can also perform additional actions or render additional elements as needed
  } catch (error) {
    console.log('Error connecting wallet', error);
  }
});

