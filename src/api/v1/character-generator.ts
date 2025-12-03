import type { JsonSchema } from '@kequtech/json-valid';

export interface V1CharacterGeneratorParameters {
    context?: string;
    useCase?: string;
    genre?: string;
}

export const V1_CHARACTER_GENERATOR_PARAMETERS: JsonSchema = {
    type: 'object',
    properties: {
        context: {
            type: 'string',
            description: 'Prompt or idea to seed the character (max 400 characters).',
            maxLength: 400,
        },
        useCase: {
            type: 'string',
            description: 'Intended use of the character (e.g. ttrpg npc, chatbot persona).',
            maxLength: 100,
        },
        genre: {
            type: 'string',
            description: 'Genre tag (e.g. fantasy, sci-fi).',
            maxLength: 50,
        },
    },
    required: [],
    additionalProperties: false,
};

export const V1_CHARACTER_GENERATOR_EXAMPLE: V1CharacterGeneratorParameters = {
    context: 'Snarky gameshow host who negotiates relentlessly with players.',
    useCase: 'video game npc',
    genre: 'near-future sci-fi',
};

export interface V1CharacterGeneratorResponse {
    meta: {
        useCase: string; // e.g. "llm_npc", "ttrpg_npc", "brand_mascot"
        genre: string; // e.g. "cyberpunk heist", "cozy fantasy"
        toneTags: string[]; // 3–6: "dry", "snarky", "optimistic", "formal"
    };
    overview: {
        name: string;
        aliases: string[]; // alternative names/nicknames
        handle: string; // short label: "Grim Space Mechanic", "Chill Study Buddy"
        role: string; // functional: "quest-giver", "customer support guide"
        concept: string; // 1–2 sentence elevator pitch
    };
    identity: {
        age: string; // keep as string: "late 30s", "appears 19"
        gender: 'male' | 'female' | 'other'; // how they present
        speciesOrType: string; // "human", "AI assistant", "elf", etc.
        origin: string; // hometown / world / background: "outer-rim mining colony"
        occupation: string; // "salvage pilot", "high school teacher"
        archetype: string; // "reluctant hero", "trickster mentor", "cozy caretaker"
    };
    appearance: {
        snapshot: string; // single vivid line
        details: string[]; // 3–6 short bullets, not paragraphs
    };
    psychology: {
        coreTraits: string[]; // 4–7 adjectives/short phrases
        flaws: string[]; // 2–5, actually limiting behaviors
        values: string[]; // 2–5 guiding principles
        conflictHook: string; // 1–2 sentences: main internal tension
    };
    abilities: {
        name: string; // "Reverse engineering", "Calming anxious people"
        rating: 1 | 2 | 3 | 4 | 5; // 3 = typical pro, 5 = outstanding
        description: string; // 1 line narrative description
    }[];
    limitations: string[]; // 3–6 concrete weaknesses/limits
    storyHooks: {
        currentGoal: string; // what they’re trying to do *now*
        stakes: string; // what they risk losing/failing
        obstacles: string[]; // 3–5 problems in their way
        futureArcIdeas: string[]; // 2–4 ways they could grow/change
    };
    interactionGuide: {
        dos: string[]; // 5–10, concrete guidelines
        donts: string[]; // 5–10, hard boundaries
        sampleLines: string[]; // 3–6 short example utterances
    };
    continuity: {
        nonNegotiables: string[]; // truths that must never change
        mayEvolve: string[]; // parts that can change with story/user
    };
    systemPrompt: string; // 150–300 words, single prose block
}

export const V1_CHARACTER_GENERATOR_RESPONSE: JsonSchema = {
    type: 'object',
    properties: {
        // Same as V1
        meta: {
            type: 'object',
            properties: {
                useCase: {
                    type: 'string',
                    description: 'Intended use of the character (e.g. ttrpg npc, chatbot persona).',
                },
                genre: { type: 'string', description: 'Genre tag (e.g. fantasy, sci-fi).' },
                toneTags: {
                    type: 'array',
                    items: { type: 'string' },
                    description: '3–6 tone tags (e.g. "dry", "snarky", "optimistic", "formal").',
                },
            },
            required: ['useCase', 'genre', 'toneTags'],
            additionalProperties: false,
        },
        overview: {
            type: 'object',
            properties: {
                name: { type: 'string', description: 'Character name.' },
                aliases: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Alternative names/nicknames.',
                },
                handle: {
                    type: 'string',
                    description: 'Short label: "Grim Space Mechanic", "Chill Study Buddy".',
                },
                role: {
                    type: 'string',
                    description: 'Functional role: "quest-giver", "customer support guide".',
                },
                concept: { type: 'string', description: '1–2 sentence elevator pitch.' },
            },
            required: ['name', 'aliases', 'handle', 'role', 'concept'],
            additionalProperties: false,
        },
        identity: {
            type: 'object',
            properties: {
                age: {
                    type: 'string',
                    description: 'Character age (e.g. "late 30s", "appears 19").',
                },
                gender: {
                    type: 'string',
                    description: 'How they present (e.g. "male", "female", "other").',
                },
                speciesOrType: {
                    type: 'string',
                    description: 'Species or type (e.g. "human", "AI assistant", "elf").',
                },
                origin: {
                    type: 'string',
                    description: 'Hometown / world / background (e.g. "outer-rim mining colony").',
                },
                occupation: {
                    type: 'string',
                    description: 'Occupation (e.g. "salvage pilot", "high school teacher").',
                },
                archetype: {
                    type: 'string',
                    description:
                        'Archetype (e.g. "reluctant hero", "trickster mentor", "cozy caretaker").',
                },
            },
            required: ['age', 'gender', 'speciesOrType', 'origin', 'occupation', 'archetype'],
            additionalProperties: false,
        },
        appearance: {
            type: 'object',
            properties: {
                snapshot: {
                    type: 'string',
                    description: 'Single vivid line describing appearance.',
                },
                details: {
                    type: 'array',
                    items: { type: 'string' },
                    description: '3–6 short bullets describing appearance details.',
                },
            },
            required: ['snapshot', 'details'],
            additionalProperties: false,
        },
        psychology: {
            type: 'object',
            properties: {
                coreTraits: {
                    type: 'array',
                    items: { type: 'string' },
                    description: '4–7 adjectives/short phrases describing core traits.',
                },
                flaws: {
                    type: 'array',
                    items: { type: 'string' },
                    description: '2–5 actual limiting behaviors as flaws.',
                },
                values: {
                    type: 'array',
                    items: { type: 'string' },
                    description: '2–5 guiding principles as values.',
                },
                conflictHook: {
                    type: 'string',
                    description: '1–2 sentences describing main internal tension.',
                },
            },
            required: ['coreTraits', 'flaws', 'values', 'conflictHook'],
            additionalProperties: false,
        },
        abilities: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                        description: 'Name of the strength (e.g. "Reverse engineering").',
                    },
                    rating: {
                        type: 'integer',
                        minimum: 1,
                        maximum: 5,
                        description: 'Rating of the strength (3 = typical pro, 5 = outstanding).',
                    },
                    description: {
                        type: 'string',
                        description: '1 line narrative description of the strength.',
                    },
                },
                required: ['name', 'rating', 'description'],
                additionalProperties: false,
            },
        },
        limitations: {
            type: 'array',
            items: { type: 'string' },
            description: '3–6 concrete weaknesses/limits.',
        },
        storyHooks: {
            type: 'object',
            properties: {
                currentGoal: { type: 'string', description: 'What they’re trying to do now.' },
                stakes: { type: 'string', description: 'What they risk losing/failing.' },
                obstacles: {
                    type: 'array',
                    items: { type: 'string' },
                    description: '3–5 problems in their way.',
                },
                futureArcIdeas: {
                    type: 'array',
                    items: { type: 'string' },
                    description: '2–4 ways they could grow/change.',
                },
            },
            required: ['currentGoal', 'stakes', 'obstacles', 'futureArcIdeas'],
            additionalProperties: false,
        },
        interactionGuide: {
            type: 'object',
            properties: {
                dos: {
                    type: 'array',
                    items: { type: 'string' },
                    description: '5–10 concrete guidelines.',
                },
                donts: {
                    type: 'array',
                    items: { type: 'string' },
                    description: '5–10 hard boundaries.',
                },
                sampleLines: {
                    type: 'array',
                    items: { type: 'string' },
                    description: '3–6 short example utterances.',
                },
            },
            required: ['dos', 'donts', 'sampleLines'],
            additionalProperties: false,
        },
        continuity: {
            type: 'object',
            properties: {
                nonNegotiables: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Truths that must never change.',
                },
                mayEvolve: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Parts that can change with story/user.',
                },
            },
            required: ['nonNegotiables', 'mayEvolve'],
            additionalProperties: false,
        },
        systemPrompt: { type: 'string', description: '150–300 words, single prose block.' },
    },
    required: [
        'meta',
        'overview',
        'identity',
        'appearance',
        'psychology',
        'abilities',
        'limitations',
        'storyHooks',
        'interactionGuide',
        'continuity',
        'systemPrompt',
    ],
    additionalProperties: false,
};
