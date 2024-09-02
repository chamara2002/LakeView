import React from 'react'

const CustomButton = ({ color, otherStyle, buttonText }) => {

    const buttonStyles = {
        backgroundColor: color || '#FFBB00', 
        width: '162px',
        color: 'black', 
        fontWeight: 'bold',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '20px',
        cursor: 'pointer',
        ...otherStyle, 
      };
    

      return (
        <button style={buttonStyles}>
          {buttonText}
        </button>
      );
}

export default CustomButton
