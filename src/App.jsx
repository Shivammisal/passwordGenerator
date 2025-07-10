import { useState, useCallback, useEffect } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');
  const [copyText, setCopyText] = useState("Copy");

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (numberAllowed) str += '0123456789';
    if (charAllowed) str += '!@#$%^&*()';

    for (let i = 1; i <= length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length));
    }

    setPassword(pass);
    setCopyText("Copy"); 
  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [passwordGenerator]);

  const copyPasswordToClipboard = () => {
    navigator.clipboard.writeText(password)
      .then(() => setCopyText("Copied!"))
      .catch(() => setCopyText("Failed"));
    
    setTimeout(() => {
      setCopyText("Copy");
    }, 2000);
  };

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-black bg-white'>
        <h1 className="text-center text-2xl font-bold my-3">Password Generator</h1>
        
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
            type='text'
            value={password}
            className='outline-none w-full py-1 px-3 border-1 '
            placeholder='password'
            readOnly
          />
          <button
            onClick={passwordGenerator}
            className='bg-blue-700 text-white px-3 py-0.5 shrink-0'
          >
            Generate
          </button>
          <button 
            onClick={copyPasswordToClipboard} 
            className='bg-pink-600 text-white px-3 py-0.5 shrink-0'
          >
            {copyText}
          </button>
        </div>

        <div className='flex items-center gap-x-1'>
          <input
            type='range'
            min={6}
            max={20}
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
          <label>Length: {length}</label>
        </div>

        <div className='flex items-center gap-x-1 mt-2'>
          <input
            type='checkbox'
            checked={numberAllowed}
            onChange={() => setNumberAllowed((prev) => !prev)}
          />
          <label>Include Numbers</label>
        </div>

        <div className='flex items-center gap-x-1 mt-2'>
          <input
            type='checkbox'
            checked={charAllowed}
            onChange={() => setCharAllowed((prev) => !prev)}
          />
          <label>Include Symbols</label>
        </div>
      </div>
    </>
  );
}

export default App;
