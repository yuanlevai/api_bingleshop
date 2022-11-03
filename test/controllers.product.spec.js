const productController = require('../controllers/productController');

// buat mock usecase
let mockProductUC = {
    getAllProducts: jest.fn().mockReturnValue(null)
};

// membuat mock request
const mockRequest = (body = {}, params ={}, query = {}, use_cases = {}) => {
    return {
        body: body,
        query: query,
        params: params,
        ...use_cases
    }

}

// buat mock respon
const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    return res;
}

describe('Test Item Controller', function () {
    test('get empty product', async () => {
        let req = mockRequest({},{},{},{
            productUC: mockProductUC 
        });
        let res = mockResponse()
        await productController.list(req, res);
        
        expect(mockProductUC.getAllProducts).toBeCalledWith(null);
        // expect(res.json).toBeCalledWith([])

    })
});