const {Thought, User, Reaction} = require('../models');
const {Types} = require('mongoose');

const thoughtController = {
    // Get all thoughts
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find({});
            res.status(200).json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Get a single thought by id
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({_id: req.params.id});
            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Create a new thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                {username: req.body.username},
                {$addToSet: {thoughts: thought._id}},
                {new: true}
            );

            if (!user) {
                res.status(404).json({message: "No user found with this username!"});
                return;
            }
            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Update a thought by id
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate({_id: req.params.id}, req.body, {
                new: true,
            });
            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Delete a thought by id
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndRemove({_id: req.params.id});
            if (!thought) {
                res.status(404).json({message: "No thought found with this id!"});
            }
            const user = await User.findOneAndUpdate(
                {thoughts: req.params.id},
                {$pull: {thoughts: req.params.id}},
            );

            if(!user) {
                res.status(404).json({message: "No user found with this username!"});
                return;
            }
            res.status(200).json({message: "Thought deleted"});
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Create reaction
    async createReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.id},
                {$addToSet: {reactions: req.body}},
                {runValidators: true, new: true});
            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Delete reaction
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.id},
                {$pull: {reactions: req.params.reactionId}},
                {runValidators: true, new: true});
            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    }
};

module.exports = thoughtController;