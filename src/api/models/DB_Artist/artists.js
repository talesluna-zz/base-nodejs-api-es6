import {Schema} from 'mongoose';

export default new Schema(
    {
        name: {
            type        : String,
            required    : true,
            lowercase   : true,
            index       : true
        },
        genres: {
            type        : [String],
            required    : true,
            index       : true,
            minlength   : 1
        },
        originYear: {
            type        : Number,
            min         : 1500,
            default     : null
        },
        originLocale: {
            type        : String,
            lowercase   : true,
            default     : 'unknown'
        }
    },
    {
        collection: 'Artists',
        timestamps: true,
        runSettersOnQuery: false
    }
)