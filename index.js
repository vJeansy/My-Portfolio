// Import dependencies and modules
import { projects, educations, skills } from './src/services/api.js';
import { currentYear } from './src/utils/currentYear.js';
import { initScrollButton } from './src/utils/upButton.js';
import { createModal } from './src/components/modal.js';
import { contactForm } from './src/components/contactForm.js';

// DOM Elements
const year = document.getElementById('current-year');
const frontEndSkills = document.getElementById('front-end');
const backEndSkills = document.getElementById('back-end');
const technologiesSkills = document.getElementById('technologies');
const projectsContainer = document.getElementById('projects-container');

// Initialize current year in footer
currentYear(year.id);

// Initialize scroll-to-top button
initScrollButton();

/**
 * Fetch and render skills data
 */
export async function skillsData() {
    const res = await skills();
    const skillList = res;

    // Clear containers before populating
    frontEndSkills.innerHTML = "";
    backEndSkills.innerHTML = "";
    technologiesSkills.innerHTML = "";

    skillList.forEach(function (skill) {
        const container =
            skill.type === 'front-end' ? frontEndSkills :
            skill.type === 'back-end' ? backEndSkills :
            skill.type === 'technologies' ? technologiesSkills :
            null;

        if (container) {
            const img = document.createElement('img');
            img.src = skill.logo;
            img.alt = skill.tittle;
            img.title = skill.tittle;
            img.className = 'h-16 w-auto cursor-grab';

            const p = document.createElement('p');
            p.textContent = skill.tittle;
            p.className = 'text-slate-50 font-extrabold text-4xl cursor-grab';

            container.appendChild(img);
            container.appendChild(p);
        }
    });
}

skillsData(); // Initial skills render

// Project rendering state
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

        // Alternate card layout based on project id
        if (project.id % 2 === 0) {
            card = document.createElement('div');
            card.className = 'flex flex-col lg:flex-row items-center gap-6 lg:gap-8 p-7 rounded-2xl';
            projectsContainer.appendChild(card);

            imgContainer = document.createElement('div');
            imgContainer.className = `hover:scale-105 hover:mask-r-from-100% hover:mask-r-to-100% transition-all
                duration-300 flex-shrink-0 cursor-pointer xl:mask-r-from-50% xl:mask-r-to-90% xl:blur-xs hover:blur-none`;
            card.appendChild(imgContainer);

            img = document.createElement('img');
            img.src = project.path + '1.png';
            img.className = 'imgs-projects img-container-left shadow-xl rounded-md';
            img.style.height = '20rem';
            img.style.width = '40rem';
            img.style.objectFit = 'cover';
            img.alt = project.tittle;
            imgContainer.appendChild(img);

            textContainer = document.createElement('div');
            textContainer.className = 'flex flex-col items-center lg:items-start text-left lg:text-left w-full';
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
        }

        // Odd id: right card
        if (project.id % 2 !== 0) {
            card = document.createElement('div');
            card.className = 'flex flex-col lg:flex-row-reverse items-center gap-6 lg:gap-8 p-7 rounded-2xl';
            projectsContainer.appendChild(card);

            imgContainer = document.createElement('div');
            imgContainer.className = `hover:scale-105 hover:mask-l-from-100% hover:mask-l-to-100%
                transition-all duration-300 flex-shrink-0 cursor-pointer xl:mask-l-from-50% xl:mask-l-to-90% xl:blur-xs hover:blur-none`;
            card.appendChild(imgContainer);

            img = document.createElement('img');
            img.src = project.path + '1.png';
            img.className = 'imgs-projects img-container-left shadow-xl rounded-md';
            img.style.height = '20rem';
            img.style.width = '40rem';
            img.style.objectFit = 'cover';
            img.alt = project.tittle;
            imgContainer.appendChild(img);

            textContainer = document.createElement('div');
            textContainer.className = 'flex flex-col items-center lg:items-start text-left lg:text-left w-full';
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
    const showMoreBtn = document.getElementById('show-more-projects');
    if (showMoreBtn) {
        if (displayedProjects >= projectsListCache.length) {
            showMoreBtn.style.display = 'none';
        } else {
            showMoreBtn.style.display = '';
        }
    }
}

projectsData(); // Initial projects render

// "Show More Projects" button handler
const showMoreBtn = document.getElementById('show-more-projects');
if (showMoreBtn) {
    showMoreBtn.addEventListener('click', () => {
        renderProjects(3);
    });
}

/**
 * Fetch and handle education data
 */
export async function educationData() {
    const res = await educations();
    // Handle education data as needed
    // console.log(res);
}

educationData(); // Initial education fetch

// Initialize contact form
contactForm();