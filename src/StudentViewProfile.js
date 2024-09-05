import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEdit, FaPlus, FaSave, FaTrash } from 'react-icons/fa';
import { useLocation } from 'react-router-dom'; // Import useLocation
import './StudentViewProfile.css';

const StudentViewProfile = () => {
  const location = useLocation();
  const { email: profileEmail } = location.state || {}; // Get email from state
  const [skills, setSkills] = useState([]);
  const [events, setEvents] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [newEvent, setNewEvent] = useState({ eventName: '', description: '' });
  const [editingCourse, setEditingCourse] = useState(false);
  const [course, setCourse] = useState('');
  const [editingYear, setEditingYear] = useState(false);
  const [year, setYear] = useState('');
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  // States for editing name and description
  const [editingName, setEditingName] = useState(false);
  const [name, setName] = useState('');
  const [editingDescription, setEditingDescription] = useState(false);
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const email = profileEmail.email;
        const response = await fetch(`http://localhost:5000/student?email=${email}`);
        if (response.ok) {
          const data = await response.json();
          setSkills(data.skills || []);
          setEvents(data.eventsParticipations || []);
          setCourse(data.currentlyPursuing || '');
          setYear(data.passedOutYear || '');
          setName(data.name || '');
          setDescription(data.description || '');
          console.log(data);
        } else {
          console.log('Profile not found');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setLoading(false);
      }
    };

    if (profileEmail) {
      fetchProfile();
    }
  }, [profileEmail]);

  const handleAddSkill = async () => {
    if (newSkill) {
      const updatedSkills = [...skills, newSkill];
      setSkills(updatedSkills);
      setNewSkill('');

      try {
        await fetch(`/student`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: profileEmail, skills: updatedSkills }),
        });
      } catch (error) {
        console.error('Error updating skills:', error);
      }
    }
  };

  const handleRemoveSkill = async (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);

    try {
      await fetch(`/student`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: profileEmail, skills: updatedSkills }),
      });
    } catch (error) {
      console.error('Error removing skill:', error);
    }
  };

  const handleAddEvent = async () => {
    if (newEvent.eventName && newEvent.description) {
      const updatedEvents = [...events, newEvent];
      setEvents(updatedEvents);
      setNewEvent({ eventName: '', description: '' });

      try {
        await fetch(`/student`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: profileEmail, eventsParticipations: updatedEvents }),
        });
      } catch (error) {
        console.error('Error adding event:', error);
      }
    }
  };

  const handleSaveProfile = async () => {
    try {
      const response = await fetch(`http://localhost:5000/student`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: profileEmail, // Ensure email is part of the request body
          name,
          description,
          currentlyPursuing: course,
          passedOutYear: year,
          skills: skills,
          eventsParticipations: events,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to save profile: ${errorText}`);
      }
      setEditMode(false);
      const result = await response.json();
      console.log('Profile saved:', result);
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header text-center">
        <img
          src="https://via.placeholder.com/150"
          alt="Profile"
          className="rounded-circle profile-image"
        />
        <h2 className="mt-3">
          {editingName ? (
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          ) : (
            name
          )}
          {editMode && (
            <button className="btn btn-link" onClick={() => setEditingName(!editingName)}>
              {editingName ? <FaSave /> : <FaEdit />}
            </button>
          )}
        </h2>
        <p>
          {editingDescription ? (
            <input
              type="text"
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          ) : (
            description
          )}
          {editMode && (
            <button className="btn btn-link" onClick={() => setEditingDescription(!editingDescription)}>
              {editingDescription ? <FaSave /> : <FaEdit />}
            </button>
          )}
        </p>
        <button className="btn btn-secondary btn-sm position-absolute top-0 end-0 m-2" onClick={() => setEditMode(!editMode)}>
          {editMode ? 'Cancel' : 'Edit'}
        </button>
      </div>

      <div className="profile-content">
        {/* Currently Pursuing Section */}
        <div className="profile-section">
          <h4>
            Currently Pursuing
            {editMode && (
              <button className="btn btn-link" onClick={() => setEditingCourse(!editingCourse)}>
                {editingCourse ? <FaSave /> : <FaEdit />}
              </button>
            )}
          </h4>
          {editingCourse ? (
            <input
              type="text"
              className="form-control"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            />
          ) : (
            <p>{course}</p>
          )}
        </div>

        {/* Passed Out Year Section */}
        <div className="profile-section">
          <h4>
            Passed Out Year
            {editMode && (
              <button className="btn btn-link" onClick={() => setEditingYear(!editingYear)}>
                {editingYear ? <FaSave /> : <FaEdit />}
              </button>
            )}
          </h4>
          {editingYear ? (
            <input
              type="text"
              className="form-control"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          ) : (
            <p>{year}</p>
          )}
        </div>

        {/* Skills Section */}
        <div className="profile-section">
          <h4>Skills</h4>
          <ul className="skills-list">
            {skills.map((skill, index) => (
              <li key={index} className="skill-item">
                {skill}
                {editMode && (
                  <button className="btn btn-danger btn-sm ms-2" onClick={() => handleRemoveSkill(index)}>
                    <FaTrash />
                  </button>
                )}
              </li>
            ))}
          </ul>
          {editMode && (
            <div className="add-skill">
              <input
                type="text"
                className="form-control"
                placeholder="Add a new skill"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
              />
              <button className="btn btn-primary" onClick={handleAddSkill}>
                <FaPlus />
              </button>
            </div>
          )}
        </div>

        {/* Events Participation Section */}
        <div className="profile-section">
          <h4>Events Participation</h4>
          <ul className="event-list">
            {events.map((event, index) => (
              <li key={index}>
                <strong>{event.eventName}</strong> - {event.description}
              </li>
            ))}
          </ul>
          {editMode && (
            <div className="add-event">
              <input
                type="text"
                className="form-control"
                placeholder="Event Name"
                value={newEvent.eventName}
                onChange={(e) => setNewEvent({ ...newEvent, eventName: e.target.value })}
              />
              <input
                type="text"
                className="form-control"
                placeholder="Description"
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              />
              <button className="btn btn-primary" onClick={handleAddEvent}>
                <FaPlus />
              </button>
            </div>
          )}
        </div>
      </div>

      {editMode && (
        <button className="btn btn-success" onClick={handleSaveProfile}>
          Save Profile
        </button>
      )}
    </div>
  );
};

export default StudentViewProfile;
