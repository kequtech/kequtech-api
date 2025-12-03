import type { JsonSchema } from '@kequtech/json-valid';

export interface V1SummarizeTextParameters {
    text: string;
    context?: string;
}

export const V1_SUMMARIZE_TEXT_PARAMETERS: JsonSchema = {
    type: 'object',
    properties: {
        text: {
            type: 'string',
            description: 'Text content to summarize. (10-3000 characters).',
            minLength: 10,
            maxLength: 3000,
        },
        context: {
            type: 'string',
            description: 'Describe yourself or your company (max 400 characters).',
            maxLength: 400,
        },
    },
    required: ['text'],
    additionalProperties: false,
};

export const V1_SUMMARIZE_TEXT_EXAMPLE = {
    text: `Acme is preparing a new internal dashboard that consolidates project status,
team health metrics, and upcoming deadlines. The goal is to reduce scattered reports
and give managers a single view of what needs attention. Early prototypes show fewer
coordination meetings and faster decision-making.`,
    context: 'Internal planning notes for project overview',
};

export interface V1SummarizeTextResponse {
    excerpt: string;
    blurb: string;
    summary: string;
}

export const V1_SUMMARIZE_TEXT_RESPONSE: JsonSchema = {
    type: 'object',
    properties: {
        excerpt: {
            type: 'string',
            description: 'Short description or excerpt from the content.',
        },
        blurb: {
            type: 'string',
            description: 'Concise blurb summarizing the content.',
        },
        summary: {
            type: 'string',
            description: 'Detailed summary of the content.',
        },
    },
    required: ['excerpt', 'blurb', 'summary'],
    additionalProperties: false,
};
