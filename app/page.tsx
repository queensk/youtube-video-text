"use client"
import { useForm } from "react-hook-form";
import axios from "axios";
import React, { useState } from "react";
import Typewriter from "typewriter-effect";

type FormData = {
  url: string;
};

type ResponseData = {
  text: string;
};

export default function Home() {
  const { register, handleSubmit, errors } = useForm<FormData>();

  const [data, setData] = useState<ResponseData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // define a function to handle the form submission
  const onSubmit = async (data: FormData) => {
    try {
      // make a POST request to the /api/text route with the input URL as JSON data
      const response = await axios.post<ResponseData>("/api/text", data);
      // set the response data to the state
      setData(response.data);
      // clear any previous error
      setError(null);
    } catch (err) {
      // handle any error and set it to the state
      setError(err?.message);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between " >
      <div className="p-24 items-center">
        <h1 className="p-2 items-center  text-lg  items-center">Enter a YouTube URL</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className="p-2 items-center rounded-md border-2 decoration-slate-400 border-2 border-solid and border-black"
            type="url"
            // name="url"
            {...register("url", { required: "Please enter a valid URL" })}
            placeholder="https://www.youtube.com/watch?v=video_id"
          />
          {errors?.url?.message && <p>{errors.url.message}</p>}
          <button className="m-2 rounded-md p-2 items-center bg-indigo-500/100 text-white
          " type="submit">Submit</button>
        </form>
        {error && <p>Something went wrong</p>}
        {data && (
          <div>
            <h2>Transcript</h2>
            <p>{data.text}</p>
          </div>
        )}
        {!data && (
          <Typewriter
            options={{
              strings: ['Transcribe youtube video', 'Simple as possible'],
              autoStart: true,
              loop: true,
            }}
          />
        )}
      </div>
    </main>
  );
}
