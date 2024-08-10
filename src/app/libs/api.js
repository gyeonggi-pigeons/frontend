import axios from 'axios';
import OpenAI from "openai";

const openai = new OpenAI();

export const analyzeImage = async (file)  => {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onloadend = async () => {
      const base64Image = reader.result?.toString().split(',')[1];

      try {
        const response = await axios.post(
          'https://api.openai.com/v1/chat/completions', 
          {
          model: "gpt-4-vision-preview",
            prompt: `This is an image of food: ${base64Image}. What food is it?`,
            max_tokens: 100,
          },
          {
            headers: {
              'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
              'Content-Type': 'application/json',
            },
          }
        );
        resolve(response.data.choices[0].text.trim());
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = () => {
      reject('Failed to read file.');
    };
    reader.readAsDataURL(file);
  });
};
