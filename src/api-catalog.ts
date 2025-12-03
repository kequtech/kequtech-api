import {
    CHARACTER_GENERATOR_DESCRIPTION,
    MESSAGE_PARSER_DESCRIPTION,
    MESSAGE_RESPONDER_DESCRIPTION,
    MESSAGE_ROUTER_DESCRIPTION,
    SUMMARIZE_TEXT_DESCRIPTION,
    SUMMARIZE_URL_DESCRIPTION,
} from './api/descriptions.ts';
import {
    V1_CHARACTER_GENERATOR,
    V1_MESSAGE_PARSER,
    V1_MESSAGE_RESPONDER,
    V1_MESSAGE_ROUTER,
    V1_SUMMARIZE_TEXT,
    V1_SUMMARIZE_URL,
} from './api/v1/index.ts';
import type { ApiProduct, DateString } from './types.ts';

export const API_CATALOG: ApiProduct[] = [
    {
        name: 'Message Parser',
        description: MESSAGE_PARSER_DESCRIPTION,
        blurb: 'Parse incoming message into structured fields.',
        endpoint: '/message-parser',
        versions: [
            {
                tokens: 1,
                ...V1_MESSAGE_PARSER,
                rateLimit: { max: 60, seconds: 60 },
                packageVersion: '1.0.0',
                added: '2025-12-01',
            },
        ],
    },
    {
        name: 'Message Router',
        description: MESSAGE_ROUTER_DESCRIPTION,
        blurb: 'Detect spam and route to an internal department.',
        endpoint: '/message-router',
        versions: [
            {
                tokens: 5,
                ...V1_MESSAGE_ROUTER,
                rateLimit: { max: 200, seconds: 60 },
                packageVersion: '1.0.0',
                added: '2025-12-01',
            },
        ],
    },
    {
        name: 'Message Responder',
        description: MESSAGE_RESPONDER_DESCRIPTION,
        blurb: 'Draft quick on-brand replies based on your context.',
        endpoint: '/message-responder',
        versions: [
            {
                tokens: 8,
                ...V1_MESSAGE_RESPONDER,
                rateLimit: { max: 200, seconds: 60 },
                packageVersion: '1.0.0',
                added: '2025-12-01',
            },
        ],
    },
    {
        name: 'Summarize Text',
        description: SUMMARIZE_TEXT_DESCRIPTION,
        blurb: 'Summarize content into a concise description.',
        endpoint: '/summarize-text',
        versions: [
            {
                tokens: 4,
                ...V1_SUMMARIZE_TEXT,
                rateLimit: { max: 200, seconds: 60 },
                packageVersion: '1.0.0',
                added: '2025-12-01',
            },
        ],
    },
    {
        name: 'Summarize Url',
        description: SUMMARIZE_URL_DESCRIPTION,
        blurb: 'Summarize any public url into a link preview.',
        endpoint: '/summarize-url',
        versions: [
            {
                tokens: 8,
                ...V1_SUMMARIZE_URL,
                rateLimit: { max: 200, seconds: 60 },
                packageVersion: '1.0.0',
                added: '2025-12-01',
            },
        ],
    },
    {
        name: 'Character Generator',
        description: CHARACTER_GENERATOR_DESCRIPTION,
        blurb: 'Create a complete, reusable character sheet.',
        endpoint: '/character-generator',
        versions: [
            {
                tokens: 25,
                ...V1_CHARACTER_GENERATOR,
                rateLimit: { max: 10, seconds: 60 },
                packageVersion: '1.0.0',
                added: '2025-12-01',
            },
        ],
    },
];

// ISO 8601 date of the current version
export const API_CATALOG_VERSION = API_CATALOG.flatMap((product) =>
    product.versions.map((v) => v.added),
).reduce<DateString>(
    (best, added) => (added > best ? added : best),
    '1970-01-01',
);

export const ALL_PATHNAMES = API_CATALOG.reduce<string[]>(
    (acc, { versions, endpoint }) => {
        const pathnames = [...Array(versions.length)].map(
            (_, i) => `/v${i + 1}${endpoint}`,
        );
        acc.push(...pathnames);
        return acc;
    },
    [],
);
