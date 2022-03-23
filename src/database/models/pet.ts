import { Schema, model } from 'mongoose';
import { IPet } from './constants/interface';
import { DESCRIPTION_NOT_FOUND, IS_REQUIRED } from './constants/errors';

const petSchema = new Schema({
  location: {
    lat: { type: Number },
    lng: { type: Number },
  },
  images: { type: Array },
  category: { type: String },
  textAddress: { type: String },
  medicalNotes: { type: Array },
  weight: { type: String, default: '0' },
  city: { type: String, lowercase: true },
  adopted: { type: Boolean, default: false },
  country: { type: String, lowercase: true },
  updatedDate: { type: Date, required: false },
  age: { type: String, required: false, lowercase: true },
  name: { type: String, required: false, lowercase: true },
  color: { type: String, required: false, lowercase: true },
  gender: { type: String, required: false, lowercase: true },
  description: { type: String, default: DESCRIPTION_NOT_FOUND },
  vet: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  userCreator: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  userAdopted: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  createdDate: { type: Date, required: [true, `The createdDate ${IS_REQUIRED}`] },
});

export default model<IPet>('Pet', petSchema);
