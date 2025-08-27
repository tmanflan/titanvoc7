# FastAPI backend for CodeFont MusicGen model
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from transformers import AutoTokenizer, AutoModelForTextToWaveform
import torch

app = FastAPI()

# Load model directly
try:
    tokenizer = AutoTokenizer.from_pretrained("facebook/musicgen-stereo-melody-large")
    model = AutoModelForTextToWaveform.from_pretrained("facebook/musicgen-stereo-melody-large")
except Exception as e:
    print(f"Model loading failed: {e}")
    tokenizer = None
    model = None

class TextInput(BaseModel):
    text: str

@app.post("/generate")
def generate_waveform(input: TextInput):
    if tokenizer is None or model is None:
        raise HTTPException(status_code=500, detail="Model not loaded.")
    try:
        inputs = tokenizer(input.text, return_tensors="pt")
        with torch.no_grad():
            output = model.generate(**inputs)
        # For demonstration, just return the shape of the output tensor
        return {"output_shape": str(output.shape)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
