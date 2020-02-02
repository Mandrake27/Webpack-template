import { applyMiddleware, bindActionCreators, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk';
import { FETCH_FAILED, FETCH_REQUEST, FETCH_SUCCESS } from 'store/types';
import rootReducer from 'store';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

const fetchRequest = () => ({ type: FETCH_REQUEST });
const fetchSuccess = () => ({ type: FETCH_SUCCESS });
const fetchFailed = () => ({ type: FETCH_FAILED });

const uniteActions = bindActionCreators(
	{
			request: fetchRequest,
			success: fetchSuccess,
			failed: fetchFailed,
	},
	store.dispatch
);

export default uniteActions;