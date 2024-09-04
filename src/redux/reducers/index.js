import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authReducer';

const reducers = combineReducers({
  auth: authReducer,
  mess: authReducer,
  // Uncomment and add your reducers as needed
  // users: userReducer,
  // utils: utilsReducer,
  // products: productReducer,
  // courses: courseReducer,
  // webinar: webinarReducer,
  // leads: leadsReducer,
  // linkLevel: linkReducer,
  // app: appReducer,
  // payout: payoutsReducer,
  // table: tableReducer,
  // affiliate: affiliateReducer,
});

export default reducers;
