/**
 * @jest-environment node
 */
import {
    register, logIn, logOut, getUserDetails, CompareUserID, changePassword, 
    updateUserDetails, getAllQuestions, askQuestion, likeQuestion, 
    getQuestionInfo, giveResponse_or_Comment, getResponses, getComments, 
    changeMark
}
    from '../utils/database_functions.js'

//test for register, test for valid
describe("register tests",()=>{
    test("valid details", async () => {
        try {
            details = await register("the", "tester", "1998-02-12","0000000000008","0784039821","0","tester@gmail.com","nunYaBussiness")
            Promise.resolve(details).then((arr) => {
                expect(arr[0]).toBe('success')
            })
        } catch (e) {
        }
    })
});

//tests for logIn, tests for valid and invalid cases
describe("logIn tests", () => {
    test('incorrect email', async () => {
        try {
            outcome = await logIn('invalid', 'reading123')
            Promise.resolve(outcome).then((arr) => {
                expect(arr).toBe('failed')
            })
        } catch (e) {
        }
    })
    test('incorrect password', async () => {
        try {
            outcome = await logIn('readingtests@gmail.com', 'wrongPass')
            Promise.resolve(outcome).then((arr) => {
                expect(arr).toBe('failed')
            })
        } catch (e) {
        }
    })
    test('incorrect email and password', async () => {
        try {
            outcome = await logIn('invalid', 'wrongPass')
            Promise.resolve(outcome).then((arr) => {
                expect(arr).toBe('failed')
            })
        } catch (e) {
        }
    })
    test('correct email and password', async () => {
        try {
            outcome = await logIn('readingtests@gmail.com', 'reading123')
            Promise.resolve(outcome).then((arr) => {
                expect(arr).toBe('success')
            })
        } catch (e) {
        }
    })
});

//tests for logOut, test for valid
describe("logOut test", () => {
    test.only('valid log out', async () => {
        try {
            outcome = await logOut()
            Promise.resolve(outcome).then((arr) => {
                expect(arr).toBe('success')
            })
        } catch (e) {
        }
    })
})

//tests for getUserDetails, tests for valid and invalid
describe('getUserDetails tests', () => {
    test('valid getUserDetails', async () => {
        try {
            details = await getUserDetails()
            Promise.resolve(details).then((arr) => {
                expect(arr[0]).toBe('success')
            })
        } catch (e) {

        }
    })
})

//tests for CompareUserID, tests for valid and invalid
describe('CompareUserID tests', () => {
    test('valid comparison', async () => {
        try {
            details = await CompareUserID("diego@gmail.com", "1234567890123")
            Promise.resolve(details).then((arr) => {
                expect(arr[0]).toBe('success')
            })
        } catch (e) {
        }
    })
})

//tests for changePassword, tests for valid
describe("changePassword tests",()=>{
    test("valid change", async () => {
        try {
            details = await changePassword("diego@gmail.com")
            Promise.resolve(details).then((arr) => {
                expect(arr[0]).toBe('success')
            })
        } catch (e) {
        }
    })
})

//test for updateUserDetails, test for valid
describe("updateUserDetails tests", () => {
    test("valid details", async () => {
        const validDetail = { // valid details
            first_name: "the",
            last_name: "tester",
            dob: "1998-02-12",
            phoneNumber: "0784039821",
            email: "tester@gmail.com",
            password: "nunYaBussiness",
            role: "0",
            id: "0000000000008"
        }
        try {
            details = await updateUserDetails(validDetail)
            Promise.resolve(details).then((arr) => {
                expect(arr[0]).toBe('success')
            })
        } catch (e) {
        }
    })
});

//test for getAllQuestions, test for valid
describe("getAllQuestions tests", () => {
    test("valid test", async () => {
        try {
            details = await getAllQuestions()
            Promise.resolve(details).then((arr) => {
                expect(arr[0]).toBe("success")
            })
        } catch (e) {
        }
    })
});

//test for askQuestion, test for valid
describe("askQuestion tests", () => {
    test("valid test", async () => {
        try {
            details = await askQuestion("is this a test","like fr fr")
            Promise.resolve(details).then((arr) => {
                expect(arr[0]).toBe("success")
            })
        } catch (e) {
        }
    })
});

//test for likeQuestion, test for valid
describe("likeQuestion tests", () => {
    test("valid test", async () => {
        try {
            details = await likeQuestion(1, "0lLGjuQmBvPVnrMnxQEx")
            Promise.resolve(details).then((arr) => {
                expect(arr[0]).toBe("success")
            })
        } catch (e) {
        }
    })
});

//test for getQuestionInfo, test for valid
describe("getQuestionInfo tests", () => {
    test("valid test", async () => {
        try {
            details = await getQuestionInfo("0lLGjuQmBvPVnrMnxQEx")
            Promise.resolve(details).then((arr) => {
                expect(arr[0]).toBe("success")
            })
        } catch (e) {
        }
    })
});

//test for giveResponse_or_Comment, test for valid
describe("giveResponse_or_Comment tests", () => {
    test("valid test", async () => {
        try {
            details = await giveResponse_or_Comment(0,"0lLGjuQmBvPVnrMnxQEx","no cap")
            Promise.resolve(details).then((arr) => {
                expect(arr[0]).toBe("success")
            })
        } catch (e) {
        }
    })
});

//test for getResponses, test for valid
describe("getResponses tests", () => {
    test("valid test", async () => {
        try {
            details = await getResponses("0lLGjuQmBvPVnrMnxQEx")
            Promise.resolve(details).then((arr) => {
                expect(arr[0]).toBe("success")
            })
        } catch (e) {
        }
    })
});

//test for getComments, test for valid
describe("getComments tests", () => {
    test("valid test", async () => {
        try {
            details = await getComments("uIve2uGNWaGx5tIDZhj")
            Promise.resolve(details).then((arr) => {
                expect(arr[0]).toBe("success")
            })
        } catch (e) {
        }
    })
});

//test for changeMark, test for valid
describe("changeMark tests", () => {
    test("valid test", async () => {
        try {
            details = await changeMark(1,"uIve2uGNWaGx5tIDZhj",{role: 1, isQuestioner: true})
            Promise.resolve(details).then((arr) => {
                expect(arr[0]).toBe("success")
            })
        } catch (e) {
        }
    })
});
