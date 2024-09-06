import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AlumniDirectory.css"; // Create a new CSS file for this component

function AlumniDirectory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [alumni, setAlumni] = useState([]);

  useEffect(() => {
    // Fetch alumni data from the server
    axios
      .get("http://localhost:5000/api/alumni")
      .then((response) => {
        setAlumni(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the alumni data!", error);
      });
  }, []);

  const filteredAlumni = alumni.filter((alum) => {
    const term = searchTerm.toLowerCase();
    // Use default empty string if properties are undefined
    const name = alum.name ? alum.name.toLowerCase() : '';
    const company = alum.workingCompany ? alum.workingCompany.toLowerCase() : '';
    const year = alum.passOutYear ? alum.passOutYear.toString() : '';

    return (
      name.includes(term) ||
      company.includes(term) ||
      year.includes(term)
    );
  });

  return (
    <div className="alumni-directory-container">
      <h2 className="alumni-heading">Alumni Directory</h2>
      <input
        type="text"
        className="search-bar"
        placeholder="Search by name, company, or pass out year"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className="alumni-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Pass Out Year</th>
            <th>Working Company</th>
          </tr>
        </thead>
        <tbody>
          {filteredAlumni.length > 0 ? (
            filteredAlumni.map((alum) => (
              <tr key={alum.id}>
                <td>{alum.name}</td>
                <td>{alum.passedOutYear}</td>
                <td>{alum.currentWorkingPlace}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No Alumni Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AlumniDirectory;
