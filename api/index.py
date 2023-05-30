from fastapi import FastAPI
from pydantic import BaseModel
import requests
from youtube_transcript_api import YouTubeTranscriptApi

app = FastAPI()

@app.get("/api/python")
def hello_world():
    return {"message": "Hello World"}

class Video(BaseModel):
    url: str

@app.post("/api/text")
def get_video_id(video: Video):
    """
    assuming the url is in the format https://www.youtube.com/watch?v=video_id
    """
    video_id = video.url.split('=')[-1]
    transcript = YouTubeTranscriptApi.get_transcript(video_id)
    text = ""
    for item in transcript:
        text += item['text'] + " "
    
    return {"text": text}
