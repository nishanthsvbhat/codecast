// src/ai/flows/summarize-procedure.ts
'use server';

/**
 * @fileOverview A flow to summarize incident response procedures based on the emergency code type.
 *
 * - summarizeProcedure - A function that handles the summarization process.
 * - SummarizeProcedureInput - The input type for the summarizeProcedure function.
 * - SummarizeProcedureOutput - The return type for the summarizeProcedure function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeProcedureInputSchema = z.object({
  codeType: z
    .string()
    .describe('The type of emergency code (e.g., Code Red, Code Blue).'),
});
export type SummarizeProcedureInput = z.infer<typeof SummarizeProcedureInputSchema>;

const SummarizeProcedureOutputSchema = z.object({
  summary: z
    .string()
    .describe('A summary of the incident response procedures for the given code type.'),
});
export type SummarizeProcedureOutput = z.infer<typeof SummarizeProcedureOutputSchema>;

export async function summarizeProcedure(input: SummarizeProcedureInput): Promise<SummarizeProcedureOutput> {
  return summarizeProcedureFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeProcedurePrompt',
  input: {schema: SummarizeProcedureInputSchema},
  output: {schema: SummarizeProcedureOutputSchema},
  prompt: `You are a medical expert who provides summaries of incident response procedures based on the emergency code type.

  Provide a concise summary of the procedures for the following code type:

  Code Type: {{{codeType}}}
  `,
});

const summarizeProcedureFlow = ai.defineFlow(
  {
    name: 'summarizeProcedureFlow',
    inputSchema: SummarizeProcedureInputSchema,
    outputSchema: SummarizeProcedureOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
