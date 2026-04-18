import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";

const PROJECT_IMAGE_MAX_BYTES = 225 * 1024;
const PROJECT_IMAGE_DIR_MAX_BYTES = 900 * 1024;
const PUBLIC_DIR_MAX_BYTES = 3.5 * 1024 * 1024;
const ROOT = process.cwd();
const PUBLIC_DIR = join(ROOT, "public");
const PROJECT_IMAGES_DIR = join(PUBLIC_DIR, "images/projects");

const formatBytes = (bytes) => `${Math.round(bytes / 1024)} KB`;

const walkFiles = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = join(dir, entry.name);
    return entry.isDirectory() ? walkFiles(entryPath) : entryPath;
  });

const publicFiles = walkFiles(PUBLIC_DIR);
const projectImageFiles = walkFiles(PROJECT_IMAGES_DIR);
const errors = [];

for (const file of publicFiles) {
  const filePath = relative(ROOT, file);
  if (file.endsWith(".DS_Store")) {
    errors.push(`${filePath} should not be committed.`);
  }
  if (/public\/fonts\/SourceSansPro-.*\.woff2$/.test(filePath)) {
    errors.push(`${filePath} is unused. The site uses system sans plus Oswald.`);
  }
}

for (const file of projectImageFiles) {
  const extension = extname(file);
  const filePath = relative(ROOT, file);
  const size = statSync(file).size;

  if (![".webp", ".avif"].includes(extension)) {
    errors.push(`${filePath} should be WebP or AVIF for project listing/detail usage.`);
  }

  if (size > PROJECT_IMAGE_MAX_BYTES) {
    errors.push(
      `${filePath} is ${formatBytes(size)}; budget is ${formatBytes(PROJECT_IMAGE_MAX_BYTES)}.`,
    );
  }
}

const projectsData = readFileSync(join(ROOT, "app/projects/projects.data.ts"), "utf8");
const referencedImages = [...projectsData.matchAll(/src: "([^"]+)"/g)].map((match) => match[1]);

for (const imagePath of referencedImages) {
  if (!imagePath.startsWith("/images/")) continue;
  const fullPath = join(PUBLIC_DIR, imagePath);
  const extension = extname(fullPath);

  if (!existsSync(fullPath)) {
    errors.push(`${imagePath} is referenced from project data but does not exist in public/.`);
  }

  if (extension === ".png" || extension === ".jpg" || extension === ".jpeg") {
    errors.push(`${imagePath} is referenced from project data; use WebP or AVIF instead.`);
  }
}

const projectImageDirBytes = projectImageFiles.reduce((total, file) => total + statSync(file).size, 0);
if (projectImageDirBytes > PROJECT_IMAGE_DIR_MAX_BYTES) {
  errors.push(
    `public/images/projects is ${formatBytes(projectImageDirBytes)}; budget is ${formatBytes(
      PROJECT_IMAGE_DIR_MAX_BYTES,
    )}.`,
  );
}

const publicDirBytes = publicFiles.reduce((total, file) => total + statSync(file).size, 0);
if (publicDirBytes > PUBLIC_DIR_MAX_BYTES) {
  errors.push(
    `public is ${formatBytes(publicDirBytes)}; budget is ${formatBytes(PUBLIC_DIR_MAX_BYTES)}.`,
  );
}

if (errors.length) {
  console.error("Asset budget check failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.error(
  `Asset budgets passed: public=${formatBytes(publicDirBytes)}, project images=${formatBytes(
    projectImageDirBytes,
  )}.`,
);
