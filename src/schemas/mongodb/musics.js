import mongoose from 'mongoose';

export default mongoose.model(
    'Musics',
    mongoose.Schema(
        {
            name: {
                type: String,
                required: true
            },
            duration: {
                type: Number,
                index: true
            },
            albumName: {
                type: String,
                default: 'Independent'
            },
            artistId: {
                type: mongoose.SchemaTypes.ObjectId,
                required: true,
                index: true,
                ref: 'Artists._id'
            }
        },
        {
            collection: 'Musics',
            timestamps: true
        }
    )
);