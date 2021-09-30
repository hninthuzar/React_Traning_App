

import * as actions from "./actionTypes";


export const bugAdd = description => ({
    type: actions.BUG_ADDED,
    payload : {
      description
    }
})

export const bugRemove = id => ({
    type: actions.BUG_REMOVE ,
    payload: {
        id
    }
})


export const bugResolve = id => ({
    type: actions.BUG_RESOLVE ,
    payload: {
        id
    }
})