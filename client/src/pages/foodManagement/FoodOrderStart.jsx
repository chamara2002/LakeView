import React from "react";
import styles from "../../pages/foodManagement/styles/foodOrderStyles.module.css";
import NavBar from "../../components/core/NavBar";
import Footer from "../../components/core/Footer";
import CustomButton from "../../components/reUseable/CustomButton";
import pic1 from  '../../../public/Food_Management(Restaurant)/pic1.jpg'
import FoodNavBar from "../../components/reUseable/foodNavBar";
import { useNavigate } from "react-router-dom";


const FoodOrderStart = () => {

const navigate = useNavigate();

  return (
    <>
      <NavBar name="foods" />
      <div className={styles.main}>
        <div className={styles.mainContainer}>
          <div className={styles.mainContainerHeader}>
            <div className={styles.mainContainerTitle}>
              <h3>
                {" "}
                LAKEVIEW RESTAURANT{" "}
              </h3>
            </div>
            <div className="mainContainerNavBar">
             
            </div>
          </div>
          <div className={styles.mainContainerBody}>
            <h4>Welcome to Our Food management Portal</h4>
            
            <p className="foodcaption">
              Your gateway to a seamless dining experience at 
              <br></br><br></br>Lakeview Gaming Zone.
            </p>
            <br />
            <br />
            <div onClick={()=>navigate('/food')}>
              <CustomButton color="#FFBB00" fontWeight="bold" buttonText="Order Now"  />
            </div>
          </div>
        </div>
        <div className={styles.imageContainer}>
            <img src={pic1} alt=""/>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FoodOrderStart;

