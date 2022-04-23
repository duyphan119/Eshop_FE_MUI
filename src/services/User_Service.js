const db = require("../models");

const update = async (params, body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { user_id } = params;

      await db.User.update(
        { ...body, updatedAt: new Date() },
        { where: { id: user_id } }
      );

      let existingUser = await db.User.findOne({
        where: {
          id: user_id,
        },
      });
      resolve({ status: 200, data: existingUser });
    } catch (error) {
      console.log(error);
      resolve({ status: 500, data: error });
    }
  });
};
module.exports = { update };
