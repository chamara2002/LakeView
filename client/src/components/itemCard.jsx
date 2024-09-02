import React from 'react'

const ItemCard = () => {
  return (
    <div style={{display: "flex", gap: "10px", flex: "1", overflow: "auto", flexWrap: "wrap",backgroundColor: '#161E38', alignItems: "center", justifyContent: "center", padding: "10px"	}}>
        <img src="/movie1.jpeg" alt="" width={300} height={420}  style={{borderRadius: "10px",padding:10}}/>
        <img src="/movie2.jpeg" alt="" width={300} height={400}  style={{borderRadius: "10px",padding:10}}/>
        <img src="/movie3.jpeg" alt="" width={300} height={400}  style={{borderRadius: "10px",padding:10}}/>
        <img src="/music.png" alt="" width={300} height={400}  style={{borderRadius: "10px",padding:10}}/>
        <img src="/music1.png" alt="" width={300} height={400}  style={{borderRadius: "10px",padding:10}}/>
        <img src="/music3.png" alt="" width={300} height={400}  style={{borderRadius: "10px",padding:10}}/>
        <img src="/other1.jpg" alt="" width={300} height={400}  style={{borderRadius: "10px",padding:10}}/>
        <img src="/other2.jpg" alt="" width={300} height={400}  style={{borderRadius: "10px",padding:10}}/>
        <img src="/other3.jpg" alt="" width={300} height={400}  style={{borderRadius: "10px",padding:10}}/>
        <img src="/movie4.jpeg" alt="" width={300} height={400}  style={{borderRadius: "10px",padding:10}}/>
    </div>
  )
}

export default ItemCard