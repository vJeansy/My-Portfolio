// =======================
// Import dependencies and modules
// =======================
import { projects, educations, skills, faqs } from './src/services/api.js';
import { currentYear } from './src/utils/currentYear.js';
import { initScrollButton } from './src/utils/upButton.js';
import { createModal } from './src/components/modal.js';
import { contactForm } from './src/components/contactForm.js';
import { type, attachFaqListeners } from './src/components/animation.js';

// =======================
// DOM Elements
// =======================
const year = document.getElementById('current-year');
const frontEndSkills = document.getElementById('front-end');
const backEndSkills = document.getElementById('back-end');
const technologiesSkills = document.getElementById('technologies');
const projectsContainer = document.getElementById('projects-container');
const devops = document.getElementById('devops');
const showMoreBtn = document.getElementById('show-more-projects');

// =======================
// Initialize UI Elements
// =======================
currentYear(year.id);          // Set current year in footer
initScrollButton();            // Scroll-to-top button
contactForm();                 // Initialize contact form
type();                        // Initialize type animation.

// =======================
// Skills Section
// =======================
export async function skillsData() {
    const res = await skills();
    const skillList = res;

    // Clear containers before populating
    frontEndSkills.innerHTML = "";
    backEndSkills.innerHTML = "";
    technologiesSkills.innerHTML = "";

    skillList.forEach(function (skill) {
        const mainContainer =
            skill.type === 'front-end' ? frontEndSkills :
            skill.type === 'back-end' ? backEndSkills :
            skill.type === 'technologies' ? technologiesSkills :
            skill.type === 'devops' ? devops :
            null;

        if (!mainContainer) return;

        const container = document.createElement('div');
        container.setAttribute('data-aos', 'fade-up');
        container.className = 'flex items-center gap-3';

        const img = document.createElement('img');
        img.src = skill.logo;
        img.alt = skill.tittle;
        img.title = skill.tittle;
        img.className = 'h-12 w-auto cursor-grab';
        img.style.filter = `drop-shadow(0 0 0.75rem ${skill.color})`;

        const s = document.createElement('span');
        s.textContent = skill.tittle;
        s.className = 'text-slate-50 font-extrabold text-2xl cursor-grab';

        container.appendChild(img);
        container.appendChild(s);
        mainContainer.appendChild(container);
    });
}
skillsData(); // Initial skills render

// =======================
// Projects Section
// =======================
let displayedProjects = 0;
let projectsListCache = [];

/**
 * Fetch and render initial projects data
 */
export async function projectsData() {
    const res = await projects();
    projectsListCache = res;
    displayedProjects = 0;
    projectsContainer.innerHTML = ""; // Clear container before populating
    renderProjects(5); // Show first 5 projects
}

/**
 * Render a batch of projects
 * @param {number} count - Number of projects to render
 */
function renderProjects(count) {
    const projectsToShow = projectsListCache.slice(displayedProjects, displayedProjects + count);

    projectsToShow.forEach(function (project) {
        // Card container
        let card, imgContainer, img, textContainer;

        // Even id: left card
        if (project.id % 2 === 0) {
            card = document.createElement('div');
            card.className = 'flex flex-col lg:flex-row items-center gap-4 md:gap-6 lg:gap-8 p-4 md:p-7 rounded-2xl w-full';
            projectsContainer.appendChild(card);

            imgContainer = document.createElement('div');
            imgContainer.setAttribute('data-aos', 'fade-right');
            imgContainer.setAttribute('data-aos-once', 'true');
            imgContainer.className = 'flex-shrink-0 w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl';
            card.appendChild(imgContainer);

            img = document.createElement('img');
            img.id = `project-img-${project.id}`;
            img.src = project.path + '1.png';
            img.className = [
                'imgs-projects', 'img-container-left', 'shadow-xl', 'rounded-md',
                'transition-all', 'duration-300', 'ease-in-out', 'hover:scale-105',
                'hover:mask-r-from-100%', 'hover:mask-r-to-100%', 'cursor-pointer',
                'xl:mask-r-from-50%', 'xl:mask-r-to-90%', 'xl:blur-xs', 'hover:blur-none',
                'w-full', 'h-auto', 'max-h-80', 'object-cover'
            ].join(' ');
            img.style.height = '';
            img.style.width = '';
            img.style.objectFit = 'cover';
            img.alt = project.tittle;
            imgContainer.appendChild(img);

            textContainer = document.createElement('div');
            textContainer.className = 'flex flex-col items-center lg:items-start text-left lg:text-left w-full max-w-xs sm:max-2-md md:max-w-lg lg:max-2-2xl';
            card.appendChild(textContainer);

            // Title
            const span1 = document.createElement('span');
            span1.textContent = project.tittle;
            span1.className = 'text-4xl text-slate-50 font-bold';
            textContainer.appendChild(span1);

            // Description
            const span2 = document.createElement('span');
            span2.textContent = project.description;
            span2.className = 'font-medium text-sky-500 mt-2';
            textContainer.appendChild(span2);

            // Technologies
            const spancontainer = document.createElement('span');
            spancontainer.className = 'flex gap-2 font-medium text-gray-600 dark:text-gray-400 mt-2 flex-wrap justify-end';
            textContainer.appendChild(spancontainer);

            const span3 = document.createElement('span');
            span3.className = 'left-card-technologies';
            span3.textContent = 'Technologies used:';
            spancontainer.appendChild(span3);

            const bar = document.createElement('span');
            bar.textContent = '|';
            spancontainer.appendChild(bar);

            const span4 = document.createElement('span');
            span4.className = 'left-card-technologies-list';
            span4.textContent = project.technologies;
            spancontainer.appendChild(span4);

            // External links
            const externalLinksContainer = document.createElement('div');
            externalLinksContainer.classList = 'text-slate-50 external-links-left';
            textContainer.appendChild(externalLinksContainer);

            const demoPage = document.createElement('a');
            demoPage.href = project.pageUrl;
            demoPage.target = '_blank';
            demoPage.rel = 'noopener noreferrer';
            externalLinksContainer.appendChild(demoPage);

            const demoPageImg = document.createElement('i');
            demoPageImg.className = 'fa-solid fa-arrow-up-right-from-square text-3xl';
            demoPage.appendChild(demoPageImg);

            const githubPage = document.createElement('a');
            githubPage.href = project.gitUrl;
            githubPage.target = '_blank';
            githubPage.rel = 'noopener noreferrer';
            externalLinksContainer.appendChild(githubPage);

            const githubPageImg = document.createElement('i');
            githubPageImg.className = 'fa-brands fa-github text-3xl';
            githubPage.appendChild(githubPageImg);

            // Modal on image click
            img.addEventListener('click', () => createModal(project.id));
        } else {
            // Odd id: right card
            card = document.createElement('div');
            card.className = 'flex flex-col lg:flex-row-reverse items-center gap-6 lg:gap-8 p-7 rounded-2xl';
            projectsContainer.appendChild(card);

            imgContainer = document.createElement('div');
            imgContainer.setAttribute('data-aos', 'fade-left');
            imgContainer.setAttribute('data-aos-once', 'true');
            imgContainer.className = 'flex-shrink-0 w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl';
            card.appendChild(imgContainer);

            img = document.createElement('img');
            img.id = `project-img-${project.id}`;
            img.src = project.path + '1.png';
            img.className = [
                'imgs-projects', 'img-container-left', 'shadow-xl', 'rounded-md',
                'transition-all', 'duration-300', 'ease-in-out', 'hover:scale-105',
                'hover:mask-l-from-100%', 'hover:mask-l-to-100%', 'cursor-pointer',
                'xl:mask-l-from-50%', 'xl:mask-l-to-90%', 'xl:blur-xs', 'hover:blur-none',
                'w-full', 'h-auto', 'max-h-80', 'object-cover'
            ].join(' ');
            img.style.height = '';
            img.style.width = '';
            img.style.objectFit = 'cover';
            img.alt = project.tittle;
            imgContainer.appendChild(img);

            textContainer = document.createElement('div');
            textContainer.className = 'flex flex-col items-center lg:items-start text-left lg:text-left w-full max-w-xs sm:max-2-md md:max-w-lg lg:max-2-2xl';
            card.appendChild(textContainer);

            // Title
            const span1 = document.createElement('span');
            span1.textContent = project.tittle;
            span1.className = 'right-card-technologies text-4xl font-bold text-slate-50';
            textContainer.appendChild(span1);

            // Description
            const span2 = document.createElement('span');
            span2.textContent = project.description;
            span2.className = 'font-medium text-sky-500 mt-2';
            textContainer.appendChild(span2);

            // Technologies
            const spancontainer = document.createElement('span');
            spancontainer.className = 'flex gap-2 font-medium text-gray-600 dark:text-gray-400 mt-2 flex-wrap justify-end';
            textContainer.appendChild(spancontainer);

            const span3 = document.createElement('span');
            span3.textContent = 'Technologies used:';
            spancontainer.appendChild(span3);

            const bar = document.createElement('span');
            bar.textContent = '|';
            spancontainer.appendChild(bar);

            const span4 = document.createElement('span');
            span4.textContent = project.technologies;
            spancontainer.appendChild(span4);

            // External links
            const externalLinksContainer = document.createElement('div');
            externalLinksContainer.classList = 'external-links-right text-slate-50';
            textContainer.appendChild(externalLinksContainer);

            const demoPage = document.createElement('a');
            demoPage.href = project.pageUrl;
            demoPage.target = '_blank';
            demoPage.rel = 'noopener noreferrer';
            externalLinksContainer.appendChild(demoPage);

            const demoPageImg = document.createElement('i');
            demoPageImg.className = 'fa-solid fa-arrow-up-right-from-square text-3xl';
            demoPage.appendChild(demoPageImg);

            const githubPage = document.createElement('a');
            githubPage.href = project.gitUrl;
            githubPage.target = '_blank';
            githubPage.rel = 'noopener noreferrer';
            externalLinksContainer.appendChild(githubPage);

            const githubPageImg = document.createElement('i');
            githubPageImg.className = 'fa-brands fa-github text-3xl';
            githubPage.appendChild(githubPageImg);

            // Modal on image click
            img.addEventListener('click', () => createModal(project.id));
        }
    });

    displayedProjects += projectsToShow.length;

    // Show/hide "Show More" button
    if (showMoreBtn) {
        showMoreBtn.style.display = (displayedProjects >= projectsListCache.length) ? 'none' : '';
    }
}
projectsData(); // Initial projects render

// "Show More Projects" button handler
if (showMoreBtn) {
    showMoreBtn.addEventListener('click', () => {
        renderProjects(3);
    });
}

// =======================
// FAQ Section
// =======================
export async function faqsData() {
    const res = await faqs();
    const faqList = res;

    faqList.forEach(faq => {
        const faqContainer = document.getElementById('faq-items');
        const faqItems = document.createElement('div');
        faqItems.setAttribute('data-aos', 'fade-up');
        faqItems.className = 'bg-slate-800 rounded-lg p-6 shadow-lg';

        const button = document.createElement('button');
        button.className = 'faq-question flex justify-between items-center w-full h-full text-left text-slate-50 text-lg font-bold hover:cursor-pointer';

        const span = document.createElement('span');
        span.textContent = faq.question;

        const i = document.createElement('i');
        i.className = 'fas fa-chevron-down transition-transform duration-300';

        const faqanswer = document.createElement('div');
        faqanswer.className = 'faq-answer mt-4 text-slate-300 hidden';
        faqanswer.textContent = faq.answer;

        faqContainer.appendChild(faqItems);
        faqItems.appendChild(button);
        button.appendChild(span);
        button.appendChild(i);
        faqItems.appendChild(faqanswer);
    });

    // Initialize the attachFaqListeners function.
    attachFaqListeners();
}
faqsData(); // Initial faqs render

// =======================
// Education Section
// =======================
export async function educationData() {
    const res = await educations();
    // Handle education data as needed
    // console.log(res);
}
educationData(); // Initial education fetch

// =======================
// End of file
// =======================
