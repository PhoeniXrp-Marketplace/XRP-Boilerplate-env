import { useState } from "react";

const MessageForm = () => {
    const [publicKey, setPublicKey] = useState('');
    const [message, setMessage] = useState('');
    const [signature, setSignature] = useState('');

    const handlePublicKeyChange = (e) => {
        setPublicKey(e.target.value);
    }

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setSignature('Sample Signature');
  };

  return (
    <div>
      <h2>Register your XRP Public Key</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="publicKey">Public Key:</label>
          <input
            type="text"
            id="publicKey"
            value={publicKey}
            onChange={handlePublicKeyChange}
          />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <input
            type="text"
            id="message"
            value={message}
            onChange={handleMessageChange}
          />
        </div>
        <div>
          <button type="submit">Connect Wallet</button>
        </div>
      </form>
      {signature && (
        <div>
          <h3>Signature:</h3>
          <p>{signature}</p>
        </div>
      )}
    </div>
  );
};

export default MessageForm;



