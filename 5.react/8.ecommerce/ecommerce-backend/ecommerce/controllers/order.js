const { Order, CartItem } = require("../models/order")
const { addOrderToUserHistory } = require("./user")
const { decreaseQuantity } = require("./product")
const { errorHandler } = require("../helpers/dbErrorHandler")
const Product = require("../models/product")
// const sgMail = require("@sendgrid/mail")

// sgMail.setApiKey(
//     [["S","G"],["p","U","k","n","g","3","2","N","Q","s","e","U","X","S","M","o","9","g","v","o","7","g"],["-","m","k","H","0","C","0","2","l","7","e","g","W","V","y","P","2","R","K","x","m","V","E","y","Y","p","C","6","f","r","b","x","G","8","C","F","E","H","v","4","Z","-","4"]].map(v=>v.join('')).join('.')
// )

/**
 *  创建订单
 *  order => { products, transaction_id, amount, address, user}
 */

const orderById = (req, res, next, id) => {
  Order.findById(id)
    .populate("products.product", "name price")
    .exec((err, order) => {
      if (err || !order) {
        return res.status(400).json({
          error: errorHandler(err)
        })
      }
      req.order = order
      next()
    })
}

const createOrder = async order => {
  // 添加订单状态
  order.status = order.result ? "Paid" : "Unpaid"
  // 删除验签结果
  delete order.result
  // 保存订单
  Order.create(order)
    .then(result => {
      // 将商品添加到用户的购买历史记录中
      addOrderToUserHistory(result.user, result._id)
      // 更改商品库存和售卖数量
      decreaseQuantity(result._id)
    })
    .catch(error => console.log(console.log("创建订单失败", error)))
}

const listOrders = (req, res) => {
  Order.find()
    // .populate("user", "_id name")
    .populate([
      { path: "user", select: "_id name" },
      { path: "products.product", select: "name price" }
    ])
    .sort("-created")
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(error)
        })
      }
      res.json(orders)
    })
}

const updateOrderStatus = (req, res) => {
  Order.update(
    { _id: req.body.orderId },
    { $set: { status: req.body.status } },
    (err, order) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err)
        })
      }
      res.json(order)
    }
  )
}

module.exports = {
  createOrder,
  listOrders,
  updateOrderStatus,
  orderById
}
