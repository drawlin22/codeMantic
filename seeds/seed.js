const sequelize = require('../config/connection');
const { User, Form } = require('../models');
const bcrypt = require('bcrypt'); // added bcyrpt so declared but value never read 

const userData = require('./userData.json');
const formData = require('./formData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const form of formData) {
    await Form.create({
      ...form,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();



  
  


  
 
   




