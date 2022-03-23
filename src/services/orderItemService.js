import db from "../models";
const create = async (body) => {
  try {
    const { sizeId, quantity, orderId } = body;
    const id = (new Date().getTime() * Math.random()) / Math.random();
    const savedOrderItem = await db.OrderItem.create({
      id,
      sizeId,
      quantity,
      orderId,
    });
    return savedOrderItem;
  } catch (error) {
    console.log(error);
    return null;
  }
};
module.exports = { create };
