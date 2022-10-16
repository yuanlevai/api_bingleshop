const {Product, Category } = require('../models');

class ProductRepository{
    constructor() {
        this.ProductModel =  Product;
        this.CategoryModel = Category;
    }

    getAllProducts = async (filters) => {
        if (filters != null) {
            return await this.ProductModel.findAll({
                where: filters,
                include: [
                    {
                      model: this.CategoryModel
                    },
                  ],
            })
        }
        return await this.ProductModel.findAll()
    }
    getProductById = async(id) => {
        let data = null
        try {
            data = await this.ProductModel.findOne({
                where: {
                    id: id
                },
                include: [
                    {
                      model: this.CategoryModel
                    }
                ],
            })
        } catch (err) {
            console.log(err)
            return null
        }
        return data
    }
    createProduct = async (productData) => {
        let product = null
        let is_success = false;
        try {
            product = await this.ProductModel.create(productData);
            is_success = true;
        } catch (err) {
            console.log(err)
            return null
        }
        return {
            is_success: is_success,
            product : product,
        }
    }
    updateProduct = async (product, id) => {
        let is_success = false
        try {
            product = await this.ProductModel.update(product, {
                where: {
                    id: id
                }
            })
            is_success = true;
        } catch (error) {
            console.log(error);
            return null
        }
        return {
            is_success: is_success,
            product: product,
        };
    }
    deleteProduct = async (id) => {
        try {
            await this.ProductModel.destroy({
                where: {
                    id: id
                }
            })
        } catch (err) {
            console.log(err);
        }
    }

}

module.exports = ProductRepository