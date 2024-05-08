import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
// import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div
      className="fcenter img_bk"
      style={{ marginTop: "50px", padding: "20px" }}
    >
      <footer className="footer">
        <div className="flex container ">
          <div className="flex footer-content" style={{ gap: "30px" }}>
            {/* Facebook link */}
            <div className="">
              <a
                href="https://www.facebook.com/profile.php?id=61559372458440"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                <FontAwesomeIcon icon={faFacebook} className="footer-icon" />
              </a>
            </div>
            {/* Terms and Conditions */}
            {/* <Link to="/terms" className="footer-link">
            Terms and Conditions
          </Link> */}
            {/* Phone number */}
            <div className="footer-phone">
              <FontAwesomeIcon icon={faPhone} className="footer-icon" />
              <span className="ml5">0742 917 773</span>
              <i className="fa-brands fa-google"></i>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
