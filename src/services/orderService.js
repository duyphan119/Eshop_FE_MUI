import { QueryTypes } from "@sequelize/core";
import db, { sequelize } from "../models";
import codeService from "./codeService";
import orderItemService from "./orderItemService";
import cartService from "./cartService";
import sizeService from "./sizeService";
const create = async (body) => {
  try {
    const {
      userId,
      cart,
      city,
      ward,
      district,
      addressNo,
      street,
      deliveryPrice,
      paymentMethod,
    } = body;
    const id = new Date().getTime();
    const defaultCode = await codeService.getCodeDefaultByType({
      codeType: "ORDER_STATUS",
    });
    let totalPrice = 0;
    for (let i = 0; i < cart.length; i++) {
      totalPrice += cart[i].product.newPrice * cart[i].quantity;
    }
    const savedOrder = await db.Order.create({
      id,
      userId,
      cart,
      city,
      ward,
      district,
      addressNo,
      street,
      paymentMethod,
      deliveryPrice,
      status: defaultCode.data.id,
      totalPrice,
    });
    for (let i = 0; i < cart.length; i++) {
      await orderItemService.create({
        orderId: savedOrder.id,
        userId,
        quantity: cart[i].quantity,
        sizeId: cart[i].size.id,
      });
      await cartService.deleteById({ cartItemId: cart[i].id });
      let newAmount = cart[i].size.amount - cart[i].quantity;
      if (newAmount >= 0) {
        await sizeService.updateById(
          { sizeId: cart[i].size.id },
          {
            ...cart[i].size,
            amount: newAmount,
          }
        );
      }
    }
    return {
      status: 200,
      data: "Success. This order is pending",
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      data: error,
    };
  }
};

const getByUser = async (params) => {
  try {
    const { userId } = params;
    const orders = await db.Order.findAll({
      where: { userId: userId },
      raw: true,
    });
    for(let i=0;i<orders.length;i++){
      const code = await codeService.getCodeById({codeId: orders[i].status});
      orders[i].code = code.data
    }
    return { status: 200, data: orders };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      data: error,
    };
  }
};
const deleteById = async (user, params) => {
  try {
    if (user) {
      const { orderId } = params;
      let queryString = `select o.* from orders o, codes c 
    where o.status = c.id and o.userId = '${user.id}' and o.id = '${orderId}' and c.isDefault = 1`;
      const orders = await sequelize.query(queryString, {
        type: QueryTypes.SELECT,
        raw: true,
      });
      if (orders && orders.length > 0) {
        const orderItems = await db.OrderItem.findAll({
          where: {
            orderId: orders[0].id,
          },
          raw: true,
        });

        for (let i = 0; i < orderItems.length; i++) {
          await sequelize.query(
            `
            update sizes set amount = amount + ${orderItems[i].quantity} 
            where id = '${orderItems[i].sizeId}'
          `,
            {
              type: QueryTypes.UPDATE,
            }
          );
          await db.OrderItem.destroy({
            where: {
              orderId: orders[0].id,
            },
          });
        }
        await db.Order.destroy({
          where: {
            id: orders[0].id,
          },
        });

        return { status: 200, data: "This order is deleted" };
      }
    }
    return { status: 200, data: "This order isn't deleted" };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      data: error,
    };
  }
};
module.exports = { create, getByUser, deleteById };
