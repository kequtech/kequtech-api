import type { JsonSchema } from '@kequtech/json-valid';

export interface V1MessageResponderParameters {
    message: string;
    subject?: string;
    context?: string;
    guidance?: string;
}

export const V1_MESSAGE_RESPONDER_PARAMETERS: JsonSchema = {
    type: 'object',
    properties: {
        message: {
            type: 'string',
            description: 'Provide the original message in plain text (10-3000 characters).',
            minLength: 10,
            maxLength: 3000,
        },
        subject: {
            type: 'string',
            description: 'Provide the original subject in plain text (max 120 characters).',
            maxLength: 120,
        },
        context: {
            type: 'string',
            description: 'Describe yourself or your company (max 400 characters).',
            maxLength: 400,
        },
        guidance: {
            type: 'string',
            description: 'Describe what you want (max 400 characters).',
            maxLength: 400,
        },
    },
    required: ['message'],
    additionalProperties: false,
};

export const V1_MESSAGE_RESPONDER_EXAMPLE = {
    message:
        'Hey! I found your service through a friend. Do you have room for a small project this month? I need help polishing our homepage and tightening up the copy.',
    subject: 'Project availability',
    context: 'We are a small creative studio.',
    guidance:
        'Prefer to show interest in small inquiries, ask quick clarifying questions. Tone: friendly, helpful, and direct.',
};

export interface V1MessageResponderResponse {
    positive: string;
    neutral: string;
    negative: string;
    recommend: 'positive' | 'neutral' | 'negative';
    reason: string;
}

export const V1_MESSAGE_RESPONDER_RESPONSE: JsonSchema = {
    type: 'object',
    properties: {
        positive: {
            type: 'string',
            description: 'Warm, welcoming reply that advances the conversation.',
        },
        neutral: {
            type: 'string',
            description: 'Polite, factual reply that neither commits nor declines.',
        },
        negative: {
            type: 'string',
            description: 'Courteous decline or redirect when not a fit.',
        },
        recommend: {
            type: 'string',
            enum: ['positive', 'neutral', 'negative'],
            description: 'Best-fit of the three.',
        },
        reason: {
            type: 'string',
            description: 'One-line rationale for the recommended choice.',
        },
    },
    required: ['positive', 'neutral', 'negative', 'recommend', 'reason'],
    additionalProperties: false,
};
