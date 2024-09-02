import styles from "../../styles/footer.module.css"
import logo from "/logo.png";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { PiXLogo } from "react-icons/pi";
import { IoLogoLinkedin } from "react-icons/io5";

const Footer = () => {
  return (
    <div>
      <div
        className={styles.footer}
      >
        <div
          className = {styles.box1}
        >
          <img src={logo} alt="" width={200} />
          <div
            className={styles.logos}
          >
            <div>
              <PiXLogo />
            </div>
            <div>
              <FaInstagram />
            </div>
            <div>
              <FaYoutube />
            </div>
            <div>
              <IoLogoLinkedin />
            </div>
          </div>
        </div>

        <div className={styles.box2} >
          
            <h5>Contact us</h5>
            <br />
            
            <p>Gampaha, Sri Lanka</p>
            <p>Telephone: +9478-5347037</p>
            <p>Telephone: +9471-0786801</p>
            <p>lakeview01@gmail.com</p>
            
        </div> 

        <div className={styles.box3}>
        <h5>About Us</h5>
        <br />
        <p>Introduce the management system of the play zone <br />
          for Lakeview Gaming Zone, which is a single platform <br/>
          for managing game bookings, food orders, and event <br/>
          management to provide an integrated experience to <br/>
          the visitor.</p>
        </div>   

      </div>
    </div>
  );
};

export default Footer;
