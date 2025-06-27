import { useState, memo } from "react";
import { motion } from "framer-motion";
import importAll from "../middleware/dynamicImport";

import "../stylesheets/Students.css";
import "../Global.css";

import StudentsData from "../data/StudentData.json";
import emailIcon from "../images/core/email.png";
import linkedinIcon from "../images/core/linkedin.png";
import skillsIcon from "../images/students/skills.png";

// Animation Variants
const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.025,
      staggerChildren: 0.05,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

// Dynamic image imports by course
const images = {
  "Master of Computer Application": importAll(
    require.context("../data/profiles_mca/", false, /\.(png|jpe?g|svg)$/)
  ),
  "Master of Science Bioinformatics": importAll(
    require.context("../data/profiles_msc_bio/", false, /\.(png|jpe?g|svg)$/)
  ),
  "Master of Science AI/ML": importAll(
    require.context("../data/profiles_msc_ai/", false, /\.(png|jpe?g|svg)$/)
  ),
};


function StudentCard({ student, course }) {
  const studentImage =
    images[course]?.[student.image] || require("../data/place_holder/placeholder.jpg");

  return (
    <motion.div className="StudentCard" variants={item}>
      <div className="StudentImageContainer">
        <div className="StudentImageWrapper">
          <img src={studentImage} alt={student.name} className="StudentImage" />
        </div>
        <div className="ImageCurve" />
      </div>

      <div className="StudentDetailsBody">
        <div className="StudentName">{student.name}</div>
        <div className="StudentQualification">{student.highQual}</div>

        <div className="StudentSkills">
          <div>
            <img src={skillsIcon} alt="" />
            <h1>Skills</h1>
          </div>
          <h2 title={student.skills}>{student.skills}</h2>
        </div>

        <div className="StudentContactSection">
          <div className="StudentSectionBorder" />
          <div>
            <a href={student.linkedin} target="_blank" rel="noreferrer">
              <img src={linkedinIcon} alt="LinkedIn" className="StudentContactIcon" />
            </a>
            <a href={`mailto:${student.email}`} target="_blank" rel="noreferrer">
              <img src={emailIcon} alt="Email" className="StudentContactIcon" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const AllStudents = memo(() => {
  return (
    <>
      {Object.entries(StudentsData).map(([course, students]) => (
        <motion.div key={course} variants={container} initial="hidden" animate="visible">
          <div className="subheading-container">
            <h2>{course}</h2>
            <div className="subheading-border" />
          </div>
          <div className="StudentProfilesContainer">
            {students.map((student) => (
              <StudentCard key={student.name} student={student} course={course} />
            ))}
          </div>
        </motion.div>
      ))}
    </>
  );
});


function partialMatch(str, pattern) {
  if (!str || !pattern) return false;
  const tokens = pattern.split(/[, ]+/);
  return tokens.some((token) => {
    if (!token) return false;
    const regex = new RegExp(token.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&"), "i");
    return regex.test(str);
  });
}

// Not used as above, it is handled in StudentCard used a placeholder instead
function validateImages(course, image) {
  if (!images[course]) {
    console.error(`Course "${course}" not found.`);
    return false;
  }
  if (!images[course][image]) {
    console.error(`Image "${image}" not found for "${course}".`);
    return false;
  }
  return true;
}


// Defined for search functionality but never read.
const FilteredStudentsElements = memo(({ query }) => {
  const results = [];

  Object.entries(StudentsData).forEach(([course, students]) => {
    students.forEach((student) => {
      if (
        partialMatch(student.name, query) ||
        partialMatch(student.highQual, query) ||
        partialMatch(student.skills, query) ||
        partialMatch(course, query) ||
        partialMatch(student.linkedin, query)
      ) {
        results.push(<StudentCard key={student.name} student={student} course={course} />);
      }
    });
  });

  return (
    <motion.div variants={container} initial="hidden" animate="visible">
      <div className="subheading-container">
        <h2>Search Results</h2>
        <div className="subheading-border" />
      </div>
      <div className="StudentProfilesContainer">
        {results.length > 0 ? results : <div className="NoResults">No results found</div>}
      </div>
    </motion.div>
  );
});


const CourseButton = ({ course, isActive, onClick }) => (
  <button
    className={`CourseButton ${isActive ? "active" : ""}`}
    onClick={() => onClick(course)}
  >
    {course}
  </button>
);

const FilteredStudents = memo(({ course }) => {
  const students = StudentsData[course] || [];

  return (
    <motion.div variants={container} initial="hidden" animate="visible">
      <div className="subheading-container">
        <h2>{course}</h2>
        <div className="subheading-border" />
      </div>
      <div className="StudentProfilesContainer">
        {students.map((student) => (
          <StudentCard key={student.name} student={student} course={course} />
        ))}
      </div>
    </motion.div>
  );
});

export default function Student() {
  const courses = Object.keys(StudentsData);
  const [selectedCourse, setSelectedCourse] = useState(courses[0]);

  return (
    <div>
      <div className="heading-container" id="StudentProfiles">
        <h1>Students' Profiles</h1>
        <div className="heading-border" />
      </div>

      <div className="CourseButtonContainer">
        {courses.map((course) => (
          <CourseButton
            key={course}
            course={course}
            isActive={selectedCourse === course}
            onClick={setSelectedCourse}
          />
        ))}
      </div>

      <div className="StudentProfilesBody">
        <FilteredStudents course={selectedCourse} />
      </div>
    </div>
  );
}
