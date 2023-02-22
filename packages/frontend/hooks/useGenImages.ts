import axios from "axios";
import { useState, useEffect } from "react";

export const useGenImages = (
  prompt: string,
  n: number = 1,
  size: string = "512x512"
) => {
  const [images, setImages] = useState<string[]>([]);
  console.count("useGenImages");

  useEffect(() => {
    const fetchImages = async () => {
      if (prompt === "") {
        return;
      }

      const genImages = await axios({
        method: "post",
        url: "/api/gen-images",
        data: {
          prompt: prompt,
          n: n,
          size: size,
          response_format: "url",
        },
      });

      setImages(genImages.data);
    };

    fetchImages();
  }, [prompt, n, size]);

  return images;
};
