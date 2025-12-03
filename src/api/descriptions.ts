import { MESSAGE_ROUTER_DEFAULT_DEPARTMENTS } from '../constants.ts';

export const SUMMARIZE_TEXT_DESCRIPTION = `Condenses up to 3000 characters of arbitrary plain text into a structured bundle. The output includes a title, short description, one-line blurb, and full summary.

Formatting from the input is preserved before summarization, and the output is designed for quick reading and straightforward downstream processing.`;

export const SUMMARIZE_URL_DESCRIPTION = `Fetches a public webpage (text/html or text/*), extracts its visible content and metadata, then produces a structured summary. This includes a title, short description, one-line blurb, full summary, and optional image suggestions when available.

HTML clutter is removed and the main readable content is condensed into predictable object. Works with static and SPA pages, though SPA extraction may take slightly longer.`;

export const MESSAGE_PARSER_DESCRIPTION = `Extracts structured fields from freeform text. It identifies intent, subject, tone, named entities, contact details, and other basic metadata.

Useful for turning raw messages into predictable, machine-readable data for storage, routing, search, or general automation. No spam detection is performed here.`;

export const MESSAGE_ROUTER_DESCRIPTION = `Classifies an incoming message into exactly one department from a predefined list. It returns the chosen department, a confidence score (0–100), and an explanation of the routing.

Default departments:
${MESSAGE_ROUTER_DEFAULT_DEPARTMENTS.map(({ name, description }) => `- **${name}:** ${description}`).join('\n')}

The importance score reflects how relevant or legitimate the message appears. This can also be inferred as the spam score, a very low score indicates the message is of little importance. Importance can be tweaked and departments can be prioritized through context and guidance.`;

export const MESSAGE_RESPONDER_DESCRIPTION = `Generates three short reply drafts—positive, neutral, and negative—based on a single message and your context. Each draft adheres to the configured voice, and the endpoint also recommends one of the three options with a brief justification.

Optional guidance can modify tone or add constraints. Output is meant to be directly usable or easy to edit.`;

export const CHARACTER_GENERATOR_DESCRIPTION = `Generates a fully structured fictional character with predictable fields and clear behavioral constraints. The output is designed for direct use in LLM-driven NPCs, roleplay bots, game systems, and writing tools.

The generator accepts optional hints (context, use-case, genre) but never requires them. Every call returns a complete, self-consistent profile that includes biography, abilities, personality traits, narrative hooks, interaction guidelines, and a concise system prompt suitable for immediate downstream LLM use.

Results are creative but controlled: the schema is stable, fields are always populated, and the system prompt encodes the character’s tone, limits, and non-negotiables for reliable, repeatable behavior.`;
