import { projects } from "../services/api.js";

export async function createModal(projectId) {
    // Fetch projects array
    const projectsList = await projects();
    if (!projectsList) {
        alert("Could not load projects.");
        return;
    }

    console.log('projectId:', projectId);
    console.log('projectsList:', projectsList);
    // Ensure type consistency for id comparison
    const project = projectsList.find(
        p => String(p.id) === String(projectId)
    );

    if (!project) {
        alert("Project not found.");
        return;
    }

    // Build image paths
    const imagePaths = [];
    for (let i = 1; i <= project.amountOfImages; i++) {
        imagePaths.push(`${project.path}${i}.png`);
    }

    // Modal content structure
    let modalContent = `
        <div class="bg-[#0D1117] p-6 rounded-lg w-[60rem] text-center relative z-60
        transition transform duration-300 opacity-0 scale-95 animate-[fadeZoom_0.5s_ease-out_forwards]">
            <button id="closeModalBtn" class="absolute top-1 right-2 text-slate-50 p-1 text-xl rounded cursor-pointer" title="Close">✖</button>
            <h2 class="text-xl font-bold mb-4 text-slate-50">${project.tittle}</h2>
            <div id="carousel" class="relative w-full h-full mt-4">
                <img id="carouselImg" src="${imagePaths[0] || ''}" class="rounded shadow-lg w-full h-full object-cover">
                <button id="prevBtn" class="absolute left-2 top-1/2 bg-gray-600 text-white p-1 rounded h-8 w-8" title="Previous">◀</button>
                <button id="nextBtn" class="absolute right-2 top-1/2 bg-gray-600 text-white p-1 rounded h-8 w-8 cursor-pointer" title="Next">▶</button>
            </div>
        </div>
    `;

    const modal = document.createElement("div");
    modal.className = "fixed inset-0 bg-opacity-50 flex justify-center items-center z-50";
    modal.innerHTML = modalContent;
    document.body.appendChild(modal);

    // Add blur to main content
    const mainContent = document.getElementById("main-content");
    const mainHeader = document.getElementById("main-header");
    if (mainContent) {
        mainContent.classList.add("blur-xs");
        mainHeader.classList.add("blur-xs");
    }

    // Close modal logic
    modal.querySelector("#closeModalBtn").addEventListener("click", () => {
        document.body.removeChild(modal);
        if (mainContent) {
            mainContent.classList.remove("blur-xs");
            mainHeader.classList.remove("blur-xs");
        }
    });

    // Carousel logic
    let currentIndex = 0;
    const imgElement = modal.querySelector("#carouselImg");
    modal.querySelector("#prevBtn").addEventListener("click", () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : imagePaths.length - 1;
        imgElement.src = imagePaths[currentIndex];
    });
    modal.querySelector("#nextBtn").addEventListener("click", () => {
        currentIndex = (currentIndex < imagePaths.length - 1) ? currentIndex + 1 : 0;
        imgElement.src = imagePaths[currentIndex];
    });
}