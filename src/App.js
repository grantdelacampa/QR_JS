/* eslint-disable */
import './App.css';
import React, { useRef, useState } from 'react';
import { QRCodeGenerator } from './Driver/QRCodeGenerator';

function App() {
  const [text, setText] = useState('');
  const [output, setOutput] = useState('');
  const canvas = useRef();

  // todo: set this dynamically
  const errorCorrection = 'M';
  const size = 200;

  function generate() {
    const finalMessage = QRCodeGenerator(text, errorCorrection);
    setOutput(finalMessage);
  }

  const handleClick = (e) => {
    e.preventDefault();
    generate(text);
  };
  return (
    <div className="App">
      <header className="App-header">
        <canvas height={size} width={size} ref={canvas}></canvas>
        <p style={{ wordBreak: 'break-all' }}>{output}</p>
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
            setText('HELLO WORLD');
          }}
        >
          HELLO WORLD
        </button>
        <button
          type="button"
          onClick={() => {
            setText('HELLO WORLDHELLO WORLDHELLO WORLD');
          }}
        >
          Version 2
        </button>
        <button
          type="button"
          onClick={() => {
            setText(
              'HELLO SSSS WORLD HELLO HELLO WORLDHELLO WORLDHELLO WORLDHELLO WORLDHELLO WORLDWORLDHELLO WORLDLLO HELLO WORLDHELLO WORLDHELLO WORLDHELLO WORLDHELLO WORLDWORLDHELLO WORLD'
            );
          }}
        >
          Version 7
        </button>
        <button
          type="button"
          onClick={() => {
            setText(
              'HELLO SSSS WORLDHELLO WORLD HELLO HELLO WORLDHELLO WORLDHELLO WORLDHELLO WORLDHELLO WORLDWORLDHELLO WORLDLLO HELLO WORLDHELLO WORLDHELLO WORLDHELLO WORLDHELLO WORLDWORLDHELLO WORLD'
            );
          }}
        >
          Version 8
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
