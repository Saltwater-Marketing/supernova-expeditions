export default function (eleventyConfig) {
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
  return {
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
}
