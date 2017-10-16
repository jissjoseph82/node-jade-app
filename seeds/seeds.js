if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const clearDB = require('../lib/clearDB');

const Company = require('../models/company');
const User = require('../models/user');
const Hike = require('../models/hike');
clearDB().then(async () => {

  const hike = await Hike.create({
    hikeDate: new Date(),
    name: 'Hazard Stevens',
    distance: 20,
    location: 'Cochin',
    weather: 'Bad',
  });

  const company = await Company.create({ name: 'ABCD' });

  const user = await User.create({
    firstName: 'Tom',
    lastName: 'Jerry',
    companyId: company.id,
    email: 'tom@example.com',
    password: 'password',
  });

  user.company = company;

  await process.exit();
});
