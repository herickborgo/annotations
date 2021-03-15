const fs = require('fs');
const path = require('path');

class Annotation {
    private annotation: string;
    private values: Array<any>;

    constructor() {
        this.annotation = `${this.constructor.name.charAt(0).toLowerCase()}${this.constructor.name.slice(1)}`;
        this.values = [];
    }

    public getAnnotation(): string {
        return this.annotation;
    }

    protected setValues(file: string, method: string): void {
        const readFile: string = fs.readFileSync(file).toString();
        const lines: Array<string> = readFile.split('\n');
        let annotation: string = '';
        lines.every((line: string) => {
            if (line.includes(`@${this.annotation}`)) {
                annotation = line.substr(line.indexOf(`@${this.annotation}`)).replace(`@${this.annotation}`, '').trim();
                return true;
            }

            if (line.match(/const|function/g)) {
                if (line.includes(method) && !!annotation) {
                    this.values = annotation.split(',');
                    return false;
                }
                if (!line.includes(method)) {
                    annotation = '';
                    return true;
                }
            }

            return true;
        });
    }

    public getValues(file: string, method: string): object {
        this.setValues(file, method);
        return this.values;
    }

    public static getAnnotationByClassName(className: string): string{
        const config = Annotation.getConfig();
        const values = Object.values(config);
        let annotation = `${className.charAt(0).toLowerCase()}${className.slice(1)}`;
        values.forEach((value, key) => {
            if (value === className) {
                annotation = Object.keys(config)[key];
            }
        })

        return annotation;
    }

    public static getConfig() {
        const configurationFile = `${path.dirname(require.main?.filename)}/annotations.config.js`;

        if (fs.existsSync(configurationFile)) {
            return require(configurationFile).config;
        }

        throw new Error('Configure file does not exists');
    }
}

export { Annotation };
