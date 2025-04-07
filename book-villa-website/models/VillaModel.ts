import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
const { Schema } = mongoose;

const VillaSchema = new Schema({
    name: String,
    location: String,
    images : Array,
    comments:Array,
    category: ObjectId,
    description: String,
    phoneNumber: String,
    email: String,
    available: Boolean,
    numberOfRooms: Number,
    acreage: Number,
    pool: Boolean,
    price: Number,
    maxPeople: Number,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
}, {
    timestamps: true
});
// Use existing model if available to avoid OverwriteModelError
const VillaModel = mongoose.models.villas || mongoose.model('villas', VillaSchema);
export default VillaModel;
