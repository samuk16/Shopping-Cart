import { useState, useEffect } from "react";
import { workerCode } from "@/lib/imageWorker";
import { RGB } from "@/lib/types";

const workerBlob = new Blob([workerCode], { type: "application/javascript" });
const workerUrl = URL.createObjectURL(workerBlob);

export function useImageColor(imageUrl: string) {
  const [dominantColor, setDominantColor] = useState<RGB | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!imageUrl) return;

    setIsProcessing(true);
    setError(null);

    const worker = new Worker(workerUrl);
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageUrl;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);

      if (!imageData) {
        setError("Failed to get image data");
        setIsProcessing(false);
        worker.terminate();
        return;
      }

      worker.onmessage = (e) => {
        const color = e.data;
        localStorage.setItem(
          `dominantColor:${imageUrl}`,
          JSON.stringify(color),
        );
        setDominantColor(color);
        setIsProcessing(false);
        worker.terminate();
      };

      worker.onerror = (e) => {
        setError("Worker error: " + e.message);
        setIsProcessing(false);
        worker.terminate();
      };

      worker.postMessage(imageData.data);
    };

    img.onerror = () => {
      setError(`Failed to load image: ${imageUrl}`);
      setIsProcessing(false);
    };

    return () => {
      worker.terminate();
    };
  }, [imageUrl]);

  return { dominantColor, isProcessing, error };
}
