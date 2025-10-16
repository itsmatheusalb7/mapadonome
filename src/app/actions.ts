'use server';

import { generatePersonalizedSummary } from '@/ai/flows/personalized-vsl-summary';
import type { PersonalizedSummaryInput } from '@/ai/flows/personalized-vsl-summary';

export async function getPersonalizedSummaryAction(input: PersonalizedSummaryInput): Promise<string> {
  try {
    // Ensure day and month are not empty strings before calling the AI model
    if (!input.birthDay || !input.birthMonth) {
      throw new Error("O dia e o mês de nascimento são obrigatórios.");
    }
    const result = await generatePersonalizedSummary(input);
    return result.summary;
  } catch (error) {
    console.error('Erro ao gerar o resumo personalizado:', error);
    // Return a fallback summary in case of an error
    return `Olá ${input.firstName}, sua jornada está prestes a começar. Com base em seus dados, preparamos uma leitura especial que revelará insights sobre seu caminho. Prepare-se para descobertas incríveis.`;
  }
}
