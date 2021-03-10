import * as fs from 'fs';

export abstract class Annotation {
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
        const readFile = fs.readFileSync(file).toString();
        const lines = readFile.split('\n');
        let annotation: string = '';
        lines.forEach((line: string) => {
            annotation = line.includes(`@${this.name}`) ? line.substr(line.indexOf(`@${this.name}`)).replace(`@${this.name}`, '').trim() : annotation;
            
            this.values = line.match(/const|function/g) && line.includes(method) ? !!annotation ? annotation.split(',') : [] : this.values;
        });
    }

    public getValues(file: string, method: string): object {
        this.setValues(file, method);
        return this.values;
    }
}
