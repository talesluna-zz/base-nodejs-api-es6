/* eslint-disable camelcase */
export const pt_BR = {
    any   : {
        required : '`{{key}}` é requerido',
        allowOnly: 'deve ser uma das opções: {{valids}}',
        empty    : 'não pode ser vazio'
    },
    array : {
        base                    : 'deve ser array',
        includesRequiredUnknowns: 'deve conter pelo menos {{unknownMisses}} item(s)',
        min                     : 'deve conter {{limit}} ou mais item(s)',
        max                     : 'deve conter {{limit}} ou menos item(s)'
    },
    string: {
        base  : 'deve ser string',
        uri   : 'deve ser uma URI',
        email : 'deve ser um email',
        length: 'deve conter exatamente {{limit}} caracteres',
        min   : 'deve conter {{limit}} ou mais caractere(s)',
        max   : 'deve conter {{limit}} ou menos caractere(s)',
        regex : {
            base: 'deve combinar com {{pattern}}'
        }
    },
    number: {
        base   : 'deve ser um número',
        integer: 'deve ser um número inteiro',
        min    : 'deve ser maior ou igual a {{limit}}',
        max    : 'deve ser menor ou igual a {{limit}}'
    },
    object: {
        base        : 'deve ser um objeto',
        allowUnknown: '`{{child}}` nāo é permitido'
    }
};