import axios from "axios"
import linkedinIco from "../images/contact/linkedin.png"
import emailIco from "../images/contact/email.png"
import phoneIco from "../images/contact/phone.png"
import "../stylesheets/contact.css"
// import "../custom_js/message.js"
import "../Global.css"

function send_message() {
    document.getElementById('success-msg').innerText = "";
    document.getElementById('error-msg').innerText = "";
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let query = document.getElementById('query').value;
    const sheets_url = "https://script.google.com/macros/s/AKfycbxFXUy4wAgNsIu9Ge0saOjx8lxgFmHEtX9QW7f3k5v6mJ0u6iGr5RiKGIeDa3NG04g5yw/exec";
    const depid = "AKfycbxFXUy4wAgNsIu9Ge0saOjx8lxgFmHEtX9QW7f3k5v6mJ0u6iGr5RiKGIeDa3NG04g5yw";
    const sheets_data = {
        name : name,
        email : email,
        query : query 
    };

    if(email != "" && name != ""){
        axios({
            url: sheets_url,
            method: "POST",
            data: sheets_data,
        })
        .then((res) => {
            console.log(res)
        })
        .catch((err) => { 
            console.log(err)
        });
        document.getElementById('success-msg').innerText = "We have recieved your query. Will contact you shortly.";
    }
    else{
        document.getElementById('error-msg').innerText = "Please fill out the required details";
    }

}

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
                            <input type="text" id="name" placeholder="Your Name"required/>
                            <input type="text" id="email" placeholder="Your Email*" required/>
                            <textarea type="text" id="query" placeholder="Brief Your Query" rows={10}/>
                            <button type="button" onClick={send_message}>Send Message</button>
                            <p id="error-msg" className="error"></p>
                            <p id="success-msg" className="success"></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
