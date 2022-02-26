import Store from '../store/store';
import { createContext } from 'react';

interface State {
  store: Store;
}

export const store = new Store();

export const Context = createContext<State>({
  store,
});