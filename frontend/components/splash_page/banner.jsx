import React from "react";
import { connect } from "react-redux";
import { login } from "../../actions/session_actions"
import { openModal } from "../../actions/modal_actions";
import Slideshow from "../common_components/slideshow";

const mdp = (dispatch) => {
  return {
    login: (user) => dispatch(login(user)),
    openModal: (modal) => dispatch(openModal(modal)),
  };
};

class Banner extends React.Component {
  render() {
    return (
      <div className="splash-page-header-bar">
        <Slideshow />
        <div className="header-buttons">
          <img src={window.logo}></img>
          <div className="user-auth-buttons">
            <button onClick={() => this.props.openModal("login")} className="login">Log In</button>
            <button onClick={() => this.props.openModal("signup")} className="signup">Create account</button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, mdp)(Banner);