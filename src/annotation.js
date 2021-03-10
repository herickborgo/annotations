'use strict';

const fs = require('fs');

class Annotation {
    constructor() {
        this.class = this.constructor.name;
        this.annotation = this.class.toLowerCase();
        this.metadata = {};
    }

    getClass() {
        return this.class;
    }

    getAnnotation() {
        return this.annotation;
    }

    setMetadata(file, method) {
        const readFile = fs.readFileSync(file).toString();
        const lines = readFile.split('\n');
        const metadata = {}
        lines.forEach((line) => {
            if (line.includes(`@${this.annotation}`)) {
                metadata.annotation = line.substr(line.indexOf('@'));
            }

            if ((metadata.annotation && line.includes('function'))
                || (metadata.annotation && line.includes('const'))) {
                line.includes(method) ? this.metadata = {...metadata} : metadata.annotation = null;
            }
        });
    }

    getMetadata(file, method) {
        this.setMetadata(file, method);
        return this.metadata;
    }

    execute() {
        throw new Error('Method execute not implemented');
    }
}

module.exports = Annotation;