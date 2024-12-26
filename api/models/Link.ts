import { model, Schema } from 'mongoose';

const LinkSchema = new Schema(
  {
    shortUrl: { type: String, required: true, unique: true },
    originalUrl: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

const Link = model('Link', LinkSchema);
export default Link;
