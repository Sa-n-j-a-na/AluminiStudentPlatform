const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const port = 5000;

// MongoDB connection URI
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

let mongoClient = null;

// Function to connect to the database
const connectToDatabase = async () => {
  if (!mongoClient) {
    mongoClient = await client.connect();
  }
  return mongoClient;
};

// Middleware
app.use(bodyParser.json());
app.use(cors());

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

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
