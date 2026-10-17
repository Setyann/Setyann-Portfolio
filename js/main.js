const menuButton = document.querySelector(".menu-toggle");
const navbar = document.querySelector(".navbar");
const roleElement = document.getElementById("role");
const terminal = document.getElementById("terminal-output");
const projectsContainer = document.getElementById("projects-container");
const filterButtons = document.querySelectorAll(".filter-btn");
const testimonialsSection = document.getElementById("testimonials");
const testimonialsContainer = document.getElementById("testimonials-container");

const roles = [
    "Web Developer",
    "App Developer",
    "Automation & Bot Developer",
    "Cybersecurity Enthusiast",
    "IT Infrastructure",
    "Software Architecture"
];

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
let roleIndex = 0;
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

function changeRole() {

    roleElement.style.opacity = 0;

    setTimeout(() => {

        roleElement.textContent = roles[roleIndex];

        roleElement.style.opacity = 1;

        roleIndex++;

        if (roleIndex >= roles.length) {
            roleIndex = 0;
        }

    }, 300);
}

function getStatusClass(status) {
    return status
        .toLowerCase()
        .replace(/\s+/g, "-");
}

function createProjectCard(project, projectIndex) {

    const card = document.createElement("article");

    card.className = "project-card";

    const statusClass = getStatusClass(project.status);

    let links = "";

    for (const [name, url] of Object.entries(project.links)) {

        if (!url) continue;

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
        }[name] || name;

        const target = name === "apk" ? "_self" : "_blank";

        links += `
            <a href="${url}" target="${target}" rel="noopener noreferrer">
                <i class="${linkData.icon}"></i> ${linkData.label}
            </a>
        `;
    }

    const stack = project.stack
        .map(item => `<span>${item}</span>`)
        .join("");

    card.innerHTML = `
        <div class="project-preview">
            <span class="project-number"></span>

            <div class="project-preview-content">
                <h3 translate="no">${project.title}</h3>
                <span>${project.subtitle}</span>
            </div>

            <div class="project-preview-line"></div>
        </div>

        <div class="project-info">

            <div class="project-status ${statusClass}">
                ${project.status}
            </div>

            <h3 class="project-title" translate="no">
                ${project.title}
            </h3>

            <p class="project-description">
                ${project.description}
            </p>

            <div class="project-stack" translate="no">
                ${stack}
            </div>

            <div class="project-links" translate="no">
                ${links}
            </div>

        </div>
    `;

    card.querySelector(".project-number").textContent =
    String(projectIndex + 1).padStart(2, "0");

    projectsContainer.appendChild(card);
}

function renderProjects() {
    projectsContainer.innerHTML = "";

    const filteredProjects = allProjects.filter(project => {
        return activeFilter === "all" ||
               project.category === activeFilter;
    });

    filteredProjects.forEach((project, index) => {
        createProjectCard(project, index);
    });
}

async function loadProjects() {
    try {
        const response = await fetch("data/projects.json");

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        allProjects = await response.json();

        renderProjects();

    } catch (error) {
        console.error("Failed to load projects:", error);
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