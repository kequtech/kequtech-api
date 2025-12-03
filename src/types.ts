import type { JsonSchema, ValidationError } from '@kequtech/json-valid';
import type {
    V1CharacterGeneratorParameters,
    V1CharacterGeneratorResponse,
} from './api/v1/character-generator.ts';
import type {
    V1MessageParserParameters,
    V1MessageParserResponse,
} from './api/v1/message-parser.ts';
import type {
    V1MessageResponderParameters,
    V1MessageResponderResponse,
} from './api/v1/message-responder.ts';
import type {
    V1MessageRouterParameters,
    V1MessageRouterResponse,
} from './api/v1/message-router.ts';
import type {
    V1SummarizeTextParameters,
    V1SummarizeTextResponse,
} from './api/v1/summarize-text.ts';
import type {
    V1SummarizeUrlParameters,
    V1SummarizeUrlResponse,
} from './api/v1/summarize-url.ts';

export interface KequtechApiMap {
    '/v1/message-parser': {
        parameters: V1MessageParserParameters;
        response: V1MessageParserResponse;
    };
    '/v1/message-responder': {
        parameters: V1MessageResponderParameters;
        response: V1MessageResponderResponse;
    };
    '/v1/message-router': {
        parameters: V1MessageRouterParameters;
        response: V1MessageRouterResponse;
    };
    '/v1/character-generator': {
        parameters: V1CharacterGeneratorParameters;
        response: V1CharacterGeneratorResponse;
    };
    '/v1/summarize-text': {
        parameters: V1SummarizeTextParameters;
        response: V1SummarizeTextResponse;
    };
    '/v1/summarize-url': {
        parameters: V1SummarizeUrlParameters;
        response: V1SummarizeUrlResponse;
    };
}

type YYYY = `${number}${number}${number}${number}`;
type MM = `${number}${number}`;
type DD = `${number}${number}`;
export type DateString = `${YYYY}-${MM}-${DD}`;

export type ApiPathname = keyof KequtechApiMap;
export type ApiParameters<U extends ApiPathname> =
    KequtechApiMap[U]['parameters'];
export type ApiResponse<U extends ApiPathname> = KequtechApiMap[U]['response'];

export interface ApiProductParams {
    parameters: JsonSchema;
    example: unknown;
    response: JsonSchema;
}
export interface ApiProductVersion extends ApiProductParams {
    tokens: number;
    rateLimit: { max: number; seconds: number };
    packageVersion: string;
    added: DateString;
}

export interface ApiProduct {
    name: string;
    description: string;
    blurb: string;
    endpoint: string;
    versions: ApiProductVersion[];
}

export interface ApiRateLimit {
    limit: number;
    remaining: number;
    reset: number;
    retryAfter?: number;
}

export interface ApiError {
    message?: string;
    parameter?: Omit<ValidationError, 'ok'>;
}
