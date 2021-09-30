import React, { Component } from "react";
import {FormattedMessage} from 'react-intl';

const Home = () => {
  return (
    <div>
      <FormattedMessage id="lbl.home" defaultMessage="Home!" />
      <p>
        <FormattedMessage id="lbl.home.desc" />
      </p>
    </div>
  );
};

export default Home;
