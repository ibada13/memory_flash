'use client';
import React, { Dispatch,  SetStateAction, useEffect, useState } from 'react';
import {  Showcards } from '../lib/function';

import StopedGame from './StoppedGame';
interface BoardProps {
    level: number;
    SetLevel: React.Dispatch<SetStateAction<number>>;
    SubLevel: number;
    SetSubLevel: React.Dispatch<SetStateAction<number>>;
    Rands: [number, number][];
    SetRands:Dispatch<SetStateAction<[number,number][]>>
    Life: number;
    SetLife: React.Dispatch<SetStateAction<number>>;
    Stop: boolean;
    SetStop:Dispatch<SetStateAction<boolean>>
    handleClick: (button: HTMLButtonElement) => void;
}

const Board: React.FC<BoardProps> = ({handleClick,Stop , level, SubLevel, Rands ,Life}) => {
    const [buttons, setButtons] = useState<JSX.Element[]|JSX.Element    >([]);
    
    useEffect(() => {
        if (Stop && Rands.length === 0) {
            setButtons(StopedGame())
            console.log(Stop, Rands)
            localStorage.setItem("stop", String(true));

            return;
        }
        if(!Stop ){   
            localStorage.setItem("stop", String(false));
             // Generate buttons
            const newbuttons =generateButtons()
            setButtons(newbuttons);

            // Delay Showcards to ensure buttons are fully rendered
            const showcards = setTimeout(() => { 
                Showcards();
                
            }, 1000)

            return ()=>clearTimeout(showcards)
        }
    }, [level, SubLevel, Rands, Life, Stop]); 
    

    const generateButtons = () => {

        const buttons = [];
        for (let i = 0; i < level; i++) {
            const row = [];
            for (let j = 0; j < level; j++) {
                const isSpy = Rands.some(([x, y]) => x === i && y === j); // Check if current button is a spy
                const buttonClass = `h-3/4 w-full basis-full f border border-p m-2 bg-white rounded-md shadow-lg transition-all duration-300 hover:bg-dp hover:text-da shadow-lg pointer-events-none ${isSpy ? "spy" : "" }`;

                row.push(
                    <button
                        id={`b${i}-${j} button`}
                        key={`${i}-${j}`}
                        className={buttonClass}
                        onClick={(e) => handleClick(e.currentTarget)} // Pass the current button to handleClick
                    >
                    </button>
                );
            }
            buttons.push(
                <div key={`row-${i}`} className="min-w-[75%] flex justify-around items-center basis-full">
                    {row}
                </div>
            );
        }
        return buttons; // Return the generated buttons
    };

    return (
     
        <div className='w-full h-full flex flex-col justify-center items-center flex-grow'>
          {buttons} {/* Render buttons from state */}
        </div>
      
    );
};

export { Board };

