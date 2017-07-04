import mongoose from 'mongoose';

export default mongoose.model(
    'Example',
    mongoose.Schema(
        {
            name: {
                type: String,
                required: true
            }
        },
        {
            timestamps: true
        }
    )
);
