import reducer from "./reducer";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

const persistConfig = {
      key: 'Root',
      storage,
      blacklist : ['recipeDetail', 'loading']
};
const persistedReducer = persistReducer(persistConfig, reducer);

export const store = createStore(
      persistedReducer,
      composeWithDevTools(applyMiddleware(thunk))
);

export const persistor = persistStore(store);