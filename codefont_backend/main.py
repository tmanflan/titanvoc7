# FastAPI backend for CodeFont MusicGen model

from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from pydantic import BaseModel
from transformers import AutoTokenizer, AutoModelForTextToWaveform
import torch
import os
import sys
sys.path.append(os.path.abspath("/workspaces/titanvoc7/DiffRhythm-full"))

import json

app = FastAPI()


# Load MusicGen model
try:
    tokenizer = AutoTokenizer.from_pretrained("facebook/musicgen-stereo-melody-large")
    model = AutoModelForTextToWaveform.from_pretrained("facebook/musicgen-stereo-melody-large")
except Exception as e:
    print(f"MusicGen model loading failed: {e}")
    tokenizer = None
    model = None

# Load DiffRhythm model (stub)
DIFFRHYTHM_PATH = "/workspaces/titanvoc7/DiffRhythm-full/cfm_model.pt"
DIFFRHYTHM_CONFIG = "/workspaces/titanvoc7/DiffRhythm-full/config.json"
def load_diffrhythm():
    # Replace with actual DiffRhythm loading code
    if os.path.exists(DIFFRHYTHM_PATH):
        return True
    return False

diffrhythm_loaded = load_diffrhythm()


class TextInput(BaseModel):
    text: str
    instruments: list = []


# MusicGen endpoint
@app.post("/generate")
def generate_waveform(input: TextInput):
    if tokenizer is None or model is None:
        raise HTTPException(status_code=500, detail="MusicGen model not loaded.")
    try:
        inputs = tokenizer(input.text, return_tensors="pt")
        with torch.no_grad():
            output = model.generate(**inputs)
        return {"output_shape": str(output.shape)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# DiffRhythm endpoint for instrument stems
@app.post("/generate-rhythm-stems")
def generate_rhythm_stems(
    text: str = Form(...),
    instruments: str = Form(...)
):
    if not diffrhythm_loaded:
        raise HTTPException(status_code=500, detail="DiffRhythm model not loaded.")
    try:
        # Parse instruments list from JSON string
        instrument_list = json.loads(instruments)
        # For each instrument, generate a separate stem (stub)
        stems = {}
        for inst in instrument_list:
            # Replace with actual DiffRhythm inference code
            stems[inst] = f"/path/to/generated/{inst}_stem.wav"
        return {"stems": stems, "message": "Instrument stems generated (stub)."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
