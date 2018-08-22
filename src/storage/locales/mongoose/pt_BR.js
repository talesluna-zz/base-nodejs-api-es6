/* eslint-disable camelcase */
export const pt_BR = {
    DocumentNotFoundError: null,
    general              :
        {
            default : '`{PATH}` é inválido.',
            required: '`{PATH}` é obrigatório.'
        },
    Number               :
        {
            min: '`{PATH}` é menor do que o minimo permitido ({MIN}).',
            max: '`{PATH}` é maior do que o maximo permitido ({MAX}).'
        },
    Date                 :
        {
            min: '`{PATH}` é anterior ao miínimo permitido ({MIN}).',
            max: '`{PATH}` é posterior ao máximo permitido ({MAX}).'
        },
    String               :
        {
            enum     : '`{PATH}` não é válido.',
            match    : '`{VALUE}` não confere com a regex {REGEXP}.',
            minlength: '`{PATH}` deve conter no mínimo {MINLENGTH} caractere(s)',
            maxlength: '`{PATH}` deve conter no mínimo {MINLENGTH} caractere(s)'
        }
};