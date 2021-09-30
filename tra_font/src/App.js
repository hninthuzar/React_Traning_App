import React, { Component } from "react";
import {IntlProvider, FormattedMessage } from "react-intl";
import messages from './const/message';
import Home from './components/home';
import "./App.css";

class App extends Component {
  state = {
    lang: "bm"
  }

  changeLang = () => {
      let lang = this.state.lang;
      if(lang === "en")lang = "bm";
      else lang = "en";
      this.setState({lang});
  }

  render() {
    const {lang} = this.state;
    return (
      <IntlProvider locale={lang} messages={messages[lang]}>
        <div>
          <h1>hello</h1>
          <Home/>
          <button onClick={this.changeLang}>
            <FormattedMessage id="lbl.clickMe2" defaultMessage="Click Me defa" />
          </button>
        </div>
      </IntlProvider>
    );
  }
}

export default App;

// <button onClick={this.changeLang}>
//             <FormattedMessage id="lbl.changeLang" defaultMessage="Language" />
//           </button>
