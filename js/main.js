const menuButton = document.querySelector(".menu-toggle");
const navbar = document.querySelector(".navbar");
const roleElement = document.getElementById("role");
const terminal = document.getElementById("terminal-output");
const projectsContainer = document.getElementById("projects-container");

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

        links += `
            <a href="${url}" target="_blank" rel="noopener noreferrer">
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

async function loadProjects() {

    try {

        const response = await fetch("data/projects.json");

        const projects = await response.json();

        projects.forEach((project, index) => {
            createProjectCard(project, index);
        });

    } catch (error) {

        console.error("Failed to load projects:", error);

    }
}



loadProjects();

changeRole();

runTerminal();

setInterval(changeRole, 2500);

menuButton.addEventListener("click", () => {
    navbar.classList.toggle("active");

    menuButton.innerHTML = navbar.classList.contains("active")
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
});