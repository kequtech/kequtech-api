import { type ValidationError, type Validator, validator } from '@kequtech/json-valid';
import { API_CATALOG } from './api-catalog.ts';
import type { ApiError, ApiProductVersion } from './types.ts';

export function renderValidationError({ path, message, received }: ValidationError): ApiError {
    return {
        parameter: { path, message, received },
        message: `[schema] [${path.join('.')}] ${message} received: ${received}`,
    };
}

const PARAMETERS_VALIDATORS = new Map<string, Validator>();

export function getParametersValidator(pathname: string) {
    if (!PARAMETERS_VALIDATORS.has(pathname)) {
        const { parameters } = getApiProductVersion(pathname);
        PARAMETERS_VALIDATORS.set(pathname, validator(parameters));
    }
    return PARAMETERS_VALIDATORS.get(pathname)!;
}

const API_PRODUCT_VERSIONS = new Map<string, ApiProductVersion>();

export function getApiProductVersion(pathname: string) {
    if (!API_PRODUCT_VERSIONS.has(pathname)) {
        const [versionIndex, endpoint] = getApiVersionIndexAndEndpoint(pathname);
        const apiProduct = API_CATALOG.find(item => item.endpoint === endpoint);
        if (!apiProduct) throw new Error(`Invalid endpoint: ${endpoint}`);
        const version = apiProduct.versions[versionIndex];
        if (!version) throw new Error(`Invalid version: ${pathname}`);
        API_PRODUCT_VERSIONS.set(pathname, version);
    }
    return API_PRODUCT_VERSIONS.get(pathname)!;
}

export function getApiVersionIndexAndEndpoint(pathname: string): [number, string] {
    const sep = pathname.indexOf('/', 1);
    if (sep === -1) return [getApiVersionIndex(pathname.slice(1)), '/'];
    const ver = pathname.slice(1, sep);
    const endpoint = pathname.slice(sep) ?? '/';
    return [getApiVersionIndex(ver), endpoint];
}

export function getApiVersionIndex(ver?: string): number {
    if (!ver || !/^v\d+$/.test(ver)) return -1;
    return parseInt(ver.slice(1), 10) - 1;
}
