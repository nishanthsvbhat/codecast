'use server';
import { summarizeProcedure } from '@/ai/flows/summarize-procedure';
export async function getProcedureSummary(codeType) {
    try {
        const result = await summarizeProcedure({ codeType });
        return { success: true, summary: result.summary };
    }
    catch (error) {
        console.error('Error summarizing procedure:', error);
        return { success: false, error: 'Failed to generate procedure summary.' };
    }
}
