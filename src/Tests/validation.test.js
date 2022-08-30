import { validation } from '../utils/validation.js'

//tests for onlyNums, tests for valid and invalid cases
describe("onlyNums tests", () => {
    test("null string", () => {
        expect(validation.onlyNums("")).toBe(false);
    })
    test("only digits", () => {
        expect(validation.onlyNums("123456789")).toBe(true);
    })
    test("only letters", () => {
        expect(validation.onlyNums("asdfqwerty")).toBe(false);
    })
    test("both digits and letters", () => {
        expect(validation.onlyNums("123456789asdf")).toBe(false);
    })
});

//tests for validEmail, tests for valid and invalid cases
describe("validEmail tests", () =>{
    test("null email", () =>{
        expect(validation.validEmail("")).toBe(false);
    })
    test("short email", () => {
        expect(validation.validEmail("1@gmail")).toBe(false);
    })
    test("email with no @", () => {
        expect(validation.validEmail("2302997students.wits.ac.za")).toBe(false);
    })
    test("no letter after .", () => {
        expect(validation.validEmail("2302997@students..")).toBe(false);
    })
    test("valid email", () => {
        expect(validation.validEmail("2302997@students.wits.ac.za")).toBe(true);
    })
})

//tests for validID, tests for valid and invalid cases
describe("validID tests", () => {
    test("null ID", () => {
        expect(validation.validID("")).toBe(false);
    })
    test("short ID", () => {
        expect(validation.validID("123456789111")).toBe(false);
    })
    test("long ID", () => {
        expect(validation.validID("12345678911111")).toBe(false);
    })
    test("valid ID", () => {
        expect(validation.validID("1234567891111")).toBe(true);
    })
});
