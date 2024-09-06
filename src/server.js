const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const fs = require('fs');



const app = express();
const port = 5000;

// MongoDB connection URI
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

// MongoDB connection URI for Mongoose
const mongooseUri = 'mongodb://localhost:27017/studentApp'; // Use your actual database name

// Connect to MongoDB using Mongoose
mongoose.connect(mongooseUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Mongoose connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});


let mongoClient = null;

// Function to connect to the database
const connectToDatabase = async () => {
  if (!mongoClient) {
    mongoClient = await client.connect();
  }
  return mongoClient;
};

const techLibrarySchema = new mongoose.Schema({
  folder: String,
  fileName: String,
  filePath: String,
  uploadedBy: String,
  uploadDate: {
    type: Date,
    default: Date.now
  }
});

const TechLibrary = mongoose.model('TechLibrary', techLibrarySchema);

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use('/upload', express.static(path.join(__dirname, 'upload'))); 

const uploadDir = path.join(__dirname, 'upload');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure multer for file uploads
const storageUp = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'upload')); // Correctly points to 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Unique filename
  }
});
const uploadUp = multer({ storage: storageUp });


// Route for alumni to upload a file
// Route for alumni to upload a file
app.post('/techLibrary/upload', uploadUp.single('file'), async (req, res) => {
  const { folder, email } = req.body;

  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const newFile = new TechLibrary({
      folder,
      fileName: req.file.filename,
      filePath: req.file.path,
      uploadedBy: email,
    });

    await newFile.save();
    res.status(200).json({ message: 'File uploaded successfully!' });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
});



// Route for students to get files from a specific folder
app.get('/techLibrary/files/:folder', async (req, res) => {
  try {
    const files = await TechLibrary.find({ folder: req.params.folder }).exec();
    res.status(200).json(files);
  } catch (error) {
    console.error('Error fetching files:', error);
    res.status(500).json({ error: 'Failed to fetch files' });
  }
});

// Endpoint to fetch alumni profiles by email
app.get('/alumni', async (req, res) => {
  const { email } = req.query;

  try {
    const client = await connectToDatabase();
    const database = client.db('studentApp');
    const profile = await database.collection('alumniProfile').findOne({ email });

    if (profile) {
      res.status(200).json(profile);
    } else {
      res.status(404).json({ message: 'Profile not found' });
    }
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

// Endpoint to create or update alumni profile
app.post('/alumni', async (req, res) => {
  const { email: emailObject, name, description, currentWorkingPlace, passedOutYear, skills, pastWorkingExperiences } = req.body;

  // Extract email string from emailObject
  const email = emailObject.email;

  try {
    const client = await connectToDatabase();
    const database = client.db('studentApp');
    
    // Check if the profile exists
    const existingProfile = await database.collection('alumniProfile').findOne({ email });

    if (existingProfile) {
      // Update existing profile
      await database.collection('alumniProfile').updateOne(
        { email },
        {
          $set: {
            name,
            description,
            currentWorkingPlace,
            passedOutYear,
            skills,
            pastWorkingExperiences,
          },
        }
      );
      res.status(200).json({ message: 'Profile updated successfully' });
    } else {
      // Insert new profile
      await database.collection('alumniProfile').insertOne({
        email, // Store email directly as a string
        name,
        description,
        currentWorkingPlace,
        passedOutYear,
        skills,
        pastWorkingExperiences,
      });
      res.status(201).json({ message: 'Profile created successfully' });
    }
  } catch (error) {
    console.error('Error saving profile:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

// Endpoint to fetch student profile by email
app.get('/student', async (req, res) => {
    const { email } = req.query;
  
    try {
      const client = await connectToDatabase();
      const database = client.db('studentApp');
      const profile = await database.collection('studentProfile').findOne({ email });
  
      if (profile) {
        res.status(200).json(profile);
      } else {
        res.status(404).json({ message: 'Profile not found' });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      res.status(500).json({ message: 'Server error', error });
    }
  });
  
  // Endpoint to create or update student profile
  app.post('/student', async (req, res) => {
    const { email: emailObject, name, description, currentlyPursuing, interestedCompany, skills, eventsParticipations } = req.body;
  
    // Extract email string from emailObject
    const email = emailObject.email;
  
    try {
      const client = await connectToDatabase();
      const database = client.db('studentApp');
      
      // Check if the profile exists
      const existingProfile = await database.collection('studentProfile').findOne({ email });
  
      if (existingProfile) {
        // Update existing profile
        await database.collection('studentProfile').updateOne(
          { email },
          {
            $set: {
              name,
              description,
              currentlyPursuing,
              interestedCompany,
              skills,
              eventsParticipations,
            },
          }
        );
        res.status(200).json({ message: 'Profile updated successfully' });
      } else {
        // Insert new profile
        await database.collection('studentProfile').insertOne({
          email, // Store email directly as a string
          name,
          description,
          currentlyPursuing,
          interestedCompany,
          skills,
          eventsParticipations,
        });
        res.status(201).json({ message: 'Profile created successfully' });
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      res.status(500).json({ message: 'Server error', error });
    }
  });
  const publicUploadsPath = path.resolve(__dirname, '..', 'public', 'uploads');
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // Ensure this path points to 'public/uploads'
      cb(null, publicUploadsPath);
    },
    filename: (req, file, cb) => {
      // Use a timestamp as the file name to ensure uniqueness
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
  
  const upload = multer({ storage });
  
  // Serve static files from the 'public/uploads' directory
  app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));
  
  // Endpoint to create a post
  app.post('/posts', upload.single('image'), async (req, res) => {
    const { email, title, description, date } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null; // Store relative path
  
    try {
      const client = await connectToDatabase();
      const database = client.db('studentApp');
  
      await database.collection('posts').insertOne({
        email,
        title,
        description,
        date,
        image,
      });
  
      res.status(201).json({ message: 'Post created successfully' });
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({ message: 'Server error', error });
    }
  });
  
  // Endpoint to get posts by email
  app.get('/myposts/:email', async (req, res) => {
    const { email } = req.params;
    console.log("Fetching posts for email: " + email);
  
    try {
      const client = await connectToDatabase();
      const database = client.db('studentApp');
  
      const posts = await database.collection('posts').find({ email }).toArray();
  
      res.status(200).json(posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ message: 'Server error', error });
    }
  });

// Add this endpoint to your existing server.js
app.get('/getname/:email', async (req, res) => {
  const { email } = req.params;
  try {
    const client = await connectToDatabase();
    const database = client.db('studentApp');
    const user = await database.collection('users').findOne({ email }); // Assuming users collection
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ email: user.email, name: user.name });
  } catch (error) {
    console.error('Error fetching user name:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

// Add this endpoint to your existing server.js
app.get('/internposts', async (req, res) => {
  try {
    const client = await connectToDatabase();
    const database = client.db('studentApp');

    // Fetch all posts
    const posts = await database.collection('posts').find().toArray();

    // Filter posts containing the word 'internship'
    const internshipPosts = posts.filter(post => /internship/i.test(post.title));

    res.status(200).json(internshipPosts);
  } catch (error) {
    console.error('Error fetching internship posts:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

// Endpoint to fetch all alumni profiles
app.get('/api/alumni', async (req, res) => {
  console.log("hello from alumni deirectory");
  try {
    const client = await connectToDatabase();
    const database = client.db('studentApp');

    // Fetch all alumni profiles
    const alumniProfiles = await database.collection('alumniProfile').find().toArray();

    res.status(200).json(alumniProfiles);
  } catch (error) {
    console.error('Error fetching alumni profiles:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
