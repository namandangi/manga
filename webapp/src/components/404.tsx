import React from 'react';
import '../styles/404.scss';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

export default function Page404() {
  return (
    <>
      <div className="content404">
        <Typography className="text404" variant="h1">
          404
        </Typography>
        <div className="hero404"></div>
        <Typography variant="h3">Mou Daijoubu</Typography>
        <div className="redirect404">
          <Typography variant="h6">Naze tte ?</Typography>
          <Typography variant="h5">
            Homepage ga&nbsp;
            <Link to="/">kita!</Link>
          </Typography>
        </div>
      </div>
    </>
  );
}
