const mongoose = require('mongoose');

const techLibrarySchema = new mongoose.Schema({
  folder: String,
  fileName: String,
  filePath: String,
  uploadedBy: String,  // email of the alumni
  uploadDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('TechLibrary', techLibrarySchema);