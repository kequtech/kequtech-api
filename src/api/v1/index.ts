import type { ApiProductParams } from '../../types.ts';
import {
    V1_CHARACTER_GENERATOR_EXAMPLE,
    V1_CHARACTER_GENERATOR_PARAMETERS,
    V1_CHARACTER_GENERATOR_RESPONSE,
} from './character-generator.ts';
import {
    V1_MESSAGE_PARSER_EXAMPLE,
    V1_MESSAGE_PARSER_PARAMETERS,
    V1_MESSAGE_PARSER_RESPONSE,
} from './message-parser.ts';
import {
    V1_MESSAGE_RESPONDER_EXAMPLE,
    V1_MESSAGE_RESPONDER_PARAMETERS,
    V1_MESSAGE_RESPONDER_RESPONSE,
} from './message-responder.ts';
import {
    V1_MESSAGE_ROUTER_EXAMPLE,
    V1_MESSAGE_ROUTER_PARAMETERS,
    V1_MESSAGE_ROUTER_RESPONSE,
} from './message-router.ts';
import {
    V1_SUMMARIZE_TEXT_EXAMPLE,
    V1_SUMMARIZE_TEXT_PARAMETERS,
    V1_SUMMARIZE_TEXT_RESPONSE,
} from './summarize-text.ts';
import {
    V1_SUMMARIZE_URL_EXAMPLE,
    V1_SUMMARIZE_URL_PARAMETERS,
    V1_SUMMARIZE_URL_RESPONSE,
} from './summarize-url.ts';

export const V1_CHARACTER_GENERATOR: ApiProductParams = {
    parameters: V1_CHARACTER_GENERATOR_PARAMETERS,
    example: V1_CHARACTER_GENERATOR_EXAMPLE,
    response: V1_CHARACTER_GENERATOR_RESPONSE,
};
export const V1_MESSAGE_PARSER: ApiProductParams = {
    parameters: V1_MESSAGE_PARSER_PARAMETERS,
    example: V1_MESSAGE_PARSER_EXAMPLE,
    response: V1_MESSAGE_PARSER_RESPONSE,
};
export const V1_MESSAGE_RESPONDER: ApiProductParams = {
    parameters: V1_MESSAGE_RESPONDER_PARAMETERS,
    example: V1_MESSAGE_RESPONDER_EXAMPLE,
    response: V1_MESSAGE_RESPONDER_RESPONSE,
};
export const V1_MESSAGE_ROUTER: ApiProductParams = {
    parameters: V1_MESSAGE_ROUTER_PARAMETERS,
    example: V1_MESSAGE_ROUTER_EXAMPLE,
    response: V1_MESSAGE_ROUTER_RESPONSE,
};
export const V1_SUMMARIZE_TEXT: ApiProductParams = {
    parameters: V1_SUMMARIZE_TEXT_PARAMETERS,
    example: V1_SUMMARIZE_TEXT_EXAMPLE,
    response: V1_SUMMARIZE_TEXT_RESPONSE,
};
export const V1_SUMMARIZE_URL: ApiProductParams = {
    parameters: V1_SUMMARIZE_URL_PARAMETERS,
    example: V1_SUMMARIZE_URL_EXAMPLE,
    response: V1_SUMMARIZE_URL_RESPONSE,
};
