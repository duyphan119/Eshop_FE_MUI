import db from "../models";
const getCodeDefaultByType = async (params) => {
  try {
    const { codeType } = params;
    const code = await db.Code.findOne({
      where: {
        type: codeType,
        isDefault: 1,
      },
      raw: true,
    });
    return code;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = { getCodeDefaultByType };
