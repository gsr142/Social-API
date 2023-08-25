const { User } = require("../models");

const userController = {
  // get all users
  async getAllUsers(req, res) {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // get a single user by id
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id })
      res.status(200).json(user);

      } catch (err) {
        res.status(500).json(err);
      }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // update a user by id
  // async updateUser(req, res) {
  //   try {
  //     const user = await User.findOneAndUpdate(req.params.id, req.body, {
  //       new: true,
  //     });
  //     res.status(200).json(user);
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // },

};
