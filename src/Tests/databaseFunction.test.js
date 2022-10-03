
import {
    register, logIn, logOut, getUserDetails, CompareUserID,
    changePassword, updateUserDetails, getAllQuestions, askQuestion, likeQuestion,
    getComments, getResponses, getQuestionInfo, giveResponse_or_Comment, likeResponse,
    changeMark, changePostReportValue, createReport, getAllReports, displayReport,
    changeReportStatus, banUser, getAllBans, getBan
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
const questionID = "mAfYZHkSEOyQNe75U3VH";
const responseID = "xRuGOufyhu6VohNt1Qw7";
const reportQuestionID = "ny9HbIhzZUgVZOsRkHgT";
const reportResponseID = "ZHe1NGrqwsWRTEPuL1iI";


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
    test("invalid details", () => {
        return getUserDetails().then(output => {
            expect(output[0]).toBe("failed");
        })
    })
})

//tests for logIn, test for valid and invalid
describe("logIn test", () => {
    test("invalid login", () => {
        return logIn("asdf", "1234").then(output => {
            expect(output[0]).toBe("failed");
        })
    })
    test("valid login", () => {
        return logIn(testDetails.email, testDetails.password).then(output => {
            expect(output[0]).toBe("success");
        })
    })
})

//tests for CompareUserID, test for valid and invalid
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

//test for banUser, test for valid
describe("banUser test", () => {
    test("valid details", () => {
        return banUser("testing",testDetails.email,"2cool4skool").then(output => {
            expect(output).toBe("success");
        })
    })
})

//test for updateUserDetails, test for valid
describe("updateUserDetails test", () => {
    const tempDetails = {
        first_name: "ya",
        last_name: "boi",
        phoneNumber: "4594625966",
        role: 0
    }
    test.skip("valid details", () => {
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
    test("valid details", () => {
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

//tests for getAllQuestions, test for valid and invalid
describe("getAllQuestions test", () => {
    test("valid details", () => {
        return getAllQuestions(testDetails).then(output => {
            expect(output[0]).toBe("success");
        })
    })
    test("invalid details", () => {
        return getAllQuestions({ role: -1 }).then(output => {
            expect(output[0]).toBe("success");
        })
    })
})

//test for askQuestion, test for valid
describe("askQuestion test", () => {
    test("valid details", () => {
        return askQuestion("test", "test", null).then(output => {
            expect(output).toBe("success");
        })
    })
})

//tests for likeQuestion, tests for valid
describe("likeQuestion test", () => {
    test("valid like", () => {
        return likeQuestion(1, questionID).then(output => {
            expect(output[0]).toBe("success");
        })
    })
    test("valid unlike", () => {
        return likeQuestion(0, questionID).then(output => {
            expect(output[0]).toBe("success");
        })
    })
})

//test for getComments, test for valid and invalid
describe("getComments test", () => {
    test("invalid details", () => {
        return getComments(questionID).then(output => {
            expect(output[0]).toBe("failed");
        })
    })
    test("valid details", () => {
        return getComments(responseID).then(output => {
            expect(output[0]).toBe("success");
        })
    })
})

//test for getResponses, test for valid
describe("getResponses test", () => {
    test("valid details", () => {
        return getResponses(questionID, "response_likes", "asc", null, 100).then(output => {
            expect(output[0]).toBe("success");
        })
    })
})

//test for getQuestionInfo, test for valid
describe("getQuestionInfo test", () => {
    test("valid details", () => {
        return getQuestionInfo(questionID).then(output => {
            expect(output[0]).toBe("success");
        })
    })
})

//tests for giveResponse_or_Comment, tests for valid
describe("giveResponse_or_Comment test", () => {
    test("valid details response", () => {
        return giveResponse_or_Comment(0, questionID, "please work").then(output => {
            expect(output).toBe("success");
        })
    })
    test("valid details comment", () => {
        return giveResponse_or_Comment(1, responseID, "please work").then(output => {
            expect(output).toBe("success");
        })
    })
})

//tests for likeResponse, tests for valid
describe("likeResponse test", () => {
    test("valid like", () => {
        return likeResponse(1, responseID).then(output => {
            expect(output[0]).toBe("success");
        })
    })
    test("valid unlike", () => {
        return likeResponse(0, responseID).then(output => {
            expect(output[0]).toBe("success");
        })
    })
})

//tests for changeMark, tests for valid and invalid
describe("changeMark test", () => {
    test("valid details admin", () => {
        return changeMark(1, responseID, { role: 1, isQuestioner: false }).then(output => {
            expect(output).toBe("success");
        })
    })
    test("valid details questioner", () => {
        return changeMark(1, responseID, { role: 0, isQuestioner: true }).then(output => {
            expect(output).toBe("success");
        })
    })
    test("invalid details", () => {
        return changeMark(1, responseID, { role: 0, isQuestioner: false }).then(output => {
            expect(output).toBe("failed");
        })
    })
})

//tests for changePostReportValue, tests for valid **
describe("changePostReportValue test", () => {
    test.skip("valid details question ban", () => {
        return changePostReportValue(0, "YWapWst9kPJKIGv8ZbC0", 1, { role: 1 }).then(output => {
            expect(output).toBe("failed");
        })
    })
    test.skip("valid details response ban", () => {
        return changePostReportValue(1, "HxBXcHLeXqX38pdIoAth", 1, { role: 1 }, "tT8vzYqbEoZCFQtDTVU").then(output => {
            expect(output).toBe("success");
        })
    })
    test.skip("valid details comment ban", () => {
        return changePostReportValue(2, "hMqbNDA2y9ggO4Cvpayg", 1, { role: 1 }).then(output => {
            expect(output).toBe("failed");
        })
    })
    test("invalid details", () => {
        return changePostReportValue(0, "YWapWst9kPJKIGv8ZbC0", 1, { role: 0 }).then(output => {
            expect(output).toBe("failed");
        })
    })
    test.skip("valid details question unban", () => {
        return changePostReportValue(0, "YWapWst9kPJKIGv8ZbC0", 0, { role: 1 }).then(output => {
            expect(output).toBe("failed");
        })
    })
    test.skip("valid details response unban", () => {
        return changePostReportValue(1, "HxBXcHLeXqX38pdIoAth", 0, { role: 1 }, "tT8vzYqbEoZCFQtDTVU").then(output => {
            expect(output).toBe("success");
        })
    })
    test.skip("valid details comment unban", () => {
        return changePostReportValue(2, "hMqbNDA2y9ggO4Cvpayg", 0, { role: 1 }).then(output => {
            expect(output).toBe("failed");
        })
    })
})

//tests for createReport, tests for valid
describe("createReport test", () => {
    test("valid details question", () => {
        return createReport(questionID,null).then(output => {
            expect(output).toBe("success");
        })
    })
    test("valid details response", () => {
        return createReport(null, responseID).then(output => {
            expect(output).toBe("success");
        })
    })
})

//test for getAllReports, test for valid
describe("getAllReports test", () => {
    test("valid details", () => {
        return getAllReports().then(output => {
            expect(output[0]).toBe("success");
        })
    })
})

//test for displayReport, test for valid
describe("displayReport test", () => {
    test("valid details", () => {
        return displayReport({question_id:questionID,response_id:responseID}).then(output => {
            expect(output[0]).toBe("success");
        })
    })
})

//test for getAllBans, test for valid
describe("getAllBans test", () => {
    test("valid details", () => {
        return getAllBans().then(output => {
            expect(output[0]).toBe("success");
        })
    })
})

//test for getBan, test for valid
describe("getBan test", () => {
    test("valid details", () => {
        return getBan("5aatpW5UjFMVgZ8H9otx").then(output => {
            expect(output[0]).toBe("success");
        })
    })
})