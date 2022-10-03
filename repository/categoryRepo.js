const {Category} = require("../models")

class CategoryRepository {
    constructor() {
        this.CategoryModel = Category
    }
    
    async getCategories(filters) {
        if (filters != null) {
            return await this.CategoryModel.findAll({
                where: filters
            })
        }
        return await this.CategoryModel.findAll()
    }

    async getCategoryByID(id) {
        let data = null
        try {
            data = await this.CategoryModel.findOne({
                where: {
                    id: id
                }
            })
        } catch (err) {
            console.log(err)
            return null
        }
        return data
    }


    async createCategory(categoryData) {
        let category = null
        let is_success = false
        try {
            category = await this.CategoryModel.create(categoryData);
            is_success = true;
        } catch (e) {
            console.error(e)
            return null
        }
        return category
    }

    async updateCategory(category, id) {
        let is_success = false;
        try {
            category = await this.CategoryModel.update(category, {
                where: { id: id },
                });
            is_success = true;
        } catch (error) {
            console.log(error);
            return null;
        }
        return {
            category: category,
            is_success: is_success
        };
    } 
    
    async deleteCategory (id) {
        try {
            await this.CategoryModel.destroy({
                where: {
                    id: id
                }
            })
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = CategoryRepository