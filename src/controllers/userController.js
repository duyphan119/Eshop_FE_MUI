import db from "../models";
import bcrypt from "bcryptjs";

const userController = {
  create: async (req, res) => {
    try {
      const {
        email,
        password,
        firstName,
        lastName,
        avatar,
        gender,
        birthday,
        phoneNumber,
        isAdmin,
      } = req.body;
      // Check email
      const checkedUser = await db.User.findOne({ where: { email: email } });
      if (checkedUser) {
        return res.status(500).json("Email was available");
      }
      // Hash password
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      const id = (
        (new Date().getTime() * Math.random()) /
        Math.random()
      ).toString();
      await db.User.create({
        id,
        email,
        hash,
        firstName,
        lastName,
        avatar: avatar === "" ? null : avatar,
        gender: gender === "" ? null : gender,
        birthday: birthday === "" ? null : birthday,
        phoneNumber: phoneNumber === "" ? null : phoneNumber,
        isAdmin: isAdmin ? isAdmin : false,
      });
      res.status(200).json("New user is created");
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  getAll: async (req, res) => {
    try {
      const users = await db.User.findAll();
      res.status(200).json(users);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  getById: async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await db.User.findByPk(userId);
      res.status(200).json(user);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  update: async (req, res) => {
    try {
      console.log(req.body)
      const {
        email,
        password,
        firstName,
        lastName,
        avatar,
        gender,
        birthday,
        phoneNumber,
        isAdmin,
      } = req.body;
      const { userId } = req.params;

      await db.User.update(
        {
          email,
          password,
          firstName,
          lastName,
          avatar,
          gender,
          birthday,
          phoneNumber,
          isAdmin,
        },
        {
          where: {
            id: userId,
          },
        }
      );
      res.status(200).json("This user is updated");
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  delete: async (req, res) => {
    try {
      const { userId } = req.params;
      await db.User.destroy({
        where: { id: userId },
      });
      res.status(200).json("This user is deleted");
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};
module.exports = userController;
