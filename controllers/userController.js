module.exports = {
    list: async (req, res) =>{
        let filters = req.query
        let user = await req.userUC.getAllUser(filters);
        if (user == null) {
            user = []
        }
        res.json(user);
    },
    getById: async (req, res) =>{
      let id = req.params.id;
      let user = await req.userUC.getUserById(id);
      if (user == null) {
          return res.status(400).json(null)
      }
      res.json(user);
    },
}