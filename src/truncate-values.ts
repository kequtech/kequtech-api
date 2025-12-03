import type { JsonSchema, JsonSchemaType } from '@kequtech/json-valid';
import type { ApiParameters, ApiPathname } from './types.ts';
import { getApiProductVersion } from './validate.ts';

export function truncateValues<U extends ApiPathname>(
    pathname: U,
    body: ApiParameters<U>,
    allowTruncation = true,
) {
    if (!allowTruncation) return body;
    const schema = getApiProductVersion(pathname).parameters;
    return truncate(schema, body);
}

type Obj = Record<string, unknown>;

function truncate<T>({ type, maxLength, items, properties }: JsonSchema, data: T): T {
    // Truncate string
    if (typeof data === 'string' && maxLength !== undefined && isType(type, 'string')) {
        return brevity(data, maxLength) as T;
    }

    // Copy array
    if (items && Array.isArray(data) && isType(type, 'array')) {
        return data.map((value) => truncate(items, value)) as T;
    }

    // Copy object
    if (properties && isType(type, 'object') && isObject(data)) {
        return Object.entries(data as Obj).reduce((acc, [key, value]) => {
            acc[key] = key in properties ? truncate(properties[key], value) : value;
            return acc;
        }, {} as Obj) as T;
    }

    // Anything else
    return data;
}

function isObject(value: unknown): boolean {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isType(type: JsonSchemaType | readonly JsonSchemaType[], name: string): boolean {
    return Array.isArray(type) ? type.includes(name) : type === name;
}

function brevity(value: string, length: number) {
    if (value.length <= length) return value;
    const half = Math.floor(length / 2);
    return value.substring(0, half) + value.substring(value.length - half);
}
