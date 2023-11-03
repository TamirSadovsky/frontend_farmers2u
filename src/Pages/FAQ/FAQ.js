import React, { useState } from 'react';
import { Box, Typography } from "@mui/material";
import styles from './FAQ.module.css'; // Import the CSS module
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';


function FAQ () {
    const [faqs1, setFaqs1] = useState([
        {
            question: 'אני בעל משק חקלאי ומעוניין לפרסם באתר. מה עליי לעשות?',
            answer: 'אם אינך רשום לאתר, ראשית עליך לפתוח פרופיל משתמש. לחיצה על כפתור "יצירת משתמש" תחל את הליך הרשמתך. אם הינך רשום לאתר, עליך להתחבר למשתמש דרכו נרשמת ולאחר מכן תוכל לפרסם מודעות תחת לשונית "לוח המודעות".',
            open: false
        },
        {
            question: 'ניסיתי לפתוח פרופיל משתמש וראיתי כי ההרשמה מיועדת לחקלאים. כיצד ניתן לפתוח פרופיל צרכן?',
            answer: 'לא ניתן, פתיחת פרופיל משתמש מוגבלת לחקלאים בלבד.',
            open: false
        },
    ]);
    const [faqs2, setFaqs2] = useState([
        {
            question: 'ראיתי באתר פרסום לגבי אירוע ואני מעוניין לברר עוד פרטים. מה עליי לעשות?',
            answer: 'ניתן ללחוץ על תמונת בית העסק או שם בית העסק המוצג במודעה שפורסמה. בעת הלחיצה תיפתח חלונית עם פרטי בית העסק, כעת ניתן לפנות ישירות לבית העסק באחד מאמצעי ההתקשרות שפורסמו על ידו ולברר את הפרטים הרצויים.',
            open: false
        },
        {
            question: 'אני מעוניינת לצפות בפרסומים ובבתי עסק המוכרים גבינות. האם ניתן לסנן את בתי העסק שאינם רלוונטיים עבורי?',
            answer: 'כן. בלוח המודעות תוכלי למקד את החיפוש באמצעות הסנן המופיע מצד ימין ובחירת קטגוריות המוצרים שאת מעוניינת שיוצגו לך. באופן דומה, בדף "החקלאים שלנו" תוכלי לסנן בתי עסק המוכרים מוצרים בהם את מעוניינת.',
            open: false
        },
        {
            question: 'פרסמתי אירוע בלוח המודעות ואני מעוניין לעדכן פרטים. האם ניתן לעדכן את המודעה?',
            answer: 'כן, כל המודעות שפורסמו ממשתמש מסוים ניתנות לעריכה על ידו. יש לפתוח את תפריט הצד במודעה באמצעות לחיצה על ⋮ ובחירה באפשרות העריכה. ',
            open: false
        },
        {
            question: 'אני ומשפחתי נוסעים לטייל ומעוניינים לדעת האם ישנם אירועי מכירה באזור הטיול. האם ניתן לברר זאת?',
            answer: 'כן. תחת לוח המודעות, יש להזין את טווח התאריכים הרצוי, כתובת אזור הטיול והמרחק ממיקום האירוע כפי שפורסם במודעה. לחיצה על "הפעלת סינון" תציג עבורך פרסומים הרלוונטיים לתאריכי הטיול ולאזור הטיול.',
            open: false
        }
    ]);
    const [faqs3, setFaqs3] = useState([
        {
            question: 'האם ישנה אפשרות לשלם לחקלאי ישירות מהאתר?',
            answer: 'התשלום עבור הרכישה מתבצע ישירות מול החקלאי. לשם כך, יש ליצור קשר עם בית העסק ולברר מהו אופן התשלום. נכון לכרגע, אין אפשרות לשלם ישירות מהאתר.',
            open: false
        },
        {
            question: 'כיצד ניתן לברר אילו בתי עסק מבצעים משלוחים לאזורי?',
            answer: 'יש להיכנס לדף "החקלאים שלנו", לבחור באפשרויות הצריכה "משלוחים", להזין את כתובתך וללחוץ על "הפעלת סינון". כעת יוצגו עבורך רק בתי העסק המבצעים משלוחים לאזורך.',
            open: false
        },
    ]);

    const toggleFAQ = (currentFaqs, setFaqsFunction, index) => {
        setFaqsFunction(currentFaqs.map((faq, i) => {
            if (i === index) {
                faq.open = !faq.open;
            } else {
                faq.open = false;
            }
            return faq;
        }));
    }

    return (
        <div dir="rtl" className={styles.faqs}>
            <Typography mt={1} fontFamily="secular one" fontWeight="bold" variant='h2' sx={{
            textAlign: 'center',
            color: "#ffb74d",
            WebkitTextStroke: "0.1px #757575",
            }}>שאלות נפוצות
            </Typography>
            <div style={{alignContent: 'center', alignItems: 'center'}}>
                <h2 style={{WebkitTextStroke: '0.1px #1d3c45', textAlign: 'center'}} className={styles.sectionTitle}>הרשמה לאתר</h2>
                {faqs1.map((faq, i) => (
                    <FAQItem faq={faq} index={i} toggleFAQ={() => toggleFAQ(faqs1, setFaqs1, i)} key={i} />
                ))}
            </div>
            <section>
                <h2 style={{WebkitTextStroke: '0.1px #1d3c45', textAlign: 'center'}} className={styles.sectionTitle}>
                לוח מודעות
                <span style={{WebkitTextStroke: '0.1px #1d3c45'}}>, </span>
                אירועים ופרסומים
                </h2>
                {faqs2.map((faq, i) => (
                    <FAQItem faq={faq} index={i} toggleFAQ={() => toggleFAQ(faqs2, setFaqs2, i)} key={i} />
                ))}
            </section>
            <section>
                <h2 style={{WebkitTextStroke: '0.1px #1d3c45', textAlign: 'center'}} className={styles.sectionTitle}>רכישת מוצרים ומדיניות משלוחים</h2>
                {faqs3.map((faq, i) => (
                    <FAQItem faq={faq} index={i} toggleFAQ={() => toggleFAQ(faqs3, setFaqs3, i)} key={i} />
                ))}
            </section>
        <Box
            sx={{
              marginTop: "5%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            >
          <a href="bullboard" style={{ textDecoration: 'none', display: 'inline-block' }}>
          <Box
            sx={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="body2"
              sx={{fontFamily:"aleph", fontWeight: "bold", fontSize: "1.7rem", color: "#ffb74d", WebkitTextStroke: "0.1px black", marginBottom: '0.5rem'}}
            >
              המשך ללוח המודעות
            </Typography>
            <KeyboardBackspaceIcon style={{
                marginBottom: '0.5rem',
                color: "#ffb74d",
                filter: `
                drop-shadow( 0.3px 0px 0 black )
                drop-shadow( 0px 0.5px 0 black )
                drop-shadow( -0.1px 0px 0 black )
                drop-shadow( 0px -0.1px 0 black )
            ` }} />
          </Box> </a>
        </Box>
        </div>
    );
}

function FAQItem({ faq, index, toggleFAQ }) {
    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <div className={styles['left']}></div>
            <div
                className={`${styles['faq']} ${faq.open ? styles['open'] : ''}`}
                onClick={() => toggleFAQ(index)}
                style={{justifyContent: 'center', flex:3}}
            >
                <div className={styles['faq-question']}>
                    {faq.question}
                </div>
                <div className={styles['faq-answer']}>
                    {faq.answer}
                </div>
            </div>
            <div className={styles['right']}></div>
        </div>
    )
}

export default FAQ;