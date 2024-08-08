import React, { useState } from 'react'

export const QrCode = () => {
const [img,setimg] = useState("");
const [loading, setloading] = useState("");
const [qrCode, setqrCode] = useState("https://www.youtube.com/");
const [qrSize,setqrSize] = useState("150");

const handleChangeCode = (e) => {
  setqrCode(e.target.value);
}

const handleChangeSize = (e) => {
  setqrSize(e.target.value);
}


async function generateQR() {
  setloading(true);
  try {
    const url =`https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}*${qrSize}&data=${encodeURIComponent(qrCode)}`;
  setimg(url);
    
  } catch(error) {
     console.error("Error generating QR Code ", error);
  } finally {
     setloading(false)
  }
}


function downloadQR() {
  fetch(img).then((response) => response.blob()).then((blob) => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "qrcode.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }).catch((error) => {
    console.error("Error downloading QR code ",error);
  })

}



  return (
    <div className='app-container'>
    <h1>QR CODE GENERATOR</h1>
    {loading && <p>Please wait...</p>}
    {img && <img src={img} className='qr-code-img' /> }
     
      <div>
        <label htmlFor='dataInput'  className='input-label'>
          Data for Qr code :
        </label>
        <input type='text' value={qrCode} id='dataInput' placeholder='Enter Data for Qr code' onChange={handleChangeCode} />

        <label  htmlFor='sizeInput' className='input-label'>
          Image Size (e.g . 150) :
        </label>
        <input type='text' value={qrSize} onChange={handleChangeSize} id='dataInput' placeholder='Enter Image Size' />


        <button className='generate-btn' disabled={loading} onClick={generateQR}>Generate QR Code</button>
        <button className='download-btn' onClick={downloadQR} >Download QR Code</button>

      </div>
      <p className='footer'>
        Designed by <a href='https://www.youtube.com/'>Youtube</a>
    </p>

    </div>

      )
}
