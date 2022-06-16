import linkedinIco from "../images/contact/linkedin.png"
import emailIco from "../images/contact/email.png"
import phoneIco from "../images/contact/phone.png"
import "../stylesheets/contact.css"
import "../Global.css"

export default function Contact(props) {
    return (
        <div id="ContactUs">
            <div className="heading-container">
                <h1>Contact Us</h1>
                <div className="heading-border"></div>
            </div>
            <div className="ContactsContainer">
                <div className="ContactLinksContainer">
                    <div>
                        <a href="tel:" target="blank" rel="noreferrer">
                            <img src={phoneIco} alt="linkedin" />
                        </a>
                        <a href="mailto:dcs_plmt_mca@jmi.ac.in" target="blank" rel="noreferrer">
                            <img src={emailIco} alt="linkedin" />
                        </a>
                        <a href="https://www.linkedin.com/company/mca-placement-cell/" target="blank" rel="noreferrer">
                            <img src={linkedinIco} alt="linkedin" />
                        </a>
                    </div>
                    <div className="MessageFormContainer">
                        <h1 id="SendMessage">
                            Got an enquiry or question? Write to Us.
                        </h1>
                        <form className="MessageForm">
                            <input type="text" placeholder="Your Name" required/>
                            <textarea type="text" placeholder="Brief Your Query" rows={10} required/>
                            <input type="submit" value="Send Message" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
