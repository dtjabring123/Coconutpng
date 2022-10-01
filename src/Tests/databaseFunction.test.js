/**
 * @jest-environment node
 */

import { async } from "@firebase/util";
import exp from "constants";
import {
    register, logIn, logOut, getUserDetails, CompareUserID,
    changePassword, updateUserDetails
} from "../utils/database_functions";

//user details used for testing
const testDetails = {
    first_name: "main",
    last_name: "tester",
    dob: "1998-02-12",
    id_number: "0011223344556",
    mobile_number: "0784039821",
    role: 0,
    email: "maintester@gmail.com",
    password: "dontworryBout1t"
}

//test for register, test for invalid (auth/admin-restricted-operation)
describe("register test", () => {
    test("invalid data", () => {
        return register(testDetails).then(output => {
            expect(output[0]).toBe("failed");
        })
    })
})

//test for logOut, test for valid
describe("logOut test", () => {
    test.only("valid log out", () => {
        expect(logOut()).toBe("success");
    })
})

//test for getUserDetails (null)
describe("getUserDetails test", () => {
    test("valid details", () => {
        return getUserDetails().then(output => {
            expect(output[0]).toBe("failed");
        })
    })
})

//test for logIn, test for invalid (undefined)
describe("logIn test", () => {
    test("valid login", () => {
        return logIn(testDetails.email, testDetails.password).then(output => {
            expect(output).toBe("success");
        })
    })
    test.only("valid login", async () => {
        const output = await logIn(testDetails.email, testDetails.password);
        expect(output).toBe("success");
    })
    test.only("valid login", async () => {
        expect.assertions(1);
        try {
            const output = await logIn(testDetails.email, testDetails.password);
            expect(output).toBe("success");
        } catch (e) {

        }
    })
    test("valid login", async () => {
        try {
            await expect(logIn(testDetails.email, testDetails.password)).resolves.toBe("success")
        } catch (e) {

        }
    })
    test("valid login", async () =>{
        await expect(logIn(testDetails.email, testDetails.password)).resolves.toBe("success")

    })
    test("valid login", async () =>{
        expect.assertions(1);
        try{
            await logIn(testDetails.email,testDetails.password);
        }catch(e){

        }
    })
    test("invalid login", () => {
        return logIn("asdf", "1234").then(output => {
            expect(output[0]).toBe("failed");
        })
    })
})

//tests for CompareUserID, tests for valid and invalid
describe("CompareUserID test", () => {
    test("valid details", () => {
        return CompareUserID(testDetails.email, testDetails.id_number).then(output => {
            expect(output[0]).toBe("success");
        })
    })
    test("invalid details", () => {
        return CompareUserID("asdf", "1234").then(output => {
            expect(output[0]).toBe("failed");
        })
    })
})

//test for changePassword, test for valid
describe("changePassword test", () => {
    test("valid password", () => {
        expect(changePassword(testDetails.password)).toStrictEqual(["success"]);
    })
})

//test for updateUserDetails,tests for valid
describe("updateUserDetails test", () => {
    const tempDetails = {
        first_name: "ya",
        last_name: "boi",
        phoneNumber: "4594625966",
        role: 1
    }
    test("valid", () => {
        return updateUserDetails(tempDetails).then(output => {
            expect(output).toStrictEqual(["success"]);
        })
    })
    const moreTempDetails = {
        first_name: "main",
        last_name: "tester",
        phoneNumber: "0784039821",
        role: 0
    }
    test("valid", () => {
        return updateUserDetails(moreTempDetails).then(output => {
            expect(output).toStrictEqual(["success"]);
        })
    })
})

//test for getUserDetails
describe("getUserDetails test", () => {
    test("valid details", () => {
        return getUserDetails().then(output => {
            expect(output[0]).toBe("success");
        })
    })
})

