import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {AuthLoader} from './common/loader';
// component imports
import Layout from '../Layout';
import IndRecipe from './home/RecipeDetails/indRecipe';
import Home from './home/Home';
import Recipes from './recipes'
import FilteredRecipes from './FilteredRecipes';
import Favourites from './user/Favourites';
import SearchResults from './search/SearchResults';
import Dashboard from './dashboard/DashBoard';

function RoutingParent() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // New loading state
  const [uid, setUID] = useState(''); 
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {      
        setUser(user);
        var userId = user.uid;
        setUID(userId);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    // Cleanup function
    return () => unsubscribe();
  }, [auth]);
  // console.log(user.displayName, user.photoURL);
 
  if (loading) {
    return <AuthLoader />;
  }

  // if (!user) {
  //   return <LoginPage />;
  // }

  return (
    <div className='overflow-hidden'>
    <Router>
    <Routes>
      <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/Recipes" element={<Recipes  />} />
      <Route path="/IndRecipe" element={<IndRecipe uid={uid} user={user} />} />
      <Route path="/FilteredRecipes/:category" element={<FilteredRecipes />} />
      <Route path="/Favourites" element={<Favourites uid={uid}/>} />
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/search" element={<SearchResults />} />
      </Route>
    </Routes>
  </Router>
    </div>
  );
}

export default RoutingParent;
