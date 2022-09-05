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
    test("ID with letters", () => {
        expect(validation.validID("123456789111I")).toBe(false);
    })
});

//tests for validName, tests for valid and invalid cases
describe("validName tests", () => {
    test("null name", () => {
        expect(validation.validName("")).toBe(false);
    })
    test("numeric name", () => {
        expect(validation.validName("Dylan1")).toBe(false);
    })
    test("valid name", () => {
        expect(validation.validName("Dylan")).toBe(true);
    })
});

//tests for validPhoneNum, tests for valid and invalid cases
describe("validPhoneNum tests", () => {
    test("null number", () => {
        expect(validation.validPhoneNum("")).toBe(false);
    })
    test("number too long", () => {
        expect(validation.validPhoneNum("12345678912345")).toBe(false);
    })
    test("number too short", () => {
        expect(validation.validPhoneNum("123")).toBe(false);
    })
    test("valid number", () => {
        expect(validation.validPhoneNum("0794049822")).toBe(true);
    })
    test("number with letters", () => {
        expect(validation.validPhoneNum("q079404982")).toBe(false);
    })
});

//tests for validDob, tests for valid and invalid cases
describe("validDob tests", () => {
    test("null date", () => {
        expect(validation.validDob("")).toBe(false);
    })
    test("not a date", () => {
        expect(validation.validDob("123asdas")).toBe(false);
    })
    test("date too recent", () => {
        expect(validation.validDob("2015-03-25")).toBe(false);
    })
    test("date not recent", () => {
        expect(validation.validDob("1015-03-25")).toBe(false);
    })
    test("valid date", () => {
        expect(validation.validDob("2000-11-04")).toBe(true);
    })
    var current_date = new Date();
    test("current date", () => {
        expect(validation.validDob(current_date)).toBe(false);
    })
});

//tests for validPassword
describe("validPassword tests", () => {
    test("too short", () => {
        expect(validation.validPassword("123")).toBe(false);
    })
    test("too long", () => {
        expect(validation.validPassword("that time i reincarnated as a compsci student")).toBe(false);
    })
    test("no lower case characters", () => {
        expect(validation.validPassword("QWERTY1")).toBe(false);
    })
    test("no upper case characters", () => {
        expect(validation.validPassword("qwerty1")).toBe(false);
    })
    test("no numbers", () => {
        expect(validation.validPassword("qwErtyy")).toBe(false);
    })
    test("valid password", () => {
        expect(validation.validPassword("Qeys2tdfs12")).toBe(true);
    })
});
