# 🎓 Alumni-Student Interaction Platform

A full-stack web application designed to enhance collaboration between alumni and students by enabling resource sharing, internships, and interactive community features.

## 🎥 Demo Video
https://drive.google.com/file/d/1-FcEr05pcgxXe97yNTAIZ9rVzBmyhNrM/view?usp=drivesdk

## 🔐 Authentication & Roles

- **Two types of users:**  
  - 👨‍🎓 **Student**  
  - 👩‍💼 **Alumni**

- **Login credentials are manually created** in the database with:
  - `email`
  - `name`
  - `role`

- Users log in with their credentials and are redirected to their respective dashboards.

## 👨‍🎓 Student Features

- ✅ **View & Edit Profile**  
  Fill or edit details like:
  - Name
  - Description
  - Currently Pursuing
  - Interested Company
  - Skills
  - Event Participations

- 📚 **Tech Library Access**  
  Download shared files uploaded by alumni such as:
  - Projects
  - Research papers
  - Technical resources

- 🧑‍💻 **Interns Group (Internship Feed)**  
  - See all posts containing internships.
  - Easily discover opportunities via a separate filtered view.

-  **Sharing their achievements**  
  - can post certifications and awards they got.

- 🧭 **Alumni Directory**  
  Search alumni by:
  - Name
  - Current working company

## 👨‍💼 Alumni Features

- ✅ **View & Edit Profile**  
  Fill or update:
  - Name
  - Description
  - Current Working Place
  - Passed Out Year
  - Skills
  - Past Working Experiences

- 📝 **Post Internship Opportunities**  
  Create posts about internships (automatically picked up by Interns Group feed) or general.

- 📁 **Upload Resources to Tech Library**  
  Share:
  - Project files
  - Paper publications
  - Learning resources

- 📰 **Interns Group & General Posts**  
  - Share regular or internship posts.
  - Both show up on home feeds (internships are auto-filtered).

- 📚 **View Student Directory**  
  Discover students and their profiles.

## 🧠 Smart Profile Handling

- ✨ If user logs in for the first time → redirected to **Edit Profile**  
- 📝 Already edited profile? → shown in **View Mode** with option to edit again anytime  
- Profiles stored in:
  - `studentProfile` collection (for students)
  - `alumniProfile` collection (for alumni)

---

## 💾 Tech Stack
- Frontend: React.js
- Backend: Node.js, Express.js
- Database: MongoDB