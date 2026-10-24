# Setyann — Portfolio

Personal portfolio of Setyann, an independent software developer. Built with plain HTML, CSS and JavaScript, no build step.

**Live:** https://setyann.github.io/

## Features

- Projects loaded from a JSON file, with filters for web and mobile
- Terminal-style section that types out a short profile
- Responsive layout, keyboard and screen-reader friendly controls
- Respects `prefers-reduced-motion`
- Project data is validated before rendering; invalid records are skipped

## Structure
```
Portfolio  
├── index.html # page structure  
├── css/styles.css # styles and animations  
├── js/main.js # projects, filters, terminal, testimonials  
├── data/  
│ ├── projects.json # projects shown on the site  
│ └── testimonials.json  
└── favicon.ico  
```

## Run locally

No installation needed. Serve the folder with any static server, for example:

```bash
python -m http.server 8000
```

Then open http://localhost:8000. Opening `index.html` directly will not load the JSON files in most browsers.

## Adding a project

Add an object to `data/projects.json`:

```json
{
    "title": "Project name",
    "category": "web",
    "subtitle": "Short tagline.",
    "description": "One or two sentences about what it does.",
    "stack": ["HTML", "CSS", "JavaScript"],
    "status": "Released",
    "private": false,
    "links": {
        "demo": "https://example.com/",
        "github": "https://github.com/Setyann/project",
        "apk": null
    }
}
```

- `category`: `web` or `mobile`.
- `status`: one of `Concept`, `Development`, `Testing`, `Released`, `Paused`, `Archived`, `Maintained`.
- `kind` (optional): `concept` marks a fictional demo. The card then shows "Demo concept". Use it for sites that are not real businesses.
- `links`: `demo`, `github` and `apk` are shown when set; `null` hides them.

Records with missing or invalid fields are skipped, and a warning is logged to the console.

## Deploy

The site is published with GitHub Pages from the `main` branch, root folder. Pushing to `main` updates the live site within a few minutes.

## Notes

Fictional demo projects are for presentation only and do not represent real businesses.

## Contact

- Email: aram.setyan1@gmail.com
- Telegram: [@Setyann](https://t.me/Setyann)
- GitHub: [Setyann](https://github.com/Setyann)