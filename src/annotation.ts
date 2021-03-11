import * as fs from 'fs';

abstract class Annotation {
    private name: string;
    private values: Array<any>;

    constructor() {
        this.name = `${this.constructor.name.charAt(0).toLowerCase()}${this.constructor.name.slice(1)}`;
        this.values = [];
    }

    public getAnnotation(): string {
        return this.name;
    }

    protected setValues(file: string, method: string): void {
        const readFile: string = fs.readFileSync(file).toString();
        const lines: Array<string> = readFile.split('\n');
        let annotation: string = '';

        lines.every((line: string) => {
            if (line.includes(`@${this.name}`)) {
                annotation = line.substr(line.indexOf(`@${this.name}`)).replace(`@${this.name}`, '').trim();
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
}

export { Annotation };
