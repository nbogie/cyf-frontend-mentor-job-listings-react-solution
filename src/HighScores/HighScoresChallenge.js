//https://excalidraw.com/#json=4914814702845952,bVPOhBFZEf3hhUfzWnmueg

import React from 'react';
import './HighScoresChallenge.css';
import allCountryScores from './allCountryScores.js';

function HighScoreTable(props) {

    const sortedScores = [...props.scores].sort((a, b) => b.s - a.s); //make a copy

    return (
        <div className="country-scores">
            <h2>HIGH SCORES: {props.country}</h2>
            <div className="scores">
                {
                    sortedScores.map((playerScore, ix) =>
                        <PlayerScore
                            name={playerScore.n}
                            score={playerScore.s}
                            key={ix}
                        />
                    )
                }
            </div>
        </div>
    )
}
function PlayerScore(props) {
    return (
        <p>
            <span className="playerName">{props.name}</span>
            <span className="score">{props.score}</span>
        </p>
    );
}
function HighScoresChallenge() {

    allCountryScores.sort((c1, c2) => c1.name < c2.name ? -1 : 1);

    return (
        <div className="App">

            <h1>High Scores per Country</h1>

            {
                allCountryScores.map(countryScores =>
                    <HighScoreTable
                        key={countryScores.name}
                        country={countryScores.name}
                        scores={countryScores.scores} />
                )
            }

        </div>
    );
}

export default HighScoresChallenge;
