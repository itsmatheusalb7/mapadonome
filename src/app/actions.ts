'use server';

import { generatePersonalizedSummary } from '@/ai/flows/personalized-vsl-summary';
import type { PersonalizedSummaryInput } from '@/ai/flows/personalized-vsl-summary';

export async function getPersonalizedSummaryAction(input: PersonalizedSummaryInput): Promise<string> {
  try {
    // Ensure day and month are not empty strings before calling the AI model
    if (!input.birthDay || !input.birthMonth) {
      throw new Error("Le jour et le mois de naissance sont requis.");
    }
    const result = await generatePersonalizedSummary(input);
    return result.summary;
  } catch (error) {
    console.error('Erreur lors de la génération du résumé personnalisé :', error);
    // Return a fallback summary in case of an error
    return `Bonjour ${input.firstName}, votre voyage est sur le point de commencer. Sur la base de vos données, nous avons préparé une lecture spéciale qui révélera des aperçus de votre chemin. Préparez-vous à des découvertes incroyables.`;
  }
}
