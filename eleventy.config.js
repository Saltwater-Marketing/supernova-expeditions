import fs from "node:fs";
import crypto from "node:crypto";

const imgMeta = JSON.parse(fs.readFileSync("src/_data/imgmeta.json", "utf8"));
const esc = (v) => String(v).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

export default function (eleventyConfig) {
  // Responsive image: {% img "file.webp", "Alt text", "sizes", "eager"|"lazy", "class" %}
  eleventyConfig.addShortcode("img", (file, alt, sizes = "100vw", load = "lazy", cls = "") => {
    const m = imgMeta[file];
    if (!m) throw new Error("Unknown image " + file);
    const base = file.replace(/\.webp$/, "");
    const srcset = m.widths.map((w) => `/images/w/${base}-${w}.webp ${w}w`).join(", ");
    const fallback = `/images/w/${base}-${m.widths[Math.min(1, m.widths.length - 1)]}.webp`;
    const h = Math.round((m.h * m.widths[m.widths.length - 1]) / m.w);
    const loading = load === "eager" ? 'fetchpriority="high"' : 'loading="lazy" decoding="async"';
    return `<img src="${fallback}" srcset="${srcset}" sizes="${esc(sizes)}" alt="${esc(alt)}" width="${m.widths[m.widths.length - 1]}" height="${h}" ${loading}${cls ? ` class="${cls}"` : ""}>`;
  });
  eleventyConfig.addFilter("heroSrcset", (file) => {
    const m = imgMeta[file]; const base = file.replace(/\.webp$/, "");
    return m.widths.map((w) => `/images/w/${base}-${w}.webp ${w}w`).join(", ");
  });
  // Site CSS inlined into <head> (no render-blocking stylesheet)
  eleventyConfig.addShortcode("inlineCss", () => fs.readFileSync("src/assets/css/site.css", "utf8").replace(/\s*\n\s*/g, "\n"));
  eleventyConfig.addFilter("hash", (path) => crypto.createHash("md5").update(fs.readFileSync("src" + path)).digest("hex").slice(0, 8));

  eleventyConfig.addPassthroughCopy({ "src/images": "images" });
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/favicon.png": "favicon.png" });
  eleventyConfig.addFilter("json", (v) => JSON.stringify(v));
  eleventyConfig.addFilter("fmtDate", (iso) => {
    const d = new Date(iso + "T12:00:00");
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  });
  eleventyConfig.addFilter("upcoming", (trips) => {
    const today = new Date().toISOString().slice(0, 10);
    return trips.filter((t) => t.end >= today).sort((a, b) => a.start.localeCompare(b.start));
  });
  eleventyConfig.addFilter("faqSchema", (groups) => JSON.stringify({
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: groups.flatMap((g) => g.items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })))
  }));
  // FAQPage schema from on-page accordions marked data-faq-schema (trip pages)
  eleventyConfig.addTransform("faqSchema", function (content) {
    if (!(this.page.outputPath || "").endsWith(".html") || !content.includes("data-faq-schema")) return content;
    const block = content.split("data-faq-schema")[1].split("</div>")[0];
    const strip = (h) => h.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
    const items = [...block.matchAll(/<summary>([\s\S]*?)<\/summary>\s*<p>([\s\S]*?)<\/p>/g)]
      .filter((m) => !/\[CONFIRM/.test(m[2]))
      .map((m) => ({ "@type": "Question", name: strip(m[1]), acceptedAnswer: { "@type": "Answer", text: strip(m[2]) } }));
    const json = JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: items });
    return content.replace("</head>", `<script type="application/ld+json">${json}</script>\n</head>`);
  });
  return {
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
}
