/* Visual helpers: scroll reveal + generated project previews.
   Loaded before main.js. Exposes window.reveal and window.makePreview. */

(function () {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observer = "IntersectionObserver" in window && !reduceMotion
        ? new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" })
        : null;

    // animate=false shows elements immediately (used when filtering)
    window.reveal = function (root, animate = true) {
        root.querySelectorAll("[data-reveal]:not(.is-visible)").forEach((el, i) => {
            if (!observer || !animate) {
                el.classList.add("is-visible");
                return;
            }
            el.style.transitionDelay = `${Math.min(i, 3) * 80}ms`;
            observer.observe(el);
        });
    };

    function hash(text) {
        let h = 2166136261;
        for (const char of text) {
            h ^= char.charCodeAt(0);
            h = Math.imul(h, 16777619);
        }
        return h >>> 0;
    }

    function rng(seed) {
        return function () {
            seed = (seed + 0x6D2B79F5) | 0;
            let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
            t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
            return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
        };
    }

    // Deterministic abstract preview: same title -> same composition.
    // Web = horizontal frame, mobile = vertical frame. No user text enters the SVG.
    window.makePreview = function (title, category) {
        const rand = rng(hash(title));
        const mobile = category === "mobile";

        const frame = mobile
            ? { x: 150, y: 20, w: 100, h: 200, r: 16 }
            : { x: 70, y: 30, w: 260, h: 180, r: 8 };

        const pad = 12;
        const gap = 6;
        const x0 = frame.x + pad;
        const innerW = frame.w - pad * 2;
        const rows = mobile ? 4 : 3;
        const top = frame.y + (mobile ? 28 : 36);
        const rowH = (frame.h - (top - frame.y) - pad - gap * (rows - 1)) / rows;
        const accent = [Math.floor(rand() * rows), Math.floor(rand() * 2)];

        let shapes = "";

        for (let row = 0; row < rows; row++) {
            const count = mobile ? 1 + Math.floor(rand() * 2) : 1 + Math.floor(rand() * 3);
            const weights = Array.from({ length: count }, () => 0.5 + rand());
            const total = weights.reduce((a, b) => a + b, 0);
            const free = innerW - gap * (count - 1);
            let x = x0;

            weights.forEach((weight, col) => {
                const w = (weight / total) * free;
                const cls = row === accent[0] && col === Math.min(accent[1], count - 1)
                    ? "pv-acc"
                    : "pv-block";

                shapes += `<rect class="${cls}" x="${x.toFixed(1)}" y="${(top + row * (rowH + gap)).toFixed(1)}" width="${w.toFixed(1)}" height="${rowH.toFixed(1)}" rx="3"/>`;
                x += w + gap;
            });
        }

        const bar = mobile
            ? `<rect class="pv-block" x="${frame.x + 36}" y="${frame.y + 9}" width="28" height="5" rx="2.5"/>`
            : `<circle class="pv-block" cx="${frame.x + 14}" cy="${frame.y + 14}" r="3"/><circle class="pv-block" cx="${frame.x + 26}" cy="${frame.y + 14}" r="3"/><circle class="pv-block" cx="${frame.x + 38}" cy="${frame.y + 14}" r="3"/>`;

        return `<svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">
            <rect class="pv-frame" x="${frame.x}" y="${frame.y}" width="${frame.w}" height="${frame.h}" rx="${frame.r}"/>
            ${bar}${shapes}
        </svg>`;
    };

    // static sections
    document.addEventListener("DOMContentLoaded", () => window.reveal(document));
})();