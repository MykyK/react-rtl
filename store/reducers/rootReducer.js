import {
  combineReducers
} from "redux"
import authReducer from "./authReducer"
import userReducer from "./userReducer";
import companyReducer from "./companyReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  company: companyReducer
})

export default rootReducer;
