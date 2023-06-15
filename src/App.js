/* eslint-disable */
import './App.css';
import React, { useState } from 'react';
import { QR } from './Component/QR';

function App() {
  const [text, setText] = useState('');
  const [show, setShow] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setShow(false);
    setShow(true);
  };
  return (
    <div className="App">
      <header className="App-header">
        {show && <QR size={298} data={text} />}
        <input
          type="text"
          value={text}
          onInput={(e) => setText(e.target.value)}
        />
        <button type="button" onClick={handleClick}>
          Generate
        </button>
        <button
          type="button"
          onClick={() => {
            window.location.reload();
          }}
        >
          Clear
        </button>
      </header>
    </div>
  );
}

export default App;
