import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
    job: {
        type: String,
        required: true,
        trim: true,
    },
    hours: {
        type: Number,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    wage: {
        type: Number,
        required: true,
        trim: true,
    },
    schedule: {
        type: String,
        required: true,
        trim: true,
    },
    postedBy : {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Create the model
const postJob = mongoose.model('PostedJob',jobSchema);

export default postJob;
