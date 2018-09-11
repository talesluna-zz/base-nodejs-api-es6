import { JoiDefaultSettings } from 'core';

export const defaultSettings: JoiDefaultSettings[] = [
    {
        applyTo: [
            'object',
            'array',
            'string',
            'number'
        ],
        settings: {
            abortEarly: false
        }
    }
]