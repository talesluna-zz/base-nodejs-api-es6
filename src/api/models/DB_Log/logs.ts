import { Schema } from 'mongoose';

export default new Schema(
    {
        text: {
            type        : String,
            required    : true,
            lowercase   : true
        }
    },
    {
        collection: 'Logs',
        timestamps: true,
    }
);
