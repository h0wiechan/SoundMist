import { RECEIVE_COMMENTS } from "../actions/comment_actions";
import { merge } from "lodash";

const commentsReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_COMMENTS:
            return merge({}, action.comments); 
        default:
            return state;
    }
}

export default commentsReducer;