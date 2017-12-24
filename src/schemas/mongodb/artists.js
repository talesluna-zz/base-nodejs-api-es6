import mongoose from 'mongoose';

export default mongoose.model(
    'Artists',
    mongoose.Schema(
        {
            name: {
                type: String,
                unique: true,
                required: true
            }
        },
        {
            collection: 'Artists',
            timestamps: true
        }
    )
);