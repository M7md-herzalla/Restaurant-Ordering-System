import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));

// نحافظ على مسارات الصور المستخدمة في Firestore.
function copyImages(directory, prefix = "images") {
  const assets = [];

  for (const entry of fs.readdirSync(directory, {
    withFileTypes: true
  })) {
    const source = path.join(directory, entry.name);
    const fileName = `${prefix}/${entry.name}`;

    if (entry.isDirectory()) {
      assets.push(...copyImages(source, fileName));
    } else {
      assets.push({
        type: "asset",
        fileName,
        source: fs.readFileSync(source)
      });
    }
  }

  return assets;
}

export default {
  appType: "spa",
  base: "/",

  server: {
    port: 5173,
    strictPort: true
  },

  plugins: [
    {
      name: "preserve-database-image-paths",
      apply: "build",

      generateBundle() {
        const images = copyImages(path.join(root, "images"));

        for (const image of images) {
          this.emitFile(image);
        }
      }
    }
  ],

  build: {
    outDir: "dist",

    rolldownOptions: {
      input: path.join(root, "index.html")
    }
  }
};