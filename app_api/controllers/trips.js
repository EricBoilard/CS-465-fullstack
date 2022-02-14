const mongoose = require('mongoose');
const model = mongoose.model('trips');

//Get: /trips - lists all the trips
const tripsList = async (req, res) => {
   model
      .find({}) // empty js object
      .exec((err, trips) => {
         if(!trips) {
            return res
               .status(404)
               .json({"message": "trip not found"});
         } else if (err) {
            return res  
               .status(404)
               .json(err);
         } else {
            return res
               .status(200)
               .json(trips);
         }
      });
};

// return a single trip
const tripsFindCode = async (req, res) => {
   model
      .find({ 'code': req.params.tripCode })
      .exec((err, trips) => {
         if(!trips) {
            return res
               .status(404)
               .json({ "message": "trip not found" });
         } else if (err) {
            return res  
               .status(404)
               .json(err);
         } else {
            return res
               .status(200)
               .json(trips);
         }
      });
};

const tripsAddTrip = async (req, res) => {
   model
   .create({
      code: req.body.code,
      name: req.body.name,
      length: req.body.length,
      start: req.body.start,
      resort: req.body.resort,
      perPerson: req.body.perPerson,
      image: req.body.image,
      description: req.body.description
   },
   (err, trip) => {
      if (err) {
         return res
            .status(400) // bad request, invalid content
            .json(err);
      } else {
         return res
            .status(201) // created
            .json(trip);
      }
   });
}

module.exports = {
   tripsList,
   tripsFindCode,
   tripsAddTrip
};