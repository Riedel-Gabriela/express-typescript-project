import mongoose, { Schema } from 'mongoose';

const documentSchema = new Schema({
  image_url: { type: String, required: true },
  measure_value: { type: Number, required: true },
  measure_uuid: { type: String, required: true }
});

export const DocumentModel = mongoose.model('customers', documentSchema);
