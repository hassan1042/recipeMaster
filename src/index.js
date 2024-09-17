import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import {store} from './store/store';
import {IndRecipecontextProvider} from './contexts/indRecipeContext';
import { UserAuthContextProvider } from './contexts/authContext';
import { RecipeFilterProvider } from './contexts/recipeFilterContext';
import { AddToFavouritesRecipeContextProvider } from './contexts/addFavouriteContext';
import { ColorPickerProvider, } from './contexts/colorPickerContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Provider store={store}>
  <ColorPickerProvider>
  <AddToFavouritesRecipeContextProvider>
  <RecipeFilterProvider>
  <IndRecipecontextProvider>
  <UserAuthContextProvider>
    <App />
    </UserAuthContextProvider>
    </IndRecipecontextProvider>
  </RecipeFilterProvider>
  </AddToFavouritesRecipeContextProvider>
  </ColorPickerProvider>
    </Provider>
  </React.StrictMode>
);

