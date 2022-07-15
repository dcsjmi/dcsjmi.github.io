import { useState, memo } from "react";
import "../stylesheets/Students.css"
import "../Global.css"
import importAll from "../middleware/dynamicImport"
import { motion } from "framer-motion";
import emailIcon from '../images/core/email.png'
import linkedinIcon from '../images/core/linkedin.png'
import skillsIcon from "../images/students/skills.png"
import StudentsData from "../data/StudentData.json"


const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            delayChildren: 0.025,
            staggerChildren: 0.05
        }
    }
};

const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1
    }
};

const images = {
    "Master of Computer Application": importAll(require.context("../data/profiles_mca/", false, /\.(png|jpe?g|svg)$/)),
    "Master of Science Bioinformatics": importAll(require.context("../data/profiles_msc/", false, /\.(png|jpe?g|svg)$/))
};

function StudentCard(props) {
    return (
        <motion.div className="StudentCard" key={props.student.name} variants={item}>
            <div className="StudentImageContainer">
                <img src={images[props.course][props.student.image]} alt={props.student.name} className='StudentImage' />
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
                                <img className="StudentContactIcon" src={linkedinIcon} alt='linkedin' />
                            </a>
                            <a href={"mailto:" + props.student.email} target="_blank" rel="noreferrer">
                                <img className="StudentContactIcon" src={emailIcon} alt='email' />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

const AllStudents = memo(() => {
    const AllStudentsElements = []
    for (let course in StudentsData) {

        const CourseStudentElements = []
        for (let student of StudentsData[course]) {
            CourseStudentElements.push(<StudentCard key={student.name} student={student} course={course} />);
        }

        AllStudentsElements.push(
            <motion.div key={course}
                variants={container}
                initial="hidden"
                animate="visible"
            >
                <div className="subheading-container">
                    <h2>{course}</h2>
                    <div className="subheading-border"></div>
                </div>
                <div className="StudentProfilesContainer">
                    {CourseStudentElements}
                </div>
            </motion.div>
        );
    }

    return AllStudentsElements;
});

function partialMatch(str, pattern) {
    const tokens = pattern.split(/[, ]+/);

    for (let token of tokens) {
        if (token === "")
            continue;
        let filter = new RegExp(token.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&'), "ig");
        if (str.match(filter)) {
            return true;
        }
    }
    return false;
}

const FilteredStudentsElements = memo((props) => {
    const FilteredStudentsElements = [];


    for (let course in StudentsData) {

        for (let student of StudentsData[course]) {
            if (partialMatch(student.name, props.query) || partialMatch(student.highQual, props.query) || partialMatch(student.skills, props.query) || partialMatch(course, props.query) || partialMatch(student.linkedin, props.query)) {
                FilteredStudentsElements.push(<StudentCard key={student.name} student={student} course={course} />);
            }
        }
    }

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
        >
            <div className="subheading-container">
                <h2>Search Results</h2>
                <div className="subheading-border"></div>
            </div>
            <div className="StudentProfilesContainer">
                {FilteredStudentsElements.length === 0 ? <div className="NoResults">No results found</div> : FilteredStudentsElements}
            </div>
        </motion.div>
    );
});

let searchTimerID = null;

export default function Student(props) {
    const [searchQuery, setSearchQuery] = useState("");

    const onChange = (e) => {
        clearTimeout(searchTimerID);
        searchTimerID = setTimeout(() => {
            setSearchQuery(e.target.value)
            clearTimeout(searchTimerID);
        }, 200);
    }

    return (
        <div>
            <div className="heading-container" id="StudentProfiles">
                <h1>Students' Profiles</h1>
                <div className="heading-border"></div>
            </div>
            <div className="SearchBarHolder">
                <input className='SearchBar' type="text" placeholder="Search Student Name/Skills" onChange={onChange} />
            </div>
            <div className="StudentProfilesBody" style={{ display: searchQuery === "" ? 'block' : 'none' }}>
                <AllStudents />
            </div>
            <div className="StudentProfilesBody" style={{ display: searchQuery === "" ? 'none' : 'block' }}>
                <FilteredStudentsElements query={searchQuery} />
            </div>
        </div>
    );
}