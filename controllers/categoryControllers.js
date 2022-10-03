module.exports = {
    list: async (req, res) =>{
        let filters = req.query
        let categories = await req.categoryUC.getCategories(filters);
        if (categories == null) {
            categories = []
        }
        res.json(categories);
    },
    getById: async (req, res) =>{
        let id = req.params.id;
        let category = await req.categoryUC.getCategoryByID(id);
        if (category == null) {
            return res.status(400).json(null)
        }
        res.json(category);
    },
    create: async (req, res) => {
        let res_data = {
            status: 'failed',
            message: "",
            data: null
        }

        let category = {
            name: req.body.name,
        }

        category = await req.categoryUC.createCategory(category);
        if (category == null) {
            return res.status(400).json(res_data);
        }

        res_data.status = 'success';
        res_data.message = 'category created';
        res_data.data = category;
        res.json(res_data);
    },
    update: async (req, res) => {
        let id = req.params.id;
        let category = req.body

        let res_data = {
            status: 'failed',
            message: '',
            data: null
        }

        if (id !== category.id) {
            res.status(400).send("Category not found");
            return;
        }

        let categoryUpdate = await req.categoryUC.updateCategory(category, id)

        if(categoryUpdate.is_success !== true) {
            res_data.message = 'something went wrong'
            return res.status(400).json(res_data)
        }

        res.status(200).json({
            status : "ok",
            message : "Berhasil mengUpdate category",
            data : category
        })
        
    },
    delete: async (req, res) => {
        let id = req.params.id

        let res_data = {
            status: 'failed',
            message: '',
            data: null
        }
        
        let delete_res = req.categoryUC.deleteCategory(id)

        res_data.status = 'ok'
        res_data.message = 'success'
        res_data.data = delete_res.category
        
        res.json(res_data)
    }
}