import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const PasswordTokenModelSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "UserModel",
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
        expires: 1800,  // 30 minutes
  },
});

export default mongoose.model("PasswordTokenModel", PasswordTokenModelSchema);