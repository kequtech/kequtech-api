import type { JsonSchema } from '@kequtech/json-valid';

export interface V1SummarizeUrlParameters {
    url: string;
    context?: string;
}

export const V1_SUMMARIZE_URL_PARAMETERS: JsonSchema = {
    type: 'object',
    properties: {
        url: {
            type: 'string',
            description: 'URL of the content to summarize.',
            format: 'uri',
            maxLength: 2000,
        },
        context: {
            type: 'string',
            description: 'Describe yourself or your company (max 400 characters).',
            maxLength: 400,
        },
    },
    required: ['url'],
    additionalProperties: false,
};

export const V1_SUMMARIZE_URL_EXAMPLE = {
    url: 'https://acme.dev/team/mia',
    context: 'Preview for a user profile page',
};

export interface V1SummarizeUrlResponse {
    title: string;
    excerpt: string;
    blurb: string;
    summary: string;
    thumbnail?: string;
    image?: string;
}

export const V1_SUMMARIZE_URL_RESPONSE: JsonSchema = {
    type: 'object',
    properties: {
        title: {
            type: 'string',
            description: 'One-line title for the content.',
        },
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
        thumbnail: {
            type: 'string',
            description: 'URL to a small image representing the content.',
        },
        image: {
            type: 'string',
            description: 'URL to a larger preview or hero image for the content.',
        },
    },
    required: ['title', 'excerpt', 'blurb', 'summary'],
    additionalProperties: false,
};
