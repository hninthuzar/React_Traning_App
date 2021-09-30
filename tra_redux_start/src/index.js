import store from './store';
import * as actions from './action/actions';


const unsubscribe = store.subscribe(() => {
    console.log('store changed! ' + store.getState())
})

store.dispatch(actions.bugAdd('bug 1'));


store.dispatch(actions.bugResolve(1));
console.log(store.getState());

unsubscribe();

store.dispatch(actions.bugRemove(1));