
import gsap from "gsap";
export const LoseAnimation = (Skullnumber:number) => { 
    const skull = document.querySelector(`#s-${Skullnumber}`);

  // Define the animation
  gsap.timeline()
    .to(skull, { 
      duration: 0.3, 
      backgroundColor: "black", // Turn skull black like a shadow
      ease: "power1.inOut",
    })
    .to(skull, { 
      duration: 1.5, 
      scale: 50, // Scale it up to cover the screen
      ease: "power3.inOut",
      transformOrigin: "center center" // Make sure it expands from the center
    }, "<") // Start at the same time as the color change
    .to("body", {
      duration: 1.5,
      backgroundColor: "black", // Fade the background to black
      ease: "power3.inOut"
    }, "-=1.5"); // Sync the background fade with the skull expansion
};

