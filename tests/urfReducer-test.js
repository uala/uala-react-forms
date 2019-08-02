import expect from 'expect';

import urfReducer from '../src/hoc/connectForm.reducer';
import * as Actions from '../src/hoc/connectForm.actions';

describe('URF Reducer', () => {
  it('should not update the state', () => {
    const unhandledAction = { type: 'UNHANDLED_ACTION', payload: { values: { name: 'Jim' } } };
    const state = urfReducer({ values: null }, unhandledAction);

    expect(state.values === null).toBe(true);
  });

  it('should update the state', () => {
    const handledAction = { type: Actions.UPDATE_FORM, payload: { values: { name: 'Jim' } } };
    const state = urfReducer({ values: null }, handledAction);

    expect(state.values === null).toBe(false);
    expect(Object.hasOwnProperty.call(state.values, 'name')).toBe(true);
    expect(state.values.name).toBe('Jim');
  });
});
