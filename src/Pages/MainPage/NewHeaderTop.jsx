import React from 'react'
import profilevid from '../../assets/ForProfile2.mp4'
import './NewHeaderTop.css';
import CustomButton from "./CustomButton";

const NewHeaderTop = () => {
  
    return (
    <div className='hero'>
        <video src={profilevid} muted loop autoPlay></video>
        <div className="newOverlay"></div>
        <div className="text">
            <h2 style={{fontFamily: "Secular One", }}>ברוכים הבאים ל-Farmers2U</h2>
            <h3 style={{WebkitTextStroke: '0.1px #1d3c45', textStroke: '0.1px #000'}}>תומכים בתוצרת ישראלית</h3>
            <div className='buttonAndText'>
                <h3>כאן תוכלו למצוא חקלאים מכל רחבי הארץ, לצפות באירועים קרובים ולרכוש את הסחורה הטובה ביותר!</h3>
                <a href="bullboard">
                    <CustomButton
                    backgroundColor="#e8aa42"
                    color="#212121"
                    buttonText="לוח המודעות"
                    heroBtn={true}
                    href='bullboard'
                    />
                </a>
            </div>
        </div>
    </div>
  )
}

export default NewHeaderTop