import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_API_KEY } from '../config/config';

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export async function run(data: string) {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  const prompt =
    'O dado arquivo base64 que é disponibilizado corresponde a uma conta de ÁGUA ou GÁS. Qual o valor correspondente dessa conta? Responda no seguinte formato: { “image_url”: data:image/jpeg;base64,{arquivo em base64}, “measure_value”: valor da conta, em formato de número, “measure_uuid”: um id único, em formato de string }';
  const imageData = data;

  const image = {
    inlineData: {
      data: imageData,
      mimeType: 'image/jpeg'
    }
  };

  const generatedContent = await model.generateContent([prompt, image]);

  return generatedContent.response.text();
}
