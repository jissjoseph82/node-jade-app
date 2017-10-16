const Hike = require('../models/hike');
const errorMessageHandler = require('../messages/handler/errorMessageHandler');

exports.create = async (req, res, next) => {
    try {
      const hike = await Hike.create(req.body.hike);
      if (!hike.error) {
        //return res.json(hike);
        res.redirect('/hikes');  
      }
    } catch (err) {
      console.log(err);
      res.json(errorMessageHandler.getError(1001));
    }
  };
  
exports.index = async (req, res, next) => {
  try {
    const hikes = await Hike.index();
    if (!hikes.error) {
      //return res.json(hike);
      res.render('hike', {title: 'My Hiking Log', hikes: hikes});
    }
  } catch (err) {
    console.log(err);
    res.json(errorMessageHandler.getError(1001));
  }
};