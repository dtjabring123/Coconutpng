import { validLogin } from '../utils/login.js'

//tests for validLogin, tests for valid and invalid cases
describe("validLogin tests", () => {
    test("invalid email", () => {
        expect(validLogin({ email: "1@gmail", password: "Qeys2tdfs12" })).toStrictEqual([false, "Email is not in the correct format \n"]);
    })
    test("invalid password", () => {
        expect(validLogin({ email: "2302997@students.wits.ac.za", password: "123" })).toStrictEqual([false, "Passwords must be at least 6 characters long and not longer than 15 characters \n"]);
    })
    test("invalid email and invalid password", () => {
        expect(validLogin({ email: "1@gmail", password: "123" })).toStrictEqual([false, "Email is not in the correct format \nPasswords must be at least 6 characters long and not longer than 15 characters \n"]);
    })
    test("valid details", () => {
        expect(validLogin({ email: "2302997@students.wits.ac.za", password: "Qeys2tdfs12" })).toStrictEqual([true, ""]);
    })
});
