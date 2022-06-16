import "../stylesheets/Professors.css"
import "../Global.css"
import importAll from "../middleware/dynamicImport"
import { motion } from "framer-motion"
import experienceIcon from "../images/professors/experience.png"
import specializationIcon from "../images/professors/specialization.png"
import ProfessorData from "../data/Professors.json"

const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            delayChildren: 0.1,
            staggerChildren: 0.15
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

export default function Professor(props) {
    const images = importAll(require.context("../data/profiles_professors", false, /\.(png|jpe?g|svg)$/));

    const ProfessorElements = [];
    for (let professor of ProfessorData) {
        let SpecialDesignationElement = professor.SpecialDesignation !== '' ? <div className="SpecialDesignation">{professor.SpecialDesignation}</div> : null;
        ProfessorElements.push(
            <motion.div className="ProfessorCard" key={professor.Name} variants={item}>
                {SpecialDesignationElement}
                <div className="ProfessorImageContainer">
                    <img src={images[professor["Image"]]} alt={professor.Name} className={professor.SpecialDesignation !== '' ? 'ProfessorImage NoBorderRadius' : 'ProfessorImage'} />
                </div>
                <div className="ProfessorName">{professor.Name}</div>
                <div className="ProfessorDesignation">{professor.Designation}</div>
                <div>
                    <div className={professor.SpecialDesignation === '' ? "ProfessorDetail GeneralProfessor" : 'ProfessorDetail'}>
                        <div>
                            <img src={experienceIcon} alt="" className="ProfessorExperienceIcon" />
                            <h1>Experience</h1>
                        </div>
                        <h2>{professor.Experience} Years</h2>
                    </div>
                    <div className="ProfessorDetail">
                        <div>
                            <img src={specializationIcon} alt="" className="ProfessorExperienceIcon" />
                            <h1>Specialization</h1>
                        </div>
                        <h3>{professor.Specialization}</h3>
                    </div>
                </div>
            </motion.div>
        );
    }

    return (
        <div id="ProfessorsProfiles">
            <div className="heading-container">
                <h1>Professors' Profiles</h1>
                <div className="heading-border"></div>
            </div>
            <motion.div className="ProfessorsProfileSection"
                variants={container}
                initial="hidden"
                animate="visible"
            >
                {ProfessorElements}
            </motion.div>
        </div>
    );
}