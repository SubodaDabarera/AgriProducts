const Cart = require('../models/cartModel');
const Item = require('../models/itemModel')

const add_to_cart = async (req,res)=>{
    const userId = req.params.id;
    const { id , quantity} = req.body;

    console.log("dddddd",userId)
    console.log("ggggg",req.params)
    console.log(id)
    console.log(quantity)

    try{
        let cart = await Cart.findOne({userId});
        console.log(cart);
        let item = await Item.findById({_id:id});
        console.log("show items",item)
        console.log(req.body.items)

        const price = item.price;
        const title = item.title;
        console.log(price);
        console.log(title)
        // const quantity = req.body.items.quantity;

        if(cart){
            // if cart exists for the user
            let itemIndex = cart.items.findIndex(p => p.id == id);
            console.log(itemIndex);
            // Check if product exists or not
            if(itemIndex > -1)
            {
                let productItem = cart.items[itemIndex];
                productItem.quantity += quantity;
                cart.items[itemIndex] = productItem;
            }
            else {
                cart.items.push({ id, title, quantity, price });
            }
            cart.bill += quantity*price;
            cart = await cart.save();
            return res.status(201).send(cart);
        }
        else{
            // no cart exists, create one
            const newCart = await Cart.create({
                userId,
                items: [{ id, title, quantity, price }],
                bill: quantity*price
            });
            console.log("from newCart",newCart);
            return res.status(201).send(newCart);
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Something wrong");
    }
}

const get_cart_items = async (req,res)=>{
    const userId = req.params.id;
    console.log(req.params)
    try{
        let cart = await Cart.findOne({userId});
        console.log(cart);
        if(cart){
            res.send(cart);
        }
        else{
            res.send(null);
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send("Something wrong");
    }
}

module.exports = {
    add_to_cart,
    get_cart_items

}
