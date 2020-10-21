import React from 'react';
import {
    Link,
    Button,
    Typography
} from '@material-ui/core';
import '../styles/home.scss';

function Home() {
    return (
        <div className="root">
            <div className="nav">
                <div className="highRated">
                    <Link href="#">
                        HIGH - RATED
                    </Link>
                </div>
                <div className="mostViewed">
                    <Link href="#">
                        MOST - VIEWED
                    </Link>
                </div>
                <div className="trending">
                    <Link href="#">
                        TRENDING
                    </Link>
                </div>
                <div className="button">
                    <Button variant="contained">
                        LOGIN
                    </Button>
                </div>
            </div>
            <div className="title">
                <Typography variant="h1">
                    MANGA!
                </ Typography>
            </div>
            <div className="bodyCaption">
                <Typography variant="h1">
                    読んで、私の兵士
                </Typography>
                <Typography variant="h3" gutterBottom>
                    MY SOLDIERS, READ!
                </Typography>
            </div>
            <div className="footerCaption">
                <div className="buttonContainer">
                    <Typography variant="h4">
                        止まらない、バカヤロ
                    </Typography>
                    <Button variant="contained">
                        
                    </Button>
                </div>
                <Typography variant="h5">
                    Tomaranai, bakayaro
                </Typography>
            </div>
        </div>
    );
}

export default Home;
