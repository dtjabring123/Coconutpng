import {login} from '../utils/login.js'

//tests for validLogin, tests for valid and invalid cases
describe("validLogin tests", () => {
    test("invalid email", () => {
        expect(login.validLogin({ email: "1@gmail", password: "Qeys2tdfs12" })).toBe([false, "Email is not in the correct format \n"]);
    })
});
