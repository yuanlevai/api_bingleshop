class Category {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository
    }

    async getCategoryByID(id) {
        return await this.categoryRepository.getCategoryByID(id)
    }
    async getCategories(filters) {
        return await this.categoryRepository.getCategories(filters)
    }
    async createCategory(category) {
        return await this.categoryRepository.createCategory(category)
    }
    async updateCategory(category, id) {
        return await this.categoryRepository.updateCategory(category, id)
    }
    async deleteCategory(id) {
        return await this.categoryRepository.deleteCategory(id)
    }
}

module.exports = Category;