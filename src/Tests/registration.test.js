import { validRegistration } from '../utils/registration.js'

//tests for validRegistration, tests for valid and invalid cases
describe("validRegistration tests", () => {
    const validDetail = { // valid details
        fname: "Dylan",
        lname: "Dylan",
        dob: "2000-11-04",
        phonenum: "0794049822",
        email: "2302997@students.wits.ac.za",
        password: "Qeys2tdfs12",
        admin: "admin",
        id: "1234567891111"
    }
    const details = { // invalid details
        fname: "",
        lname: "",
        dob: "",
        phonenum: "",
        email: "",
        password: "",
        admin: "ad",
        id: ""
    }
    test("valid details", () => {
        expect(validRegistration(validDetail)).toStrictEqual([true, ""]);
    })
    test("invalid details", () => {
        expect(validRegistration(details)).toStrictEqual([false, "Names should only contain alphabetical characters and not be empty \nPhone numbers should be 10 or 13 characters long and only contain numbers or a single  '+' \nID should be 13 characters long and only contain numbers \nUser must be between 18 and 75 years old inclusive to register \nPassword must be between 6 and 15 characters long inclusive.\nPassword should contain at least 1 uppercase letter, 1 lowercase letter and 1 number \nInvalid admin code \n"]);
    })
    /*details.fname = "1";
    test("invalid fname", () => {
        expect(validRegistration(details.fname,vd.lname,vd.dob,vd.phonenum,vd.email,vd.password,vd.admin,vd.id)).toStrictEqual([false, "Names should only contain alphabetical characters and not be empty \n"]);
    })
    details.fname = "Dylan";
    details.lname = "";
    test("invalid lname", () => {
        expect(validRegistration(details)).toStrictEqual([false, "Names should only contain alphabetical characters and not be empty \n"]);
    })
    details.fname = "";
    test("invalid names", () => {
        expect(validRegistration(details)).toStrictEqual([false, "Names should only contain alphabetical characters and not be empty \n"]);
    })
    details.fname = "Dylan";
    details.lname = "Dylan";
    details.dob="";
    test("invalid dob", () => {
        expect(validRegistration(details)).toStrictEqual([false, "User must be between 18 and 75 years old inclusive to register \n"]);
    })
    details.dob="2000-11-04";
    details.phonenum="";
    test("invalid phonenum", () => {
        expect(validRegistration(details)).toStrictEqual([false, "Phone numbers should be 10 or 13 characters long and only contain numbers or a single  '+' \n"]);
    })
    details.phonenum="0794049822";
    details.password="";
    test("invalid password", () => {
        expect(validRegistration(details)).toStrictEqual([false, "Password must be between 6 and 15 characters long inclusive.\nPassword should contain at least 1 uppercase letter, 1 lowercase letter and 1 number \n"]);
    })
    details.password ="Qeys2tdfs12";
    details.id="";
    test("invalid id", () => {
        expect(validRegistration(details)).toStrictEqual([false, "ID should be 13 characters long and only contain numbers \n"]);
    })
    details.id ="1234567891111";
    details.admin = "ad";
    test("invalid admin", () => {
        expect(validRegistration(details)).toStrictEqual([false, "Invalid admin code \n"]);
    })
    details.admin = "admin";*/
});
