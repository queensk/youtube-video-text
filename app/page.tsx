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
  const { register, handleSubmit,  formState: { errors }, } = useForm<FormData>();

  const [data, setData] = useState<ResponseData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post<ResponseData>("/api/text", data);
      setData(response.data);
      setError(null);
    } catch (err) {
      setError((err as { message: string })?.message);
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
