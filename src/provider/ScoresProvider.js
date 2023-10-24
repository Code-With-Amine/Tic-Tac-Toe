import React, { createContext, useContext, useState } from 'react';

const scoreContext = createContext();

function ScoresProvider({ children }) {
    const [userScore, setUserScore] = useState(0);
    const [CpuScore, setCpuScore] = useState(0);
    const [gameLevel, setGameLevel] = useState(1);
    return (
        <scoreContext.Provider value={{ userScore, setUserScore, CpuScore, setCpuScore, gameLevel, setGameLevel }}>
            {children}
        </scoreContext.Provider>
    );
}

export default ScoresProvider;

export const useScoresContext = () => useContext(scoreContext);
