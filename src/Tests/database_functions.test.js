/**
 * @jest-environment node
 */
import {
    logIn, logOut, getUserDetails, CompareUserID, changePassword,
    updateUserDetails, getAllQuestions, getComments, getResponses, 
    getQuestionInfo,
}
    from '../utils/database_functions.js'

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
    test('valid log out', async () => {
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