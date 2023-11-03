import React, { useState } from 'react';
import { Drawer, IconButton, List, ListItemButton, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const DrawerComp = ({ token, removeToken }) => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const navigate = useNavigate();

    const logMeOut = () => {
        axios({
            method: "POST",
            url: "https://farmers2u-backend.onrender.com/logout",
        })
        .then((response) => {
            removeToken();
            localStorage.removeItem('email');
            localStorage.removeItem('profilePicture');
            localStorage.removeItem('farmName');
            navigate("/");
        })
        .catch((error) => {
            if (error.response) {
                console.log(error.response);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        });
    };

    const pages = token
        ? [
            { label: "דף הבית", href: "home" },
            { label: "לוח המודעות", href: "bullboard" },
            { label: "החקלאים שלנו", href: "ourfarmers" },
            { label: "שאלות נפוצות", href: "faq" },
            { label: "אזור אישי", href: "settings" },
            { label: "התנתקות", href: "" },
        ]
        : [
            { label: "דף הבית", href: "home" },
            { label: "לוח המודעות", href: "bullboard" },
            { label: "החקלאים שלנו", href: "ourfarmers" },
            { label: "שאלות נפוצות", href: "faq" },
            { label: "התחברו לאתר", href: "login" },
            { label: "הרשמה לאתר", href: "signup" },
        ];

    return (
        <React.Fragment>
            <Drawer
                anchor="right"
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
                PaperProps={{
                    style: {
                        backgroundColor: '#1D3C45',
                        width: '120px',
                    },
                }}
            >
                <List>
                    {pages.map((page, index) => (
                        <ListItemButton
                            onClick={() => {
                                setOpenDrawer(false);
                                if (page.href === "") {
                                    logMeOut();
                                }
                            }}
                            href={page.href}
                            key={index}
                        >
                            <ListItemText
                                primary={page.label}
                                disableTypography
                                sx={{
                                    color: '#E8AA42',
                                    fontFamily: 'aleph',
                                    fontWeight: 'normal', 
                                    '&:hover': {
                                        fontWeight: 'bold',
                                        transition: 'font-weight 0.3s', 
                                    },
                                }}
                            />
                        </ListItemButton>
                    ))}
                </List>
            </Drawer>
            <IconButton
                sx={{
                    color: '#E8AA42',
                    marginLeft: 'auto',
                }}
                onClick={() => setOpenDrawer(!openDrawer)}
            >
                <MenuIcon />
            </IconButton>
        </React.Fragment>
    );
};

export default DrawerComp;