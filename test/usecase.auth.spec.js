const authUseCase = require('../usecase/authUseCase');
const bcrypt = require('bcrypt');
require('dotenv').config()

const mockAuthRepo = () => {
    const repo = {};
    repo.loginUser = jest.fn().mockReturnValue({
        id: 1,
        name: "test",
        email: "usertest@gmail.com",
        address: "user adress",
        password: bcrypt.hashSync("123456", 10 )
    });

    return repo;
}

const repo = mockAuthRepo()
const authUC = new authUseCase(repo)

describe('auth test suite', function() {
    test('login success', async () => {
        let res = await authUC.login('user1@mail.com', '1234');
            expect(res.is_success).toEqual(true);
            expect(res.data === null).toEqual(false);
    })

    test('login failed ', async () => {
        repo.loginUser = jest.fn().mockReturnValue(null);
        let res = await authUC.login('user1@mail.com', '1234');

            expect(res.is_success).toEqual(false);
            expect(res.reason).toEqual("invalid username or password!");
    })
})


 