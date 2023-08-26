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
  async updateUser(req, res) {
    try {
      console.log("updating user")
      const user = await User.findOneAndUpdate({ _id: req.params.id}, req.body, {
        new: true,
      });
      if (!user) {
        res.status(404).json({ message: "No user found with this id!" });
        return;}
      console.log(user)
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // delete a user by id
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete(req.params.id);
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // add a friend to a user
  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // delete a friend from a user
  async deleteFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }

};

module.exports = userController;