import React from 'react'
import { useState } from 'react'

const API_BASE = "https://qr-code-generator-1-ytq6.onrender.com"

const App = () => {

  const [link, setLink] = useState("");
  const [qrSrc, setQrSrc] = useState("");
  const [currentText, setCurrentText] = useState("");
  const [loading, setLoading] = useState(false);

  const generateQR = async () => {

    setLoading(true);
    try{
      if (!link.trim()) return;
    const url = new URL(`${API_BASE}/api/qr`);
    url.searchParams.set("text", link);

    const res = await fetch(url);
    const data = await res.json();

    setQrSrc(data.png);
    setCurrentText(data.text);
    } catch(error){
      console.error(error); 
    } finally{
      setLoading(false);
    }
    
  }

  return (
    <div className='min-h-screen flex flex-col items-center justify-center p-2 bg-slate-900 pt-[12dvh] pb-[8dvh]'>
      <nav className='h-[10dvh] flex flex-row fixed  font-bold text-2xl justify-center  w-full row items-center top-0 p-2 text-fuchsia-50 mb-4 bg-slate-900' >QuickQR</nav>
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
        {loading ? "Generating..." : "Generate QR"}
      </button>

      {loading && (
        <div className="mt-4 flex items-center gap-2 text-blue-600">
          <svg
            className="animate-spin h-6 w-6 text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            ></path>
          </svg>
          Generating QR...
        </div>
      )}

      {qrSrc && (
        <div className="mt-8 text-center">
          <p className="text-gray-600 p-4 mb-2 break-words max-w-xs sm:max-w-md md:max-w-lg ">
            Generated for: <span className="font-medium break-words">{currentText}</span>
          </p>
          <div className="inline-block border rounded-xl p-4 bg-gray-100">
            <img src={qrSrc} alt="QR Code" className="w-52 h-52" />
          </div>
        </div>
      )}
      <footer className="h-[5dvh] flex items-center justify-center text-sm text-gray-600   fixed bottom-0 w-full bg-slate-900 ">
        © {new Date().getFullYear()} Developed by nikhil chouksey
      </footer>
    </div>
  )
}

export default App

