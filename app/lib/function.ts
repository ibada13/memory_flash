


const Showcards = () => { 
    const buttons = document.querySelectorAll("button") as NodeListOf<HTMLButtonElement>;
    console.log("Showcards function called. Found buttons:", buttons); // Log all buttons found
    buttons.forEach((e) => { 
        console.log(`Button ${e.id} has spy class: ${e.classList.contains("spy")}`); // Log if button has spy class
        e.classList.add("pointer-events-none")
        if (e.classList.contains("spy")) { 
            e.classList.replace("bg-white", "bg-ds");
        }
        if (e.classList.contains("bg-black")) { 
            e.classList.replace("bg-black","bg-white")
        }
    });
    hidecards(buttons); // Ensure hidecards works as expected
}

const hidecards = (buttons:NodeListOf<HTMLButtonElement>) => {
    setTimeout(() => {
        buttons.forEach((e) => {
            e.classList.replace("bg-ds", "bg-white");
         
         })
         
     },3000)
    setTimeout(() => { 
        buttons.forEach((e) => {
            while (e.classList.contains("pointer-events-none")) {
                e.classList.remove("pointer-events-none")
            }
         })
    },3000)
 }
const rand = (level: number, sublevel: number): [number, number][] => {
    const rands: Set<string> = new Set();
    const totalPairs = level + sublevel; // Total number of pairs to generate

    while (rands.size < totalPairs) {
        const x = getRandomNumber(level -1); // Random x coordinate
        const y = getRandomNumber(level -1); // Random y coordinate
        rands.add(`${x},${y}`); // Use a string to track unique pairs
    }

    // Convert the Set back to an array of tuples
    return Array.from(rands).map(pair => pair.split(',').map(Number) as [number, number]);
};


 function getRandomNumber( max: number): number {
    return Math.floor(Math.random() * (max  + 1)) ;
}



export {rand,Showcards}