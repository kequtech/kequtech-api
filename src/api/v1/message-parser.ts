import type { JsonSchema } from '@kequtech/json-valid';

export interface V1MessageParserParameters {
    message: string;
}

export const V1_MESSAGE_PARSER_PARAMETERS: JsonSchema = {
    type: 'object',
    properties: {
        message: {
            type: 'string',
            description: 'Provide the original message in plain text (10-1500 characters).',
            minLength: 10,
            maxLength: 1500,
        },
    },
    required: ['message'],
    additionalProperties: false,
};

export const V1_MESSAGE_PARSER_EXAMPLE = {
    message: 'Hi, Mia mia@acme.dev. Could you help with a small site rebuild next month?',
};

export interface V1MessageParserResponse {
    intent: string;
    subject: string;
    author?: string;
    role?: string;
    business?: string;
    website?: string;
    tone: string;
    contacts: { type: string; value: string }[];
}

export const V1_MESSAGE_PARSER_RESPONSE: JsonSchema = {
    type: 'object',
    properties: {
        intent: {
            type: 'string',
            description: 'Short purpose label (e.g. project pitch, job inquiry).',
        },
        subject: {
            type: 'string',
            description: 'One-line subject summarizing the message.',
        },
        author: {
            type: 'string',
            description: 'Sender name.',
        },
        role: {
            type: 'string',
            description: 'Sender role.',
        },
        business: {
            type: 'string',
            description: 'Sender company.',
        },
        website: {
            type: 'string',
            description: 'Sender website.',
        },
        tone: {
            type: 'string',
            description: 'Single adjective describing tone (e.g. friendly, urgent).',
        },
        contacts: {
            type: 'array',
            description: 'List of extracted contact details.',
            items: {
                type: 'object',
                properties: {
                    type: {
                        type: 'string',
                        description: 'Contact channel (e.g. email, phone, instagram).',
                    },
                    value: {
                        type: 'string',
                        description: 'Canonical value.',
                    },
                },
                required: ['type', 'value'],
                additionalProperties: false,
            },
        },
    },
    required: ['intent', 'subject', 'tone', 'contacts'],
    additionalProperties: false,
};
