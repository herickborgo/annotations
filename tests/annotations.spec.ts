import { Annotation } from '../src/annotation';

/**
 * @testAnnotation 123
 * @returns bool
 */
function method() {
    return true;
};

function methodWithoutAnnotation() {
    return true;
}

describe('Annotations test', () => {
    class TestAnnotation extends Annotation {}

    test('Assert annotation', () => {
        const testAnnotation: TestAnnotation = new TestAnnotation();
        expect(testAnnotation.getAnnotation()).toEqual('testAnnotation');
    });

    test('Assert metadata', () => {
        const testAnnotation: TestAnnotation = new TestAnnotation();
        expect(testAnnotation.getValues(__filename, 'method')).toEqual([ '123' ]);
    });

    test('Assert metadata', () => {
        const testAnnotation: TestAnnotation = new TestAnnotation();
        expect(testAnnotation.getValues(__filename, 'methodWithoutAnnotation')).toEqual([]);
    });
});