import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema
let UserModelSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
})

UserModelSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    const hash = await bcrypt.hash(this.password, parseInt(process.env.SALT_ROUNDS));
    this.password = hash;
    next();
});

export default mongoose.model('UserModel', UserModelSchema)
