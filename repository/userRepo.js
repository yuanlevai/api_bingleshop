const {User} = require ('../models');
const bcrypt = require('bcrypt');

class UserRepository{
    constructor() {
        this.UserModel =  User;
    }

        registerUser = async (user_data) => {
            user_data.password = bcrypt.hashSync(user_data.password, 10);
            user_data.is_admin = false;
            let user = null;
            try {
                user = await this.UserModel.create(user_data)
            } catch (error) {
                console.log(error)
                return null;
            }

            return user;
        }

        loginUser = async (email,password) => {
            let user = null
            try {
                user = await this.getUserByEmail(email)
                if(user === null) {
                    return user
                }
            } catch (e) {
                console.error(e)
                return null
            }
    
            if(!bcrypt.compareSync(password, user.password)) {
                return null
            }
    
            return user
        }

        async getUserByEmail(email) {
            let user = null
            try {
                user  = await User.findOne({
                    where: {
                        email: email
                    }
                })
            } catch (e) {
                console.error(e)
                return null
            }
            return user
        }
    }

module.exports = UserRepository
