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

export default function Student(props) {
    
    const images = {
        "Master of Computer Application": importAll(require.context("../data/profiles_mca/", false, /\.(png|jpe?g|svg)$/)),
        "Master of Science Bioinformatics": importAll(require.context("../data/profiles_msc/", false, /\.(png|jpe?g|svg)$/))
    };

    const AllStudentsElements = []
    for (let course in StudentsData) {
        console.log(course)
        const CourseStudentElements = []
        for (let student of StudentsData[course]) {
            CourseStudentElements.push(
                <motion.div className="StudentCard" key={student.name} variants={item}>
                    <div className="StudentImageContainer">
                        <img src={images[course][student.image]} alt={student.name} className='StudentImage' />
                        <div className="ImageCurve"></div>
                    </div>
                    <div className="StudentDetailsBody">
                        <div className="StudentName">{student.name}</div>
                        <div className="StudentQualification">{student.highQual}</div>
                        <div>
                            <div className="StudentSkills">
                                <div>
                                    <img src={skillsIcon} alt="" />
                                    <h1>Skills</h1>
                                </div>
                                <h2>{student.skills}</h2>
                            </div>
                            <div className="StudentContactSection">
                                <div className="StudentSectionBorder"></div>
                                <div>
                                    <a href={student.linkedin} target="_blank" rel="noreferrer">
                                        <img className="StudentContactIcon" src={linkedinIcon} alt='linkedin' />
                                    </a>
                                    <a href={"mailto:" + student.email} target="_blank" rel="noreferrer">
                                        <img className="StudentContactIcon" src={emailIcon} alt='email' />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            );
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



    return (
        <div>
            <div className="heading-container" id="StudentProfiles">
                <h1>Students' Profiles</h1>
                <div className="heading-border"></div>
            </div>
            <div className="StudentProfilesBody">
                {AllStudentsElements}
            </div>
        </div>
    );
}