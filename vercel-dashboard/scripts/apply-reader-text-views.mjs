import { readFileSync, writeFileSync } from "node:fs";

const files = [
  "src/lib/puebla-project-view.tsx",
  "src/lib/competitors-view.tsx",
  "src/lib/peru-overall-view.tsx",
  "src/lib/peru-b2b-view.tsx",
  "src/lib/peru-workshop-view.tsx",
  "src/lib/peru-view.tsx",
  "src/lib/peru-service-level-view.tsx",
  "src/lib/peru-consumer-vision-view.tsx",
  "src/lib/pesquisas-sections.tsx",
  "src/lib/mexico-view.tsx",
  "src/lib/user-journey-view.tsx",
];

const IMPORT = `import { ReaderText } from "./reader-text-ui";\n`;

for (const rel of files) {
  let s = readFileSync(rel, "utf8");
  if (!s.includes("reader-text-ui")) {
    s = s.replace(
      /from "@\/components\/ui";\n/,
      `from "@/components/ui";\n${IMPORT}`,
    );
  }
  // Text blocks whose sole child is a .detail or .summary field
  s = s.replace(
    /<Text(\s+[^>]*)>\{([^{}]+?\.(detail|summary))\}<\/Text>/g,
    "<ReaderText$1>{$2}</ReaderText>",
  );
  writeFileSync(rel, s);
  console.log("updated", rel);
}
