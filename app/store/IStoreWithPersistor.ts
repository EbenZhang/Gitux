import { Store } from "redux";

export interface IStoreWithPersistor {
  store: Store<object | void>;
  persistor: any;
}
