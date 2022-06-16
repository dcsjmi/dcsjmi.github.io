import "../stylesheets/Courses.css"
import "../Global.css"
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import importAll from "../middleware/dynamicImport"
import durationIco from "../images/course/hourglass.png"
import typeIco from "../images/course/full-time-job.png"
import specializationIco from "../images/course/graduation-cap.png"
import CourseData from "../data/Courses.json"

export default function Courses(props) {
    const images = importAll(require.context("../images/course", false, /\.(png|jpe?g|svg)$/));
    const CoursesElements = [];
    const CurriculumElements = [];
    for (let course in CourseData) {
        CoursesElements.push(
            <div className="CourseContainer" key={CourseData[course].FullName}>
                <img src={images[CourseData[course].Image]} alt="mca class" className="CourseImage" />
                <div className="CourseInfo">
                    <div className="CourseHead">{CourseData[course].FullName}</div>
                    <div className="CourseDetails">{CourseData[course].Summary}</div>
                </div>
                <div className="CourseCaption">
                    <div className="CaptionItem">
                        <img src={durationIco} alt="duration" className="CaptionItemIcon" />
                        <h4>{CourseData[course].Duration}</h4>
                    </div>
                    <div className="CaptionItem">
                        <img src={typeIco} alt="duration" className="CaptionItemIcon" />
                        <h4>{CourseData[course].Type}</h4>
                    </div>
                    <div className="CaptionItem">
                        <img src={specializationIco} alt="duration" className="CaptionItemIcon" />
                        <h4>{CourseData[course].Specialization}</h4>
                    </div>
                </div>
            </div>
        );


        let syllabusElement = []
        for (let syllabus of CourseData[course]['Syllabus']) {
            let subjectsElements = []

            for (let subject of syllabus.Structure) {
                let subjectNames = subject.Courses.map(courseName => <h3 key={courseName}> - {courseName}</h3>);
                subjectsElements.push(
                    <div className="SemesterContent" key={subject.Category}>
                        <h2>{subject.Category}</h2>
                        {subjectNames}
                    </div>
                );
            }

            syllabusElement.push(
                <SwiperSlide className="CourseSlideContainer" key={syllabus.Name}>
                    <div className="SemesterHead">{syllabus.Name}</div>
                    {subjectsElements}
                </SwiperSlide>
            );
        }

        CurriculumElements.push(
            <div key={course}>
                <div className="subheading-container">
                    <h2>{CourseData[course].FullName}</h2>
                    <div className="subheading-border"></div>
                </div>
                <div className="CurriculumContainer">
                    <Swiper
                        slidesPerView={"auto"}
                        navigation={true}
                        pagination={{ dynamicBullets: true }}
                        modules={[Pagination, Navigation]}
                        className="CourseSlideHolder"
                    >
                        {syllabusElement}
                    </Swiper>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div id="CoursePage" className="CoursePageSection">
                <div className="heading-container">
                    <h1>Masters Programmes</h1>
                    <div className="heading-border"></div>
                </div>
                <div className="CoursesList">
                    {CoursesElements}
                </div>
            </div>
            <div className="CoursePageSection">
                <div id='curriculum' className="heading-container">
                    <h1>Curriculum</h1>
                    <div className="heading-border"></div>
                </div>
                <div className="CurriculumBody">
                    {CurriculumElements}
                </div>
            </div>
        </div>
    );
}