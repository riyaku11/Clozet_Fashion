import React from "react"
import "./Footer.css"
import Logo from "../../items/without_bg_logo.png"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faMailBulk, faVoicemail, faAddressBook,} from "@fortawesome/free-solid-svg-icons"
import {faGithub,faInstagram, faTwitter,faWhatsapp} from "@fortawesome/free-brands-svg-icons"

const Footer =()=>{
    return(
        <>
        <footer className="footer-distributed">

<div className="footer-left">
        <img style={{ width: 250, height: 200 }} src={Logo} alt="logo"  />
{/* 
    <p className="footer-links">
        <a href="https://www.google.com" className="link-1">Home</a>
        
        <a href="https://www.google.com">Blog</a>
    
        <a href="https://www.google.com">Pricing</a>
    
        <a href="https://www.google.com">About</a>
        
        <a href="https://www.google.com">Faq</a>
        
        <a href="https://www.google.com">Contact</a>
    </p> */}

    <p className="footer-company-name">Clozet Fashion © 2023</p>
</div>

<div className="footer-center">

    <div>
    <FontAwesomeIcon icon={faAddressBook} ></FontAwesomeIcon>
        <p><span className="span_items">Delhi, India</span></p>
    </div>

    <div>
    <FontAwesomeIcon icon={faVoicemail}></FontAwesomeIcon>
        <p > <span className="span_items">+91 959923XXXX</span></p>
    </div>

    <div>
    <FontAwesomeIcon icon={faMailBulk}></FontAwesomeIcon>
        <p><span className="span_items"><a href="mailto:support@company.com">support@clozetfashion.com</a></span></p>
    </div>

</div>

<div className="footer-right">

    <p className="footer-company-about">
        <span>About the company</span>
        Lorem ipsum dolor sit amet, consectateur adispicing elit. Fusce euismod convallis velit, eu auctor lacus vehicula sit amet.
    </p>

    <div className="footer-icons">

        <a href="https://www.google.com"><FontAwesomeIcon icon={faInstagram} /></a>
        <a href="https://www.google.com"><FontAwesomeIcon icon={faTwitter}/></a>
        <a href="https://www.google.com"><FontAwesomeIcon icon={faWhatsapp}/></a>
        <a href="https://www.google.com"><FontAwesomeIcon icon={faGithub}/></a>

    </div>

</div>

</footer>
        </>
    );
    
}

export default Footer;