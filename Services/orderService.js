var Order = require("../Model/order");
const bcrypt = require("bcryptjs");


const createOrder = async(order, cb) => {
    try {    
        Order.create(order, cb);
    } catch(e) {
      throw e
    }
}

const updateOrder = async(order, cb) => {
    try {
        Order.updateOne({userId:order.id},{name: order.icon ,address: order.address, payment: order.payment},cb);
    }catch(e){
        throw e
    }
}

const deleteOrder = async(order, cb) => {
    try{
        Order.deleteOne({userId: order.id},cb);
    }catch(e){
        throw e
    }
}

const getOrderById = async (order,cb) => {
    try {         
      Order.findOne({userId: order},cb);
    } catch(e) {
      throw e
    }
}

module.exports = {
    createOrder, updateOrder, deleteOrder, getOrderById
}