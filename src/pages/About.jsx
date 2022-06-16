import "../stylesheets/About.css";
import "../Global.css"
import AboutContent from "../components/AboutContent"
import Message from "../components/Message";

export default function About(props)
{
    return (
        <main id="AboutPage" className="about">
            <div className="heading-container">
                <h1>About Department</h1>
                <div className="heading-border"></div>
            </div>
            <div>
                <AboutContent />
            </div>
            <div id = "MessageSection" className="heading-container">
                <h1>Message Corner</h1>
                <div className="heading-border"></div>
            </div>
            <div>
                <Message />
            </div>
        </main>
    );
}