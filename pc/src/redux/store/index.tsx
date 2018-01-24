import { createStore } from 'redux';
import { enthusiasm } from '../reducers/index';
import { StoreState } from '../type/index';

const store = createStore<StoreState>(enthusiasm, {
    enthusiasmLevel: 1,
    languageName: 'TypeScript',
});

export default store;