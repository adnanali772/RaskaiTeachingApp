const mongoose = require('mongoose');

function connectToMongoDB() {
  mongoose.connect(process.env.MONGODB_URL);

  mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
  });

  mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });
}

// Export the function for reusability
module.exports = connectToMongoDB;
