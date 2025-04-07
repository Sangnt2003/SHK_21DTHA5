import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
    fullName: String,
    email: String,
    password: String,
    cin: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    phoneNumber: String,
    dateOfBirth: Date,
    isActive: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isHost: {
        type: Boolean,
        default: false,
    },
    isUser:{
        type: Boolean,
        default: true,
    }
},{
    timestamps: true,
});

// Use existing model if available to avoid OverwriteModelError
const UserModel = mongoose.models.users || mongoose.model('users', UserSchema);
export default UserModel;