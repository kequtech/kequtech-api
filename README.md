# @kequtech/kequtech-api

A fully-typed client for the [Kequtech API](https://www.kequtech.com/products).
This package provides a lightweight wrapper around the HTTP interface, adds runtime validation and optional request trimming, and a simple rate-limiting helper for developers who need to protect their users from accidental overuse.

## Installation

```bash
npm i @kequtech/kequtech-api
```

## Getting Started

1. **Visit** — **[https://www.kequtech.com/dashboard/api-keys](https://www.kequtech.com/dashboard/api-keys)** — to generate a key.

2. **Initialize the client:**

```ts
import { KequtechApi } from '@kequtech/kequtech-api';

const kequtechApi = KequtechApi({
    apiKey: process.env.KEQUTECH_API_KEY,
});
```

3. **Call an endpoint:**

Every available endpoint is typed automatically from the API catalog. Each call returns structured, validated data.

```ts
const message = `Hi there,

I’m Sofia from Atelier Lumen. We’re exploring a light redesign of our site (https://atelierlumen.com) to improve conversions and clarify our product catalog. Could you share your availability for a quick call this week?

You can reach me at sofia@atelierlumen.com or +1 415 555 0199. Budget is flexible if the scope makes sense.

Thanks!
Sofia Martinez
Marketing Lead`;

const res = await kequtechApi('/v1/message-parser', {
    parameters: { message },
});

res.data;
// {
//   "intent": "project inquiry",
//   "subject": "Light redesign of Atelier Lumen website",
//   "author": "Sofia Martinez",
//   "role": "Marketing Lead",
//   "business": "Atelier Lumen",
//   "website": "https://atelierlumen.com",
//   "tone": "professional",
//   "contacts": [
//     {
//       "type": "email",
//       "value": "sofia@atelierlumen.com"
//     },
//     {
//       "type": "phone",
//       "value": "+1 415 555 0199"
//     }
//   ]
// }
```

## Response Data

With a `res` object it is your duty to check the `ok` value, to know whether you are handling a success response or an error. This is because the data returned has one of two structures.

```ts
res.status; // status code returned from api
res.statusText; // status text returned from api
res.rateLimit; // if rate limiting

if (res.ok) return res.data;

res.error; // valuable information about what the problem is
```

## Optional Features

### 1. Rate Limiting

You can decorate requests with an `actorId` which applies rate-limiting behavior. This helps protect your account if someone spams your integration. Use for example a user identifier or ip address.

```ts
await kequtechApi('/v1/message-parser', {
    actorId: 'user-1234',
    parameters: { message: '...', },
});
```

If no `max` or `seconds` are set, the client applies the endpoint’s recommended limits automatically. Omit `actorId` to disable the feature.

You can check if rate limiting was the cause of the problem.

```ts
const tooManyRequests = res.status === 429;
// or
const retryAfter = res.rateLimit?.retryAfter;
// number of seconds
```

### 2. Field Trimming

The client will automatically trim string fields to their documented maximum length before sending. This skips an error response, disable this feature with `allowTruncation: false`.

```ts
await kequtechApi('/v1/message-parser', {
    parameters: { message: '...', },
    allowTruncation: false,
});
```

You can check whether parameter validation was the cause of the problem.

```ts
const unprocessableEntity = res.status === 422;
// or
const parameter = res.error?.parameter;
// {
//     path: ["message"],
//     message: "String length must be <= 3000",
//     received: 3001,
// }
```

### 3. Abort Signal

The client accepts a `signal` parameter as an [AbortSignal](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal). It can be used to gain better control of the request for module lifecycles and specialized applications.

```ts
const controller = new AbortController();
const signal = controller.signal;

await kequtechApi('/v1/message-parser', {
    parameters: { message: '...', },
    signal,
});
```

## Error Handling

All calls return a formatted `error` object if the network request fails or any data fails validation.

```ts
type KequtechApiResponse<U extends ApiPathname> = {
    status: number;
    statusText: string;
    rateLimit?: ApiRateLimit;
} & ({
    ok: true;
    data: ApiResponse<U>;
} | {
    ok: false;
    error: ApiError;
});

interface ApiError {
    message?: string;
    parameter?: { path: ErrorPath; message: string; received?: unknown; };
}

interface ApiRateLimit {
    limit: number;
    remaining: number;
    reset: number;
    retryAfter?: number;
}
```

Parameter validation is performed on the client as a convenience for a faster response. If there is a problem with your parameters no request is sent to the api.

This is why you may see missing failed requests in `Recent Activity` on your dashboard.

## Type Safety

Every endpoint and parameter is fully typed. Hovering in your editor (VS Code, WebStorm, etc.) will reveal available endpoints, parameter types, and return structures.

## Environment

* **Runtime:** Node 18+ (ESM only)
* **Typing:** Built-in TypeScript definitions no extra packages required

## License

MIT License

Copyright © [2025 Kequtech Innovations Kft.](https://www.kequtech.com)
