import { defineConfig } from 'vite';
import injectHTML from 'vite-plugin-html-inject';
import path from 'path';
import fs from 'fs';

// TODO: функция переброса изображений если не в public

function getHtmlEntries() {
    const pagesDir = path.resolve(__dirname + '/pages', "");
    const entries = {};

    // Read all files in the directory
    // TODO: полные пути реализовать
    const files = fs.readdirSync(pagesDir, { recursive: true });

    // Filter out HTML files
    const htmlFiles = files.filter((file) => file.endsWith(".html"));

    // Create entries for each HTML file
    htmlFiles.forEach((file, index) => {
        const name = path.basename(file, ".html");
        entries[index] = path.resolve(pagesDir, file);
    });

    return entries;
}


export default defineConfig({
    build: {
        rollupOptions: {
            output: {
                dir: './dist/',
                entryFileNames: 'srcipts/script.main.js',
                assetFileNames: 'styles/style.main.css', // TODO: разделить сборку css, и других файлов
                manualChunks: undefined,
            },
            input: getHtmlEntries(),
        }
    },
    plugins: [
        injectHTML(),
    ],
});