"use client"

import React, { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "components/ui/button";
import { Input } from "components/ui/input";
import { Alert, AlertTitle } from "components/ui/alert";
import copy from "copy-to-clipboard";
import { cn, convertToMarkdown } from "lib/utils";
import {
  AlertCircle,
  Check,
  Copy,
  RefreshCw,
} from "lucide-react";

export default function Home() {
  const [text, setText] = useState("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();
  const [faq, setFaq] = React.useState<string[][]>([]);
  const [hasCopy, setHasCopy] = React.useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted text:", text);
    try {
      setLoading(true);
      setError("");
      setFaq([]);
      const response = await fetch("http://127.0.0.1:5000/api/generate-faq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });
      if (!response.ok) {
        throw new Error(
          "An error occurred while fetching FAQs. Please check the URLs and try again.",
        );
      }

      const json: {
        faq: string[][];
        error?: string;
      } = await response.json();
      if (json.error) {
        throw new Error(json.error);
      }

      setFaq(json.faq);
    } catch (e: any) {
      console.error("Error:", e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const onReset = () => {
    setError("");
    setFaq([]);
  };


  const handleCopyToClipboard = () => {
    const markdown = convertToMarkdown(faq);
    copy(markdown);
    setHasCopy(true);
    setTimeout(() => {
      setHasCopy(false);
    }, 1000);
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
    <main className="py-10 px-4 md:px-6 max-w-screen-md mx-auto">
      {/* Header */}
      <header>
        <h1 className="text-3xl font-semibold md:text-4xl">FAQ Generator</h1>
        <p className="mt-2">
        The FAQ Generator uses GROQ's models to create FAQs from text
        </p>
      </header>
  
      {/* Form */}
      <form
        className="mt-10 bg-zinc-50 dark:bg-zinc-900 p-4 rounded-xl"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col w-full h-full">
          <textarea
            className="text-base px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 resize-none w-full text-black overflow-y-auto"
            value={text}
            onChange={handleChange}
            placeholder="Enter text..."
            required
            style={{ minHeight: "150px", height: "auto" }} // Dynamic height based on content
            rows={5}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mt-4"
          >
            Submit
          </button>
        </div>
      </form>
  
      {/* Error message */}
      {error && (
        <div className="mt-10">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{error}</AlertTitle>
          </Alert>
        </div>
      )}
  
      {/* FAQ results */}
      {faq.length > 0 && (
        <div className="mt-10">
          {/* Buttons */}
          <div className="flex items-center gap-2">
            <Button
              className={cn(
                "gap-2 transition-colors",
                hasCopy && "!bg-emerald-500 !text-white",
              )}
              onClick={handleCopyToClipboard}
            >
              {hasCopy ? (
                <Check className="size-4" />
              ) : (
                <Copy className="size-4" />
              )}
              Copy to Clipboard
            </Button>
  
            <Button className="gap-2" onClick={onReset} variant="secondary">
              <RefreshCw className="size-4" />
              Regenerate
            </Button>
          </div>
  
          {/* FAQ items */}
          <div className="mt-10 space-y-6">
            {faq.map(([q, a]) => (
              <article key={q} className="">
                <h2 className="text-base md:text-lg font-semibold">{q}</h2>
                <p className="mt-2 opacity-80">{a}</p>
              </article>
            ))}
          </div>
        </div>
      )}
    </main>
  
    {/* Footer */}
    <footer className="border-t text-center border-t-zinc-100 py-6 mt-auto" style={{ width: '100%' }}>
      <p className="mt-6 text-gray-600 dark:text-gray-400">
        © 2024, Apurv Sonawane
      </p>
      <p className="mt-6">
        <a
          href="https://github.com/Apurv428/faq-generator"
          target="_blank"
          className="inline-flex hover:bg-transparent text-inherit hover:text-emerald-500"
        >
          <svg
            height="24"
            width="24"
            aria-hidden="true"
            viewBox="0 0 16 16"
            version="1.1"
            fill="currentColor"
          >
            <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
          </svg>
        </a>
      </p>
    </footer>
  </div>  
  );
}
