import commentService from "../services/commentService";
const commentController = {
  create: async (req, res) => {
    try {
      const savedComment = await commentService.createComment(req.body);
      res.status(200).json(savedComment);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};
module.exports = commentController;
