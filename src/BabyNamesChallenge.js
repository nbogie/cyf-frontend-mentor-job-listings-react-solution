import React, { useState } from 'react';
import BabyNamesData from './BabyNamesData.json';
import lodash from 'lodash';
import './BabyNames.css';

const BabyNamesChallenge = (props) => {

    return (<div>
        <SearchBar />
        <FavouritesList />
        <MainList />
        <Footer />
    </div>);

}

const SearchBar = (props) => {
    return <footer>Search bar</footer>;
}
const FavouritesList = (props) => {
    return <footer>FavouritesList</footer>;
}
const MainList = (props) => {
    return <footer>Main List</footer>;
}
const Footer = (props) => {
    return <footer>Footer</footer>;
}
export default BabyNamesChallenge;