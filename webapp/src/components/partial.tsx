import React from 'react';
import {
    Button,
    Typography,
    Link,
    Divider
} from '@material-ui/core';
import '../styles/partial.scss';
import searchIcon from '../static/search-icon.svg';
import githubIcon from '../static/github-icon.png';
import twitterIcon from '../static/twitter-icon.png';
import linkedinIcon from '../static/linkedin-icon.png';

function Header() {
    return(
        <div className="header">
            <div className="leftHeader">
                <Typography variant="h5">
                    <Link href="#">A-Z</Link>
                </Typography>
                <Typography variant="h5">
                    <Link href="#">TRENDING</Link>
                </Typography>
                <Typography variant="h5">
                    <Link href="#">MOST-VIEWED</Link>
                </Typography>
            </div>
            <div className="rightHeader">
                <Button className="registerBtn" variant="contained" disableElevation>
                    Register
                </Button>
                <Button className="loginBtn" variant="outlined">
                    Log In
                </Button>
                <Divider orientation="vertical" flexItem/>
                <Button className="searchBtn" variant="outlined">
                    <img src={searchIcon} alt="search" />
                </Button>
            </div>
        </div>
    );
}

function Footer() {
    return (
        <div className="footer">
            <div className="leftFooter">
                <Typography variant="h5" >
                    © MANGA Limited
                </Typography>
            </div>
            <div className="middleFooter">
                    <Typography variant="overline" >
                        <Link href="#">About </Link>
                    </Typography>
                    <Divider orientation="vertical" flexItem/>
                    <Typography variant="overline" >
                        <Link href="#">Feedback</Link>
                    </Typography>
                    <Divider orientation="vertical" flexItem/>
                    <Typography variant="overline" >
                        <Link href="#">Help</Link>
                    </Typography>
            </div>
            <div className="rightFooter">
                <Button variant="contained" style={{backgroundColor:"black"}}>
                    <img src={githubIcon} alt="github" />
                </Button>
                <Button variant="outlined">
                    <img src={linkedinIcon} alt="linkedin" />
                </Button>
                <Button variant="outlined">
                    <img src={twitterIcon} alt="twitter" />
                </Button>
            </div>
        </div>
    );
}

export { Header, Footer };