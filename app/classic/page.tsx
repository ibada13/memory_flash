"use client";
import { useEffect, useState } from "react";
import {  rand  } from "../lib/function";
import { Board } from "../components/Board";
import { FaSkullCrossbones } from "react-icons/fa6";
import { FaRegStopCircle } from "react-icons/fa";
import { VscDebugContinue } from "react-icons/vsc";
const Classic = () => { 
    const [Level, SetLevel] = useState<number>(3);  // Default level
    const [Life, SetLife] = useState<number>(0);     // Default life
    const [SubLevel, SetSubLevel] = useState<number>(0); // Default sublevel
    const [Rands, SetRands] = useState<[number, number][]>([]);
    const [Stop, SetStop] = useState<boolean>(false); // Default stop state

    // Read stored values from localStorage on mount
    useEffect(() => {
        const stored_level = localStorage.getItem("level");
        if (stored_level) {
            SetLevel(Number(stored_level));
        }
        
        const stored_life = localStorage.getItem("life");
        if (stored_life) {
            SetLife(Number(stored_life));
        }

        const stored_sublevel = localStorage.getItem("sublevel");
        if (stored_sublevel) {
            SetSubLevel(Number(stored_sublevel));
        }

        const stored_stop = localStorage.getItem("stop");
        SetStop(stored_stop === "true");
    }, []);
    const updatelevel = (level: number, sublevel: number) => { 
        SetLevel(level);
        localStorage.setItem("level", String(level));
        SetSubLevel(sublevel);
        localStorage.setItem("sublevel",String(sublevel))
    }
    const handleClick = (button: HTMLButtonElement) => {
        const buttons = document.querySelectorAll("button") as NodeListOf<HTMLButtonElement>;
        if (button.classList.contains("spy")) {
            button.classList.add("pointer-events-none");
            button.classList.replace("bg-white", "bg-ds");
            Rands.pop()
           
            
            if (Rands.length === 0) {
                buttons.forEach((e) => { 
                    if (e.id !== "stop") { 

                        e.classList.add("pointer-events-none")
                    }
                })
                setTimeout(() => {
                if (SubLevel + 1  === Level) {
                    updatelevel(Level + 1, 0);
                } else { 
                    updatelevel(Level, SubLevel + 1);
                }
            }, 1000);
            }
            
        } else {
            console.log(Life)
            button.classList.replace("bg-white", "bg-black");
            buttons.forEach((e) => { 
                e.classList.add("pointer-events-none");

            })
            setTimeout(()=>{buttons.forEach((e) => {
                if (e.classList.contains("spy")) {
                    e.classList.replace("bg-white", "bg-ds");
                }
            });
        },2000)
        setTimeout(() => { 
            buttons.forEach((e) => { 
                e.classList.replace("bg-ds", "bg-white")
                e.classList.replace("bg-black","bg-white")
            })
            SetRands([]);
            if (Life === 2) {
                
                setTimeout(() => { 

                    SetLife(0);
                    updatelevel(3, 0);
                },3000)
            } else { 
                console.log(Life)
                SetLife(e => { 
                    localStorage.setItem("life",String(e+1))
                     return    e + 1
                }
                )
                
            }
            },4000)
        }
        
    };


    useEffect(() => { 
        const Rands = rand(Level, SubLevel);
        SetRands(Rands)
    },[Level , SubLevel,Life])
    return (
        <div className="p-5 max-h-screen w-screen h-screen flex flex-row justify-center items-center transition-all duration-300" id="board">
        <div className=' p-2 h-full  flex flex-col items-center justify-around'>
                <p id='stop' className='size-1/6 cursor-pointer' onClick={()=>SetStop(e=>!e)}>
                    {Stop?<VscDebugContinue size={"120%"} />:<FaRegStopCircle size={"120%"} /> }
                </p>
                
                {[0, 1, 2].map((index) => (

                    <FaSkullCrossbones id={ `s-${index}`} key={`skull-${index}`} className='transition-all duration-300' size={"40%"} color={Life > index  ? 'red' : 'white'} />
                ))}
                <p className='text-dp transition-all duration-300'>lvl. {Level}</p>
                <p className='text-dp transition-all duration-300'>sublvl. { SubLevel}</p>

        </div>
        <Board  SetStop={SetStop} Stop={Stop} handleClick={handleClick} SetRands={SetRands} Life={Life} SetLife={SetLife} Rands={Rands} level={Level} SubLevel={SubLevel}  SetSubLevel={SetSubLevel} SetLevel={SetLevel}/>
      </div>
    );
}

export default Classic