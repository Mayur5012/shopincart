const mongoose = require('mongoose');
const { Schema } = mongoose;

const priceSchema = new Schema({
  label: { type: String, required: true, unique: true },
  value: { type: String, required: true, unique: true },
});

const virtual = priceSchema.virtual('id');
virtual.get(function () {
  return this._id;
});
priceSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

exports.Price = mongoose.model('Price', priceSchema);
