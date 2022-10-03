class Product {
    constructor(productRepository) {
        this.productRepository = productRepository
    }

    async getProductById(id) {
        return await this.productRepository.getProductById(id)
    }
    async getAllProducts(filters) {
        return await this.productRepository.getAllProducts(filters)
    }
    async createProduct(productData) {
        return await this.productRepository.createProduct(productData)
    }
    async updateProduct(product, id) {
        return await this.productRepository.updateProduct(product, id)
    }
    async deleteProduct(id) {
        return await this.productRepository.deleteProduct(id)
    }
}

module.exports = Product;