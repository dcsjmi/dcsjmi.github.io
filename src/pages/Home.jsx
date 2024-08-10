import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import { motion } from "framer-motion";
import importAll from "../middleware/dynamicImport";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "../stylesheets/Home.css";
import "../Global.css";
import { useState } from "react";
import CountUp from "react-countup";
import { Link } from "react-router-dom";

const motionStyle = {
  container: (delayMultipler, staggerMultiplier) => {
    return {
      hidden: { opacity: 1, scale: 0 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          delayChildren: 0.1 * delayMultipler,
          staggerChildren: 0.1 * staggerMultiplier,
        },
      },
    };
  },
  item: {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  },
};

var key = 0;
var key2 = 0;

export default function Home(props) {
  const [isPage2inView, setPage2inView] = useState(false);
  const [WasPage2inView, setWasPage2inView] = useState(false);
  const [isPage3inView, setPage3inView] = useState(false);
  const [WasPage4inView, setWasPage4inView] = useState(false);
  const [isPage4inView, setPage4inView] = useState(false);

  const images = importAll(
    require.context("../images/home", false, /\.(png|jpe?g|svg)$/)
  );

  const awards = [
    { rank: "NAAC A++", caption: "Score 3.61, NAAC 2021 Cycle 2" },
    { rank: "3rd", caption: "among the universities in India, NIRF 2023" },
    { rank: "438th", caption: "among world's top 1300 universities, RUR 2021" },
    { rank: "501-600", caption: "World University Ranking, THE 2023" },
    { rank: "301-400", caption: "Computer Science Ranking, THE 2022" },
  ];
  const Counters = [
    { count: 300, title: "Courses", suffix: true, duration: 2.0, delay: 0.1 },
    { count: 11, title: "Faculties", suffix: false, duration: 2.0, delay: 0.1 },
    {
      count: 48,
      title: "Departments",
      suffix: false,
      duration: 2.0,
      delay: 0.1,
    },
    { count: 1300, title: "Staff", suffix: true, duration: 2.0, delay: 0.1 },
    {
      count: 25000,
      title: "Students",
      suffix: true,
      duration: 2.0,
      delay: 0.1,
    },
  ];
  const DashboardItems = [
    { title: "Professors' Profiles", link: "/professors", icon: "teacher.png" },
    {
      title: "Curriculum",
      link: "/courses#curriculum",
      icon: "curriculum.png",
    },
    { title: "Students' Profiles", link: "/students", icon: "student.png" },
    { title: "Placement", link: "/placement", icon: "placement.png" },
    {
      title: "Message Section",
      link: "/about#MessageSection",
      icon: "message.png",
    },
    {
      title: "Contributors' Profiles",
      link: "/placement#contributors",
      icon: "contributors.png",
    },
    { title: "Contact Us", link: "/contact", icon: "contact.png" },
    { title: "About DCS JMI", link: "/about", icon: "about.png" },
  ];

  const slides = [];
  const numSlides = 11;
  const awardsElement = [];
  const CounterElemets = [];
  const DashboardElements = [];

  for (let i = 0; i < numSlides; i++) {
    slides.push(
      <SwiperSlide className="slide" key={i}>
        <img
          className="SlideImage"
          src={images[`Swiper_${i}.jpg`]}
          alt="SlideImage"
        />
      </SwiperSlide>
    );
  }

  for (let award of awards) {
    awardsElement.push(
      <motion.div variants={motionStyle.item} key={award.rank}>
        <div className="AchievementBG">
          <div className="AchievementContainer">
            <div className="AchievementHead">{award.rank}</div>
            <div className="AchievementContent">{award.caption}</div>
          </div>
        </div>
      </motion.div>
    );
  }

  for (let i = 0; i < Counters.length; i++) {
    let aCounter = Counters[i];
    CounterElemets.push(
      <div key={aCounter.title}>
        <div className="ThirdSectionContainer">
          <div className="CountValue">
            {isPage3inView ? (
              <CountUp
                start={0}
                end={aCounter.count}
                suffix={aCounter.suffix ? "+" : ""}
                delay={0.1}
                duration={2.0}
              />
            ) : (
              0
            )}
          </div>
          <div className="CountName">{aCounter.title}</div>
        </div>
      </div>
    );
    if (i !== Counters.length - 1)
      CounterElemets.push(<div key={i} className="CountBorder"></div>);
  }

  for (let item of DashboardItems) {
    DashboardElements.push(
      <Link to={item.link} key={item.title} style={{ textDecoration: "none" }}>
        <motion.div className="DashboardItem" variants={motionStyle.item}>
          <img src={images[item.icon]} alt="" />
          <h1>{item.title}</h1>
          <h2>Click to See More</h2>
        </motion.div>
      </Link>
    );
  }

  const FallbackViewportEnter = (oldState, stateFunction) => {
    if (!oldState) {
      stateFunction(true);
    }
  };

  return (
    <div id="Home" className="Home">
      <div className="HomeSection FirstSection">
        <Swiper
          loop={true}
          autoplay={{ delay: 3000 }}
          pagination={{ dynamicBullets: true }}
          modules={[Autoplay, Pagination]}
          className="slideHolder"
        >
          {slides}
        </Swiper>
        <div className="WelcomeContainer">
          <div className="JamiaLogo"></div>
          <h1>Department of Computer Science</h1>
          <h2>Jamia Millia Islamia</h2>
        </div>
      </div>
      <div className="HomeSection SecondSection">
        <div className="SecondSectionContainer">
          <motion.div
            key={WasPage2inView ^ isPage2inView ? ++key : key}
            className="SubContainer"
            variants={motionStyle.container(5, 5)}
            initial="hidden"
            animate={isPage2inView ? "visible" : "hidden"}
            onViewportEnter={(entry) => {
              setWasPage2inView(isPage2inView);
              setPage2inView(true);
            }}
            onViewportLeave={(entry) => {
              setWasPage2inView(isPage2inView);
              setPage2inView(false);
            }}
            whileInView={FallbackViewportEnter(isPage2inView, setPage2inView)}
          >
            {awardsElement}
          </motion.div>
        </div>
        <div className="SecondSectionContainer">
          <div className="SubContainer">
            <div>
              <div className="AboutTextHead">About Jamia Millia Islamia</div>
              <div className="AboutTextContent">
                Jamia Millia Islamia, established in 1920, is a prestigious
                Central University, located in New Delhi and accredited by NAAC
                under category A++. It is an autonomous institution established
                by an act of Parliament and the Hon’ble President of India as
                its visitor. Being the embodiment of visionaries like Mahatma
                Gandhi, Moulana Mohammad Ali Jauhar, and Dr. Zakir Hussain, this
                national institute epitomizes synthesis of ancient wisdom and
                modern scientific temper. The model of education conceived and
                enriched by its illustrious founder offers refreshing
                perspective to young minds and facilitates the accomplishments
                of their talents. The national ethos of Jamia Millia Islamia is
                reflected in its richly diverse students and teaching community
                transcending regional, ingual, religious, and even national
                boundaries. Jamia Millia Islamia has already played an important
                role during the Common Wealth Games and TOYOTA University
                Cricket Championship held in October 2010 and 2013,
                respectively.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="HomeSection ThirdSection">
        <motion.div
          className="ThirdSectionMotion"
          onViewportEnter={(entry) => setPage3inView(true)}
          onViewportLeave={(entry) => setPage3inView(false)}
        >
          {CounterElemets}
        </motion.div>
      </div>
      <div className="HomeSection FourthSection">
        <div className="heading-container">
          <h1>Dashboard</h1>
          <div className="heading-border"></div>
        </div>
        <div className="DashboardBody">
          <motion.div
            key={WasPage4inView ^ isPage4inView ? ++key2 : key2}
            variants={motionStyle.container(7, 1.5)}
            initial="hidden"
            animate={isPage4inView ? "visible" : "hidden"}
            className="DashboardRow"
            onViewportEnter={(entry) => {
              setWasPage4inView(isPage4inView);
              setPage4inView(true);
            }}
            onViewportLeave={(entry) => {
              setWasPage4inView(isPage4inView);
              setPage4inView(false);
            }}
            whileInView={FallbackViewportEnter(isPage4inView, setPage4inView)}
          >
            {DashboardElements}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
