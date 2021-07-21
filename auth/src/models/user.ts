import mongoose from 'mongoose';

// What is need to create a User
interface UserAttrs {
  email: string;
  password: string;
}

// properties of a single document
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

// methods associated with user model
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
