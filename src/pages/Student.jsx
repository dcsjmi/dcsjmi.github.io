import { useState, memo } from "react";
import "../stylesheets/Students.css";
import "../Global.css";
import importAll from "../middleware/dynamicImport";
import { motion } from "framer-motion";
import emailIcon from "../images/core/email.png";
import linkedinIcon from "../images/core/linkedin.png";
import skillsIcon from "../images/students/skills.png";
import StudentsData from "../data/StudentData.json";

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
  visible: {
    y: 0,
    opacity: 1,
  },
};

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

function StudentCard(props) {
  return (
    <motion.div
      className="StudentCard"
      key={props.student.name}
      variants={item}
    >
      <div className="StudentImageContainer">
        <div className="StudentImageWrapper">
          <img
            src={images[props.course]?.[props.student.image] || require("../data/place_holder/placeholder.jpg")}
            alt={props.student.name}
            className="StudentImage"
          />
        </div>
        <div className="ImageCurve"></div>
      </div>
      <div className="StudentDetailsBody">
        <div className="StudentName">{props.student.name}</div>
        <div className="StudentQualification">{props.student.highQual}</div>
        <div>
          <div className="StudentSkills">
            <div>
              <img src={skillsIcon} alt="" />
              <h1>Skills</h1>
            </div>
            <h2>{props.student.skills}</h2>
          </div>
          <div className="StudentContactSection">
            <div className="StudentSectionBorder"></div>
            <div>
              <a href={props.student.linkedin} target="_blank" rel="noreferrer">
                <img
                  className="StudentContactIcon"
                  src={linkedinIcon}
                  alt="linkedin"
                />
              </a>
              <a
                href={"mailto:" + props.student.email}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  className="StudentContactIcon"
                  src={emailIcon}
                  alt="email"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const AllStudents = memo(() => {
  const AllStudentsElements = [];
  for (let course in StudentsData) {
    const CourseStudentElements = [];
    for (let student of StudentsData[course]) {
      const studentImage =
        images[course]?.[student.image] || require("../data/place_holder/placeholder.jpg");
      CourseStudentElements.push(
        <StudentCard
          key={student.name}
          student={{ ...student, image: studentImage }}
          course={course}
        />
      );
    }

    AllStudentsElements.push(
      <motion.div
        key={course}
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <div className="subheading-container">
          <h2>{course}</h2>
          <div className="subheading-border"></div>
        </div>
        <div className="StudentProfilesContainer">{CourseStudentElements}</div>
      </motion.div>
    );
  }

  return <>{AllStudentsElements}</>;
});

function partialMatch(str, pattern) {
  if (!str || !pattern) return false; // Ensure both inputs are valid strings
  const tokens = pattern.split(/[, ]+/);

  for (let token of tokens) {
    if (token === "") continue;
    let filter = new RegExp(token.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&"), "ig");
    if (str.match(filter)) {
      return true;
    }
  }
  return false;
}
function validateImages(course, image) {
  if (!images[course]) {
    console.error(`Course "${course}" does not exist in images.`);
    return false;
  }
  if (!images[course][image]) {
    console.error(`Image "${image}" does not exist for course "${course}".`);
    return false;
  }
  return true;
}
const FilteredStudentsElements = memo((props) => {
  const FilteredStudentsElements = [];

  for (let course in StudentsData) {
    for (let student of StudentsData[course]) {
      if (
        partialMatch(student.name, props.query) ||
        partialMatch(student.highQual, props.query) ||
        partialMatch(student.skills, props.query) ||
        partialMatch(course, props.query) ||
        partialMatch(student.linkedin, props.query)
      ) {
        FilteredStudentsElements.push(
          <StudentCard key={student.name} student={student} course={course} />
        );
      }
    }
  }

  return (
    <motion.div variants={container} initial="hidden" animate="visible">
      <div className="subheading-container">
        <h2>Search Results</h2>
        <div className="subheading-border"></div>
      </div>
      <div className="StudentProfilesContainer">
        {FilteredStudentsElements.length === 0 ? (
          <div className="NoResults">No results found</div>
        ) : (
          FilteredStudentsElements
        )}
      </div>
    </motion.div>
  );
});

let searchTimerID = null;

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
        <div className="subheading-border"></div>
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
  const [selectedCourse, setSelectedCourse] = useState(courses[0]); // Initialize with the first course

  return (
    <div>
      <div className="heading-container" id="StudentProfiles">
        <h1>Students' Profiles</h1>
        <div className="heading-border"></div>
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
