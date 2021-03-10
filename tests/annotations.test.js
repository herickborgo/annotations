const Annotation = require('../src/annotation');

/**
 * @annotation 123
 * @returns bool
 */
function method() {
    return true;
};

describe('Annotations test', () => {
    const annotation = new Annotation();

    test('Assert metadata', () => {
        expect(annotation.getMetadata(__filename, 'method')).toEqual({ annotation: '@annotation 123'});
    });

    test('Assert annotation', () => {
        class TestAnnotation extends Annotation {
            constructor() {
                super();
            }
        }
        const testAnnotation = new TestAnnotation();
        expect(testAnnotation.getAnnotation()).toEqual('testannotation');
    });

    test('Assert class', () => {
        class TestAnnotation extends Annotation {
            constructor() {
                super();
            }
        }
        const testAnnotation = new TestAnnotation();
        expect(testAnnotation.getClass()).toEqual('TestAnnotation');
    });

    test('Assert execute method', () => {
        class TestAnnotation extends Annotation {
            constructor(name, email) {
                super();
                this.name = name;
                this.email = email;
            }

            execute() {
                return {
                    name: this.name,
                    email: this.email,
                };
            };
        }
        const testAnnotation = new TestAnnotation('Herick Borgo', 'hericoborgo1@gmail.com');
        expect(testAnnotation.execute()).toEqual({"email": "hericoborgo1@gmail.com", "name": "Herick Borgo"});
    });

    test('Assert execute method not implemented', () => {
        class TestAnnotation extends Annotation {
            constructor() {
                super();
            }
        }
        const testAnnotation = new TestAnnotation();
        expect(testAnnotation.execute).toThrowError('Method execute not implemented');
    });
});