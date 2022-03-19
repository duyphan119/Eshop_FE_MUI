import db from "../models";
import bcrypt from "bcryptjs";
const create = async (body) => {
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
    } = body;
    // Check email
    const checkedUser = await db.User.findOne({
      where: { email: email },
      raw: true,
    });
    if (checkedUser) {
      return { status: 500, data: "Email was available" };
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
    return { status: 200, data: "New user is created" };
  } catch (error) {
    console.log(error);
    return { status: 500, data: error };
  }
};
const getAll = async () => {
  try {
    const users = await db.User.findAll({ raw: true });
    return { status: 200, data: users };
  } catch (error) {
    console.log(error);
    return { status: 500, data: error };
  }
};

const getById = async (params) => {
  try {
    const { userId } = params;
    const user = await db.User.findByPk(userId);
    return { status: 200, data: user };
  } catch (error) {
    console.log(error);
    return { status: 500, data: error };
  }
};
const updateById = async (params, body) => {
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
    } = body;
    const { userId } = params;

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
    return { status: 200, data: "This user is updated" };
  } catch (error) {
    console.log(error);
    return { status: 500, data: error };
  }
};

const deleteById = async (params) => {
  try {
    const { userId } = params;
    await db.User.destroy({
      where: { id: userId },
    });
    return { status: 200, data: "This user is deleted" };
  } catch (error) {
    console.log(error);
    return { status: 500, data: error };
  }
};
module.exports = {
  create,
  getAll,
  updateById,
  deleteById,
  getById,
};
