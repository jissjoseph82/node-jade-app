const query = require('../db/pool').query;

module.exports = {
create: async hike => {
    const hikeResponse = (await query(
        'insert into "hikes"("hikeDate", "name", "distance", "location", "weather") values ($1, $2, $3, $4, $5) returning *',
        [
            new Date(),
            hike.name,
            hike.distance,
            hike.location,
            hike.weather,
        ]
      )).rows[0];
      return hikeResponse;
  },

  index: async () => {
    const hikes = (await query('select * from "hikes"')).rows;
    return hikes;
  },  
};
