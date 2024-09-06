import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEdit, FaPlus, FaSave, FaTrash } from 'react-icons/fa';
import { useLocation } from 'react-router-dom'; // Import useLocation
import './AlumniViewProfile.css';

const AlumniViewProfile = () => {
  const location = useLocation();
  const { email: profileEmail } = location.state || {}; // Get email from state
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [newExperience, setNewExperience] = useState({ company: '', role: '' });
  const [editingCompany, setEditingCompany] = useState(false);
  const [company, setCompany] = useState('');
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
        const response = await fetch(`http://localhost:5000/alumni?email=${email}`);
        if (response.ok) {
          const data = await response.json();
          setSkills(data.skills || []);
          setExperiences(data.pastWorkingExperiences || []);
          setCompany(data.currentWorkingPlace || '');
          setYear(data.passedOutYear || '');
          setName(data.name || '');
          setDescription(data.description || '');
          console.log(data);
        } else {
          // Profile does not exist, handle accordingly
          console.log('Profile not found');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setLoading(false);
      }
    };

    if (profileEmail) {
      fetchProfile(); // Fetch data only if email is present
    }
  }, [profileEmail]);

  const handleAddSkill = async () => {
    if (newSkill) {
      const updatedSkills = [...skills, newSkill];
      setSkills(updatedSkills);
      setNewSkill('');

      try {
        await fetch(`/alumni`, {
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
      await fetch(`/alumni`, {
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

  const handleAddExperience = async () => {
    if (newExperience.company && newExperience.role) {
      const updatedExperiences = [...experiences, newExperience];
      setExperiences(updatedExperiences);
      setNewExperience({ company: '', role: '' });

      try {
        await fetch(`/alumni`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: profileEmail, pastWorkingExperiences: updatedExperiences }),
        });
      } catch (error) {
        console.error('Error adding experience:', error);
      }
    }
  };

  const handleSaveProfile = async () => {
    try {
      const response = await fetch(`http://localhost:5000/alumni`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: profileEmail, // Ensure email is part of the request body
          name,
          description,
          currentWorkingPlace: company,
          passedOutYear: year,
          skills: skills,
          pastWorkingExperiences: experiences,
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
          src="/alumni.jpg"
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
        {/* Company Section */}
        <div className="profile-section">
          <h4>
            Currently Working At
            {editMode && (
              <button className="btn btn-link" onClick={() => setEditingCompany(!editingCompany)}>
                {editingCompany ? <FaSave /> : <FaEdit />}
              </button>
            )}
          </h4>
          {editingCompany ? (
            <input
              type="text"
              className="form-control"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          ) : (
            <p>{company}</p>
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

        {/* Past Working Experiences Section */}
        <div className="profile-section">
          <h4>Past Working Experiences</h4>
          <ul className="experience-list">
            {experiences.map((exp, index) => (
              <li key={index}>
                <strong>{exp.company}</strong> - {exp.role}
              </li>
            ))}
          </ul>
          {editMode && (
            <div className="add-experience">
              <input
                type="text"
                className="form-control"
                placeholder="Company"
                value={newExperience.company}
                onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
              />
              <input
                type="text"
                className="form-control"
                placeholder="Role"
                value={newExperience.role}
                onChange={(e) => setNewExperience({ ...newExperience, role: e.target.value })}
              />
              <button className="btn btn-primary" onClick={handleAddExperience}>
                <FaPlus />
              </button>
            </div>
          )}
        </div>

        {/* Save Button */}
        {editMode && (
          <div className="save-button">
            <button className="btn btn-success" onClick={handleSaveProfile}>
              <FaSave /> Save Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlumniViewProfile;
