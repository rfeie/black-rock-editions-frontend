const headerText = `We are online.`;
const bodyText = `Welcome to the website of Black Rock Editions. Soon this will host information about clinics, artists and events. But for now if you are interested in learning more please sign up for our newsletter below.`;
const heroContent = `
<section class="hero-content"><div class="hero-text">${headerText}</div>${""}<div class="hero-body">${bodyText}</div></section>
`;
const heroContentTwo = `
<section class="hero-content-two"><div class="hero-text">${headerText}</div>${""}</section>
`;

const heroContentThree = `
<section class="hero-content-three"><div class="hero-text">${headerText}</div>${""}</section>
`;
const hero = `<section class="hero">${heroContent} ${heroContentTwo}${heroContentThree}</section>`;
/**
 *   darkBackground: "#2c2e33",
    23     darkBackgroundAccent: "#4a515e",
    24     text: "#f5f7fa",
 */
export default hero;
