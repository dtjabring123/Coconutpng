import { validation } from '../utils/validation.js'

describe("test name", () => {
    test("test case", () => {
        expect(validation.onlyNums('').toBe(false));
    })
});
