import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));
const pageNames = fs.readdirSync(path.join(root, "pages"))
  .filter(name => name.endsWith(".html"));

function copyImages(directory, prefix = "images") {
  const assets = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const source = path.join(directory, entry.name);
    const fileName = `${prefix}/${entry.name}`;
    if (entry.isDirectory()) assets.push(...copyImages(source, fileName));
    else assets.push({ type: "asset", fileName, source: fs.readFileSync(source) });
  }
  return assets;
}

export default {
  appType: "mpa",
  base: "/",
  plugins: [
    {
      name: "prepare-native-html-pages",
      apply: "build",
      transformIndexHtml: {
        order: "pre",
        handler(html, context) {
          const relativePage = path.relative(root, path.resolve(context.filename)).replaceAll("\\", "/");
          const insidePages = relativePage.startsWith("pages/");

          // Bundle the existing native JavaScript, including Firebase imports.
          html = html.replace(/<script\b([^>]*\bsrc=["'][^"']*javaScript\.js["'][^>]*)>/gi, (tag, attributes) => {
            return /\btype\s*=/.test(attributes) ? tag : `<script type="module"${attributes}>`;
          });

          // Images in HTML and images referenced by Firestore resolve from the site root.
          html = html.replace(/\b(src|href)=(["'])(?:\.\/|\.\.\/)?images\/([^"']+)\2/gi,
            (_, attribute, quote, image) => `${attribute}=${quote}/images/${image}${quote}`);

          // Correct the older footer links without changing the source pages.
          html = html.replace(/\bhref=(["'])(Home\.html|menu\.html|cart\.html|about & contact us\.html|register\.html|login\.html|profile\.html)\1/g,
            (tag, quote, target) => {
              if (insidePages && target === "Home.html") return `href=${quote}../Home.html${quote}`;
              if (!insidePages && target !== "Home.html") return `href=${quote}./pages/${target}${quote}`;
              return tag;
            });
          return html;
        }
      }
    },
    {
      name: "preserve-database-image-paths",
      apply: "build",
      generateBundle() {
        for (const asset of copyImages(path.join(root, "images"))) this.emitFile(asset);
      }
    }
  ],
  build: {
    outDir: "dist",
    rolldownOptions: {
      input: [
        path.join(root, "index.html"),
        path.join(root, "Home.html"),
        ...pageNames.map(name => path.join(root, "pages", name))
      ]
    }
  }
};
