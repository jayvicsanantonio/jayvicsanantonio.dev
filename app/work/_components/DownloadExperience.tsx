"use client";

import Icon from "@/components/primitives/Icon";

import { EXPERIENCES } from "../_data/experiences";

export default function DownloadExperience() {
  const handleDownload = () => {
    const markdown = EXPERIENCES.map((exp) => {
      return `## ${exp.title} | ${exp.company}
${exp.period}

${exp.bullets.map((bullet) => `- ${bullet}`).join("\n")}

**Tags:** ${exp.tags.join(", ")}
`;
    }).join("\n---\n\n");

    const header = `# Jayvic San Antonio - Professional Experience\n\n`;
    const fullMarkdown = header + markdown;

    const blob = new Blob([fullMarkdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "jayvic-san-antonio-experience.md";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleDownload}
      className="group relative flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-300 transition-all hover:border-cyan-300/50 hover:bg-white/10 hover:text-cyan-300"
      aria-label="Download work experience as Markdown"
    >
      <Icon
        name="download"
        size={16}
        className="transition-transform group-hover:-translate-y-0.5"
      />
      <span>Download .md</span>
      <span className="absolute -bottom-px left-1/2 h-px w-0 -translate-x-1/2 bg-linear-to-r from-transparent via-cyan-300/50 to-transparent transition-all group-hover:w-2/3" />
    </button>
  );
}
