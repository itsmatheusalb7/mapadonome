'use server';

/**
 * @fileOverview Generates a personalized VSL summary based on user input.
 *
 * - generatePersonalizedSummary - A function that generates a personalized summary for the VSL.
 * - PersonalizedSummaryInput - The input type for the generatePersonalizedSummary function.
 * - PersonalizedSummaryOutput - The return type for the generatePersonalizedSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedSummaryInputSchema = z.object({
  firstName: z.string().describe('The user\'s first name.'),
  birthMonth: z.string().describe('The user\'s birth month.'),
  birthDay: z.string().describe('The user\'s birth day.'),
});
export type PersonalizedSummaryInput = z.infer<typeof PersonalizedSummaryInputSchema>;

const PersonalizedSummaryOutputSchema = z.object({
  summary: z.string().describe('The personalized summary for the VSL.'),
});
export type PersonalizedSummaryOutput = z.infer<typeof PersonalizedSummaryOutputSchema>;

export async function generatePersonalizedSummary(input: PersonalizedSummaryInput): Promise<PersonalizedSummaryOutput> {
  return personalizedSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedSummaryPrompt',
  input: {schema: PersonalizedSummaryInputSchema},
  output: {schema: PersonalizedSummaryOutputSchema},
  prompt: `You are an AI assistant designed to create personalized summaries for video sales letters (VSLs).

  Based on the user's name, birth month, and birth day, generate a short, engaging summary that introduces the VSL.

  Name: {{{firstName}}}
  Birth Month: {{{birthMonth}}}
  Birth Day: {{{birthDay}}}

  Summary:`,
});

const personalizedSummaryFlow = ai.defineFlow(
  {
    name: 'personalizedSummaryFlow',
    inputSchema: PersonalizedSummaryInputSchema,
    outputSchema: PersonalizedSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
