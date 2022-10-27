module.exports = {
    list: async (req, res) =>{
        let filters = req.query
        let products = await req.productUC.getAllProducts(filters);
        if (products == null) {
            products = []
            return res.status(404).json({
                code: "404",
                status: "NOT_FOUND",
                message : "Product tidak Ditemukan",
            });
        }
        res.status(200).json({
            code: "200",
            status: "OK",
            message : "Success",
            data: products
        });
    },
    getById: async (req, res) =>{
        let id = req.params.id;
        let product = await req.productUC.getProductById(id);
        if (product == null) {
            product = []
            return res.status(404).json({
                code: "404",
                status: "NOT_FOUND",
                message : "Product tidak Ditemukan",
            });
    }
      res.json(product);
    },
    create: async (req, res) => {
        let product = req.body;

        let res_data = {
            status: 'failed',
            message: "",
            data: null
        }
        let category = await req.categoryUC.getCategoryByID(product.categoryId);

        if(!category){
            res_data.message = 'category not found'
            return res.status(400).json(res_data)
        }

        let create_res = await req.productUC.createProduct(product);
        
        if(create_res.is_success !== true) {
            res_data.message = 'something went wrong'
            return res.status(400).json(res_data)
        }
        res.status(200).json({
            status : "ok",
            message : "Berhasil menanbahkan product",
            data : create_res.product
        })
    },
    update: async (req, res) => {
        let id = req.params.id;
        let product = req.body

        let res_data = {
            status: 'failed',
            message: '',
            data: null
        }

        let productCheck = await req.productUC.getProductById(id)

        if (!productCheck) {
            res_data.message = 'Product not found'
            return res.status(404).json(res_data)
        }

        let category = await req.categoryUC.getCategoryByID(product.categoryId);

        if(!category){
        res_data.message = 'category not found'
        return res.status(400).json(res_data)
        }

        let update_res = await req.productUC.updateProduct(product, id)
        if(update_res.is_success !== true) {
            res_data.message = 'something went wrong'
            return res.status(400).json(res_data)
        }

        res.status(200).json({
            status : "ok",
            message : "Success Update product",
            data : product
        })
        
    },
    delete: async (req, res) => {
        let id = req.params.id

        let res_data = {
            status: 'failed',
            message: '',
            data: null
        }
        let productCheck = await req.productUC.getProductById(id)

        if (!productCheck) {
            res_data.message = 'Product not found'
            return res.status(404).json(res_data)
        }

        let delete_res = req.productUC.deleteProduct(id)

        res_data.status = 'ok'
        res_data.message = 'success'
        res_data.data = delete_res.category
        
        res.json(res_data)
    }
}