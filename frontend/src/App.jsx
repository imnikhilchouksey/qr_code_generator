import React from 'react'
import { useState } from 'react'

const API_BASE = "http://localhost:8000"

const App = () => {

  const [link,setLink] = useState("");
  const [qrSrc,setQrSrc] = useState("");
  const [currentText,setCurrentText] = useState("");

  const generateQR = async ()=>{
    if (!link.trim()) return ; 
    const url = new URL(`${API_BASE}/api/qr`);
    url.searchParams.set("text",link); 

    const res = await fetch(url); 
    const data = await res.json(); 

    setQrSrc(data.png); 
    setCurrentText(data.text);
  }

  return (
    <div className='min-h-screen flex flex-col items-center justify-center p-2'>
        <nav className='h-[10dvh] flex flex-row fixed  font-bold text-2xl justify-center  w-full row items-center top-0 p-2 text-zinc-700 mb-4'>QuickQR</nav>
        <input
          type="text"
          placeholder="Enter link here..."
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="md:w-[80dvh] w-full border rounded-lg px-4 py-2 m-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-black "
        />

        <button
          onClick={generateQR}
          className="md:w-[80dvh] w-full active:scale-95 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition"
        >
          Generate QR
        </button>

        {qrSrc ? (
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-2">
              Generated for: <span className="font-medium">{currentText}</span>
            </p>
            <div className="inline-block border rounded-xl p-4 bg-gray-100">
              <img src={qrSrc} alt="QR Code" className="w-52 h-52" />
            </div>
          </div>
        ) : (
          <p className="text-gray-500 mt-6 text-center">
            Enter a link and click "Generate QR"
          </p>
        )}
    </div>
  )
}

export default App

