//Flow diagram: https://excalidraw.com/#json=5680880538353664,5FOVmiVqJ_XfHphPRCxGCA

import React, { useState } from 'react';
import BabyNamesData from './BabyNamesData.json';
import './BabyNamesChallenge.css';

BabyNamesData.sort((a, b) => a.name < b.name ? -1 : 1);


const BabyNamesChallenge = (props) => {
    //HOOKS------------------------------------------------
    const [searchTerm, setSearchTerm] = useState("")
    const [favouritesIds, setFavouritesIds] = useState([]);
    const [selectedGender, setSelectedGender] = useState('a');
    //-----------------------------------------------------

    const addFavourite = (nameObj) => {
        setFavouritesIds(favouritesIds.concat([nameObj.id]));
    }

    const removeFavourite = (nameObj) => {
        console.log("removing", nameObj.name)
        const newIds = favouritesIds.filter(id => id !== nameObj.id);
        setFavouritesIds(newIds);
    }

    const filterForSearch = (names) => {
        return searchTerm.trim().length > 0 ?
            names.filter(o => o.name.toLowerCase().includes(searchTerm.toLowerCase())) :
            names;
    }

    const filterByGender = (names) => {
        return names.filter(o => selectedGender === 'a' || selectedGender === o.sex)
    }
    const filterOutFavourites = (names) => {
        return names.filter(o => !favouritesIds.includes(o.id));
    }
    const selectMale = () => setSelectedGender('m');
    const selectFemale = () => setSelectedGender('f');
    const selectAllGenders = () => setSelectedGender('a');


    return (
        <div className='main'>
            <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectMale={selectMale}
                selectFemale={selectFemale}
                selectAllGenders={selectAllGenders}
                selectedGender={selectedGender}
            />
            <FavouritesList allNames={BabyNamesData} favouritesIds={favouritesIds} clickHandler={removeFavourite} />
            <MainList
                names={
                    filterOutFavourites(filterByGender(filterForSearch(BabyNamesData)))
                }
                clickHandler={addFavourite} />
            <Footer />
        </div>
    );

}

const SearchBar = ({ searchTerm, setSearchTerm, selectMale, selectFemale, selectAllGenders, selectedGender }) => {
    return (
        <>
            <div className='controlBar'>
                <input
                    placeholder='Search for a name...'
                    onChange={(e) => setSearchTerm(e.target.value)}
                    value={searchTerm}
                />
                <span className="genderButtons">
                    <div title="show all names" className={`chooser anyChooser ${selectedGender === 'a' ? 'selected' : ''}`} onClick={selectAllGenders}></div>
                    <div title="show only girls' names" className={`chooser femaleChooser ${selectedGender === 'f' ? 'selected' : ''}`} onClick={selectFemale}></div>
                    <div title="show only boys' names" className={`chooser maleChooser ${selectedGender === 'm' ? 'selected' : ''}`} onClick={selectMale} ></div>
                </span>
            </div>

        </>
    );
}


const FavouritesList = ({ allNames, favouritesIds, clickHandler }) => {

    return (
        <div className='favourites'>
            <span>Favourites: </span>
            <ul>
                {favouritesIds.length === 0
                    ?
                    <span>Click some names below to add to your shortlist...</span>
                    :
                    favouritesIds.map(
                        favId => allNames.find(obj => obj.id === favId)
                    ).map(nameObj =>
                        <BabyName
                            nameObj={nameObj}
                            clickHandler={clickHandler}
                            key={nameObj.id}
                        />
                    )
                }
            </ul>
        </div>
    );
}
const classForName = (({ sex }) => sex === 'm' ? 'male' : 'female');

const BabyName = ({ nameObj, clickHandler }) => {
    return (
        <li
            className={"name " + classForName(nameObj)}
            onClick={e => clickHandler(nameObj)}
        >
            {nameObj.name}
        </li >
    )
}


const MainList = ({ names, clickHandler }) => {
    return (
        <div>
            <ul>
                {
                    names.map(nameObj =>
                        <BabyName
                            key={nameObj.id}
                            clickHandler={clickHandler}
                            nameObj={nameObj}
                        />)
                }
            </ul>
        </div>
    );
}

const Footer = (props) => {
    return <footer>
        <a href="https://excalidraw.com/#json=5680880538353664,5FOVmiVqJ_XfHphPRCxGCA">Flow Diagram</a>
    </footer>;
}

export default BabyNamesChallenge;