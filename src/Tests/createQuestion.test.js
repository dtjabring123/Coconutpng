import { validQuestion } from '../utils/createQuestion.js'

//tests for validQuestion, tests for valid and invalid classes
describe("validQuestion tests", () => {
    test("null title", () => {
        expect(validQuestion({ title: null, description: null })).toBe(false);
    })
    test("empty title", () => {
        expect(validQuestion({ title: "", description: "" })).toBe(false);
    })
    test("valid title", () => {
        expect(validQuestion({ title: "what is going on", description: "in the house of commons" })).toBe(true);
    })
});