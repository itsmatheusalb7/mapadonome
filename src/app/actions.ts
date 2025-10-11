'use server';

import { generatePersonalizedSummary } from '@/ai/flows/personalized-vsl-summary';
import type { PersonalizedSummaryInput } from '@/ai/flows/personalized-vsl-summary';

export async function getPersonalizedSummaryAction(input: PersonalizedSummaryInput): Promise<string> {
  try {
    // Ensure day and month are not empty strings before calling the AI model
    if (!input.birthDay || !input.birthMonth) {
      throw new Error("Birth day and month are required.");
    }
    const result = await generatePersonalizedSummary(input);
    return result.summary;
  } catch (error) {
    console.error('Error generating personalized summary:', error);
    // Return a fallback summary in case of an error
    return `Olá ${input.firstName}, sua jornada está prestes a começar. Com base nos seus dados, preparamos uma leitura especial que irá revelar insights sobre seu caminho. Prepare-se para descobertas incríveis.`;
  }
}
