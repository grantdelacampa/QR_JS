/* eslint-disable */
import './App.css';
import React, { useRef, useState } from 'react';
import { QR } from './Component/QR';

function App() {
  const [text, setText] = useState('');
  const canvasDiv = useRef();

  const handleClick = (e) => {
    e.preventDefault();
  };
  return (
    <div className="App">
      <header className="App-header">
        <QR size={500}/>
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
