import * as Annotations from '../src/annotation';

/**
 * @testAnnotation 123
 * @returns bool
 */
function method() {
    return true;
};

describe('Annotations test', () => {
    class TestAnnotation extends Annotations.Annotation {}
    
    const testAnnotation = new TestAnnotation();

    test('Assert metadata', () => {
        expect(testAnnotation.getValues(__filename, 'method')).toEqual([ '123' ]);
    });

    test('Assert annotation', () => {
        expect(testAnnotation.getAnnotation()).toEqual('testAnnotation');
    });
});