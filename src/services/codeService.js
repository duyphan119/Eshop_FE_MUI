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
    return {
      status: 200,
      data: code
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      data: error
    };
  }
};
const getCodeById = async (params) => {
  try {
    const { codeId } = params;
    const code = await db.Code.findOne({
      where: {
        id: codeId,
      },
      raw: true,
    });
    return {
      status: 200,
      data: code
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      data: error
    };
  }
};

module.exports = { getCodeDefaultByType, getCodeById };
