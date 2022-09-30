
import { getAuth } from "firebase/auth";
import { register} from "../utils/database_functions";



//user details used for testing
const testDetails = {
    first_name: "main",
    last_name: "tester",
    dob: "1998-02-12",
    id_number: "0011223344556",
    mobile_number: "0784039821",
    role: 0,
    email: "maintester@gmail.com",
    password: "dontworryAbout1t"
}

//tests for register, test for invalid (auth/admin-restricted-operation)
describe("register tests", () => {
    test("invalid data", async () => {
        const output = await register(testDetails);
        expect(output[0]).toBe("failed")
    })
})

//describe("login")
