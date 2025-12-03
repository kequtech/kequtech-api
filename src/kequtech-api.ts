import { truncateValues } from './truncate-values.ts';
import type { ApiError, ApiParameters, ApiPathname, ApiRateLimit, ApiResponse } from './types.ts';
import { getParametersValidator, renderValidationError } from './validate.ts';

interface Limits {
    actorId?: string;
    max?: number;
    seconds?: number;
}

export type KequtechApiOptions<U extends ApiPathname> = Limits & {
    parameters: ApiParameters<U>;
    signal?: AbortSignal;
    allowTruncation?: boolean;
};

type KequtechApiResponse<U extends ApiPathname> = {
    status: number;
    statusText: string;
    rateLimit?: ApiRateLimit;
} & ({ ok: true; data: ApiResponse<U> } | { ok: false; error: ApiError });

type KequtechApi = <U extends ApiPathname>(
    pathname: U,
    options: KequtechApiOptions<U>,
) => Promise<KequtechApiResponse<U>>;

interface BuildKequtechApiOptions {
    apiKey: string;
    host?: string;
}

export function KequtechApi({ apiKey, host }: BuildKequtechApiOptions): KequtechApi {
    if (!apiKey) throw new Error('Kequtech Api Key required');

    return async <U extends ApiPathname>(pathname: U, options: KequtechApiOptions<U>) => {
        const { parameters, signal, allowTruncation, ...limits } = options;
        const trimmed = truncateValues(pathname, parameters, allowTruncation);
        const valid = getParametersValidator(pathname)(trimmed);

        if (!valid.ok)
            return {
                ok: false,
                error: renderValidationError(valid),
                status: 422,
                statusText: 'Unprocessable Entity',
            };

        const res = await fetch((host ?? 'https://api.kequtech.com') + pathname, {
            method: 'POST',
            headers: buildHeaders(apiKey, limits),
            body: JSON.stringify(trimmed),
            signal,
        });

        const result = {
            status: res.status,
            statusText: res.statusText,
            rateLimit: getRateLimit(res, limits.actorId),
        };
        const data = await res.json().catch(async (ex) => {
            console.error(ex);
        });

        if (!data) {
            // should never happen
            const message = await res.text().catch(() => 'invalid response');
            return {
                ...result,
                ok: false,
                error: { message: `[server unavailable] ${message}` },
            };
        }
        if (!res.ok) {
            return {
                ...result,
                ok: false,
                error: { ...data.error?.cause },
            };
        }
        return {
            ...result,
            ok: true,
            data,
        };
    };
}

function getRateLimit(res: Response, actorId?: string): ApiRateLimit | undefined {
    if (actorId === undefined) return undefined;
    const retryAfterStr = res.headers.get('retry-after');
    return {
        limit: Number(res.headers.get('x-ratelimit-limit') ?? -1),
        remaining: Number(res.headers.get('x-ratelimit-remaining') ?? -1),
        reset: Number(res.headers.get('x-ratelimit-reset') ?? 0),
        retryAfter: retryAfterStr !== null ? Number(retryAfterStr) : undefined,
    };
}

function buildHeaders(apiKey: string, { actorId, max, seconds }: Limits) {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        Authorization: `Api-Key ${apiKey}`,
    };

    if (actorId !== undefined) {
        if (!/^[^"]{1,128}$/.test(actorId)) throw new Error(`Invalid uid: ${actorId}`);
        const parts: string[] = [`actorId="${actorId}"`];

        if (max !== undefined) {
            if (Number.isNaN(max) || max < 1) throw new Error(`Invalid max: ${max}`);
            parts.push(`max=${Math.floor(max)}`);
        }
        if (seconds !== undefined) {
            if (Number.isNaN(seconds) || seconds < 1)
                throw new Error(`Invalid seconds: ${seconds}`);
            parts.push(`seconds=${Math.floor(seconds)}`);
        }

        headers['X-Kequtech-Rate-Limit'] = parts.join('; ');
    }

    return headers;
}
