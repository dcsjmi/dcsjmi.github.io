import "../stylesheets/Footer.css";
import "../Global.css";
import { Link } from "react-router-dom";
import contactInfo from "../data/contact.json";
import jmiLogo from "../images/core/logoTransparent.png";
import emailIcon from "../images/core/email.png";
import linkedinIcon from "../images/core/linkedin.png";
import messageIcon from "../images/core/message.png";

export default function Footer(props) {
  const ContactsElement = [];
  for (let contactType in contactInfo) {
    let contactsList = [];
    for (let person of contactInfo[contactType]) {
      contactsList.push(
        person.phone !== "" ? (
          <a
            key={person.name}
            className="ContactLink"
            href={"tel:" + person.phone}
            target="_blank"
            rel="noreferrer"
          >
            {person.name}
            <br />
            {person.phone}
          </a>
        ) : (
          <a
            key={person.name}
            className="ContactLink"
            href={"mailto:" + person.mail}
            target="_blank"
            rel="noreferrer"
          >
            {person.name}
            <br />
            {person.mail}
          </a>
        )
      );
    }
    ContactsElement.push(
      <div key={contactType}>
        <div className="RowHead">{contactType}</div>
        {contactsList}
      </div>
    );
  }

  return (
    <div className="Footer">
      <div className="FooterBody">
        <div className="FooterCol">
          <div className="AlignCenter marginPaddingNone">
            <img className="FooterLogo" src={jmiLogo} alt="Jamia Logo" />
          </div>
          <div className="ColHead AlignCenter marginPaddingNone">
            Jamia Millia Islamia
          </div>
          <div className="RowHead AlignCenter marginPaddingNone">
            A Central University
          </div>
          <a
            className="ContactLink AlignCenter"
            href="https://www.jmi.ac.in"
            target="_blank"
            rel="noreferrer"
          >
            www.jmi.ac.in
          </a>
        </div>
        <div className="FooterCol">
          <div className="ColHead">Social</div>
          <div className="ColBody">
            <a
              className="ContactLink animateHover"
              href="mailto:dcs_plmt_mca@jmi.ac.in"
              target="_blank"
              rel="noreferrer"
            >
              <span>
                <img className="RowIcon" src={emailIcon} alt="Email Icon" />
              </span>
              <span>dcs_plmt_mca@jmi.ac.in</span>
            </a>
            <a
              className="ContactLink animateHover"
              href="https://www.linkedin.com/company/mca-placement-cell/"
              target="_blank"
              rel="noreferrer"
            >
              <span>
                <img className="RowIcon" src={linkedinIcon} alt="Email Icon" />
              </span>
              <span>LinkedIn</span>
            </a>
            <Link
              className="ContactLink animateHover"
              to="/contact#SendMessage"
            >
              <span>
                <img className="RowIcon" src={messageIcon} alt="Email Icon" />
              </span>
              <span>Send a Message</span>
            </Link>
          </div>
          <div className="ColHead">Quick Links</div>
          <Link className="ContactLink" to="/placement">
            Placement
          </Link>
          <Link className="ContactLink" to="/professors">
            Professors
          </Link>
          <Link className="ContactLink" to="/students">
            Students
          </Link>
          <Link className="ContactLink" to="/about">
            About DCS
          </Link>
        </div>
        <div className="FooterCol">
          <div className="ColHead">Contact</div>
          <div className="ColBody">{ContactsElement}</div>
        </div>
        <div className="FooterCol">
          <div className="ColHead">Reach Us</div>
          <div className="ColBody">
            <div className="RowHead">Map</div>
            <div className="RowContent">
              <iframe
                title="DCS Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.2187629347413!2d77.2782169154109!3d28.563192893965944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce38c812c0029%3A0x73f56fbe2fc71d28!2sDepartment%20of%20Computer%20Science!5e0!3m2!1sen!2sin!4v1652941169155!5m2!1sen!2sin"
                width="300"
                height="150"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="RowHead">Address</div>
            <div className="RowContent">
              Department of Computer Science, <br /> Maulana Mohammad Ali Jauhar
              Marg, <br /> Jamia Millia Islamia, <br /> Jamia Nagar, Okhla, New
              Delhi, Delhi-110025
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
