class User {
    constructor(userRepository) {
        this.userRepository = userRepository
    }

    async getAllUser(filters) {
        return await this.userRepository.getAllUser(filters)
    }

    async getUserById(id) {
        return await this.userRepository.getUserById(id)
    }


}

module.exports = User