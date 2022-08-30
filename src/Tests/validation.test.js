import { validation } from '/validation.js'

describe("test name", () => {
    test("test case", () => {
        expect(validation.onlyNums('').toBe(false));
    })
});
