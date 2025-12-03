import type { JsonSchema } from '@kequtech/json-valid';

export interface V1MessageRouterParameters {
    message: string;
    subject?: string;
    context?: string;
    guidance?: string;
    departments?: { name: string; description?: string }[];
}

export const V1_MESSAGE_ROUTER_PARAMETERS: JsonSchema = {
    type: 'object',
    properties: {
        message: {
            type: 'string',
            description: 'Provide the original message in plain text (10-1500 characters).',
            minLength: 10,
            maxLength: 1500,
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
        departments: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                        description: 'Short keyword (2-32 characters).',
                        minLength: 2,
                        maxLength: 32,
                    },
                    description: {
                        type: 'string',
                        description: 'Reason to route here (max 120 characters).',
                        minLength: 0,
                        maxLength: 120,
                    },
                },
                required: ['name'],
                additionalProperties: false,
            },
            maxItems: 15,
            description: 'List of internal departments.',
        },
    },
    required: ['message'],
    additionalProperties: false,
};

export const V1_MESSAGE_ROUTER_EXAMPLE = {
    message:
        "Hi there—I'm trying to update my card on file but keep getting an error. Also wondering if you offer discounts on upgrading to the Business plan.",
    subject: 'Card update issue + upgrade question',
    context: 'A subscription based software company.',
    guidance:
        'Prioritize resolving blocking issues first, even if the message includes multiple topics.',
    departments: [
        { name: 'support', description: 'Troubleshooting and technical issues.' },
        { name: 'billing', description: 'Payments, refunds, and account charges.' },
        { name: 'sales', description: 'Plan upgrades, quotes, and new deals.' },
    ],
};

export interface V1MessageRouterResponse {
    department: string;
    confidence: number;
    reason: string;
    importance: number;
}

export const V1_MESSAGE_ROUTER_RESPONSE: JsonSchema = {
    type: 'object',
    properties: {
        department: {
            type: 'string',
            description: 'Chosen department.',
        },
        confidence: {
            type: 'integer',
            description: '0-100 certainty in the department selection.',
        },
        reason: {
            type: 'string',
            description: 'One-line rationale for the department choice.',
        },
        importance: {
            type: 'integer',
            description: '0-100 how important is this message (0=trivial/spam, 100=urgent lead).',
        },
    },
    required: ['department', 'confidence', 'importance', 'reason'],
    additionalProperties: false,
};
