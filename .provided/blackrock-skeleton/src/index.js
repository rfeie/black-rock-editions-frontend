import "./styles.css";
import "./tailwind.css";
import header from "./header";
import img from "./stone-background.jpg";
import hero from "./hero";
import footer from "./footer";
import newsletter from "./newsletter";
import newsletterSection from "./newsletterSection";

const bkg = `
  <section class="bkg-img"></section>
`;
const main = content => `
  <main>
    ${content}
  </main>
`;

document.getElementById("app").innerHTML = `
${header}
${main(`
${bkg}
    ${hero}
    ${newsletterSection(newsletter)}
    ${footer}
  `)}

`;
