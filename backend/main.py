from fastapi import FastAPI , Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import qrcode 
import base64,io

app = FastAPI()

app.add_middleware(
  CORSMiddleware, 
  allow_origins = ["http://localhost:3000", "http://localhost:5173"], 
  allow_credentials = True , 
  allow_headers = ["*"], 
  allow_methods = ["*"], 
)

def make_qr_png_bytes(data:str)->bytes: 
  qr = qrcode.QRCode(
    version=None, 
    error_correction= qrcode.constants.ERROR_CORRECT_M, 
    box_size=10 , 
    border = 4
  )
  
  qr.add_data(data)
  qr.make(fit=True)
  img = qr.make_image(fill_color = "black", back_color = "white")
  

  buf = io.BytesIO()
  img.save(buf,format="PNG")
  buf.seek(0)
  return buf.read()


@app.get('/api/qr')
def qr_code(text: str = Query(..., description="The link or text to encode")):
  png_bytes = make_qr_png_bytes(text)
  b64 = base64.b64encode(png_bytes).decode("utf-8")
  data_url = f"data:image/png;base64,{b64}"
  return JSONResponse({"text": text, "png": data_url})