const { Price } = require('../model/Price');

exports.fetchPrices = async (req, res) => {
  try {
    const prices = await Price.find({}).exec();
    res.status(200).json(prices);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.createPrice = async (req, res) => {
  const price = new Price(req.body);
  try {
    const doc = await price.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};