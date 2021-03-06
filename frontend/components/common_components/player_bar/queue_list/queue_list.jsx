import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Queue from "./queue"

const msp = (state) => {
    return {
        queueList: state.ui.queueList,
    }
}

const QueueList = (props) => {
    if (props.queueList) {
        return (
            <div className="queue-list">
                <header>Next up</header>
                <Queue />
            </div>
        );
    } else {
        return null;
    }
}

export default withRouter(connect(msp, null)(QueueList))