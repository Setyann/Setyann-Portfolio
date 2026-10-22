const menuButton = document.querySelector(".menu-toggle");
const navbar = document.querySelector(".navbar");
const roleElement = document.getElementById("role");
const terminal = document.getElementById("terminal-output");
const projectsContainer = document.getElementById("projects-container");
const filterButtons = document.querySelectorAll(".filter-btn");
const testimonialsSection = document.getElementById("testimonials");
const testimonialsContainer = document.getElementById("testimonials-container");

const commands = [
    {
        command: "whoami",
        output: [
            "Web & Android Developer"
        ]
    },
    {
        command: "stack",
        output: [
            "HTML",
            "CSS",
            "JavaScript",
            "Java",
            "Kotlin",
            "Python",
            "SQL",
            "Git"
        ]
    },
    {
        command: "focus",
        output: [
            "Web Development",
            "Android Development",
            "Automation"
        ]
    },
    {
        command: "learning",
        output: [
            "Software Architecture",
            "Cybersecurity Fundamentals",
            "IT Infrastructure"
        ]
    },
    {
        command: "status",
        output: [
            "Open to opportunities"
        ]
    },
    {
        command: "clear",
        output: []
    }
];

let allProjects = [];
let activeFilter = "all";
let commandIndex = 0;


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function typeCommand(command) {

    const line = document.createElement("div");

    line.className = "terminal-line";

    const prompt = document.createElement("span");
    prompt.className = "prompt";
    prompt.textContent = "setyann@portfolio:~$ ";

    const commandText = document.createElement("span");

    const cursor = document.createElement("span");
    cursor.className = "cursor";
    cursor.textContent = "█";

    line.append(
        prompt,
        commandText,
        cursor
    );

    terminal.appendChild(line);
    terminal.scrollTop = terminal.scrollHeight;

    // ждём перед вводом
    if (command === "clear") {
        await sleep(8000);
    } else {
        await sleep(1800);
    }

    for (const char of command) {

        commandText.textContent += char;

        await sleep(100);

    }

    // Enter
    cursor.remove();

    return line;
}

async function printOutput(lines) {

    for (const item of lines) {

        const output = document.createElement("div");

        output.className = "output";

        output.textContent = item;

        terminal.appendChild(output);

        terminal.scrollTop = terminal.scrollHeight;

    }

}

async function runTerminal() {

    while (true) {

        for (const item of commands) {

            await typeCommand(item.command);

            await sleep(500);

            if (item.command === "clear") {

                terminal.innerHTML = "";

                continue;

            }

            await printOutput(item.output);

            // ожидание после ответа
            await sleep(500);

        }
        
    }

}

function getStatusClass(status) {
    return status
        .toLowerCase()
        .replace(/\s+/g, "-");
}

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => {
        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return entities[char];
    });
}

function getSafeURL(value) {
    if (typeof value !== "string") {
        return null;
    }

    try {
        const url = new URL(value, window.location.href);

        if (url.protocol !== "https:" && url.protocol !== "http:") {
            return null;
        }

        return escapeHTML(url.href);
    } catch (error) {
        return null;
    }
}

function isValidProject(project) {
    return (
        project !== null &&
        typeof project === "object" &&
        !Array.isArray(project) &&
        typeof project.title === "string" &&
        project.title.trim() !== "" &&
        typeof project.subtitle === "string" &&
        typeof project.description === "string" &&
        typeof project.category === "string" &&
        ["web", "mobile"].includes(project.category) &&
        typeof project.status === "string" &&
        [
            "Concept",
            "Development",
            "Testing",
            "Released",
            "Paused",
            "Archived",
            "Maintained"
        ].includes(project.status) &&
        Array.isArray(project.stack) &&
        project.stack.every(item => typeof item === "string") &&
        project.links !== null &&
        typeof project.links === "object" &&
        !Array.isArray(project.links)
    );
}

function createProjectCard(project) {

    const card = document.createElement("article");

    card.className = "project-card";

    const statusClass = getStatusClass(project.status);
    const safeTitle = escapeHTML(project.title);
    const safeSubtitle = escapeHTML(project.subtitle);
    const safeDescription = escapeHTML(project.description);
    const safeStatus = escapeHTML(project.status);

    let links = "";

    const projectLinks =
        project.links &&
        typeof project.links === "object" &&
        !Array.isArray(project.links)
            ? project.links
            : {};

    for (const [name, url] of Object.entries(projectLinks)) {
        const safeURL = getSafeURL(url);

        if (!safeURL) continue;

        const linkData = {
            demo: {
                label: "Demo",
                icon: "fa-solid fa-arrow-up-right-from-square"
            },
            github: {
                label: "GitHub",
                icon: "fa-brands fa-github"
            },
            apk: {
                label: "APK",
                icon: "fa-solid fa-download"
            }
        }[name];

        if (!linkData) continue;

        const target = name === "apk" ? "_self" : "_blank";

        links += `
            <a href="${safeURL}" target="${target}" rel="noopener noreferrer">
                <i class="${linkData.icon}"></i> ${linkData.label}
            </a>
        `;
    }

    const stack = (Array.isArray(project.stack) ? project.stack : [])
        .map(item => `<span>${escapeHTML(item)}</span>`)
        .join("");

    const kindLabel = project.category === "web" ? "Web" : "Mobile";
    const kind = project.kind === "concept" ? `${kindLabel} · Demo concept` : kindLabel;

    card.dataset.reveal = "";
    card.innerHTML = `
        <div class="project-preview">${window.makePreview(project.title, project.category)}</div>
        <div class="project-info">
            <div class="project-meta">
                <span class="project-status ${statusClass}">${safeStatus}</span>
                <span class="project-kind">${kind}</span>
            </div>
            <h3 class="project-title" translate="no">${safeTitle}</h3>
            <p class="project-subtitle">${safeSubtitle}</p>
            <p class="project-description">${safeDescription}</p>
            <div class="project-stack" translate="no">${stack}</div>
            <div class="project-links" translate="no">${links}</div>
        </div>
    `;

    projectsContainer.appendChild(card);
}

function renderProjects() {
    projectsContainer.innerHTML = "";

    const filteredProjects = allProjects.filter(project => {
        return activeFilter === "all" ||
               project.category === activeFilter;
    });

    let projectsShown = false; // рядом с остальными let

    if (filteredProjects.length === 0) {
        projectsContainer.textContent =
            allProjects.length === 0
                ? "No projects available yet."
                : "No projects in this category yet.";

        return;
    }

    filteredProjects.forEach(project => createProjectCard(project));
    window.reveal(projectsContainer, !projectsShown);
    projectsShown = true;
}

async function loadProjects() {
    projectsContainer.textContent = "Loading projects...";

    try {
        const response = await fetch("data/projects.json");

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const projects = await response.json();

        if (!Array.isArray(projects)) {
            throw new Error("Projects data must be an array");
        }

        const invalidCount = projects.filter(
            project => !isValidProject(project)
        ).length;

        if (invalidCount > 0) {
            console.warn(
                `Skipped ${invalidCount} invalid project record(s).`
            );
        }

        allProjects = projects.filter(isValidProject);
        renderProjects();

    } catch (error) {
        console.error("Failed to load projects:", error);

        projectsContainer.textContent =
            "Unable to load projects. Please refresh the page and try again.";
    }
}

function createTestimonialCard(testimonial) {
    const card = document.createElement("article");
    card.className = "testimonial-card";

    const quote = document.createElement("blockquote");
    quote.className = "testimonial-quote";
    quote.textContent = testimonial.text;

    const author = document.createElement("div");
    author.className = "testimonial-author";

    const name = document.createElement("h3");
    name.textContent = testimonial.name;

    const role = document.createElement("p");
    role.textContent = testimonial.role || "";

    author.append(name, role);
    card.append(quote, author);

    return card;
}

async function loadTestimonials() {
    if (!testimonialsSection || !testimonialsContainer) {
        return;
    }

    try {
        const response = await fetch("data/testimonials.json");

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const testimonials = await response.json();

        if (!Array.isArray(testimonials)) {
            throw new Error("Testimonials data must be an array");
        }

        const publishedTestimonials = testimonials.filter(item =>
            item.published === true &&
            typeof item.text === "string" &&
            item.text.trim() &&
            typeof item.name === "string" &&
            item.name.trim()
        );

        testimonialsContainer.replaceChildren();

        if (publishedTestimonials.length === 0) {
            testimonialsSection.hidden = true;
            return;
        }

        publishedTestimonials.forEach(testimonial => {
            testimonialsContainer.appendChild(
                createTestimonialCard(testimonial)
            );
        });

        testimonialsSection.hidden = false;

    } catch (error) {
        testimonialsSection.hidden = true;
        console.error("Failed to load testimonials:", error);
    }
}

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        activeFilter = button.dataset.filter;

        filterButtons.forEach(btn => {
            const isActive = btn === button;

            btn.classList.toggle("active", isActive);
            btn.setAttribute("aria-pressed", String(isActive));
        });

        renderProjects();
    });
});

loadProjects();

runTerminal();

loadTestimonials();

menuButton.addEventListener("click", () => {
    navbar.classList.toggle("active");

    menuButton.innerHTML = navbar.classList.contains("active")
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
});