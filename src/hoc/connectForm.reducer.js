import * as Actions from './connectForm.actions';

// Form state reducer
const urfReducer = (state, action) => {
  switch (action.type) {
    case Actions.UPDATE_FORM:
      return { ...state, ...action.payload };
    case Actions.REQUEST_SUBMIT:
      return { ...state, submitCount: state.submitCount + 1 };
    default:
      return state;
  }
};

export default urfReducer;
