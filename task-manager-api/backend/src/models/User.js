import mongoose from 'mongoose';

/**
 * User schema — stores email and hashed password.
 *
 * The password field is NOT returned in queries by default (select: false)
 * to prevent accidental exposure. It must be explicitly selected when
 * needed for password comparison during login.
 */
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (doc, ret) => {
        delete ret.password;
        return ret;
      },
    },
  }
);

/**
 * Pre-save hook — ensures email is normalized before saving.
 */
userSchema.pre('save', function () {
  if (typeof this.email === 'string') {
    this.email = this.email.toLowerCase().trim();
  }
});

export default mongoose.model('User', userSchema);