const express = require('express')
const item = require('../models/itemModel')

module.exports.get_items = (req,res) => {
    item.find()
        .then((items)=>{
            res.json({success:true,existingPost:items});
        })
        .catch((err) =>{
            console.log(err);
        })
}

module.exports.post_item = (req,res) => {
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;

    const newItem = new item( {
        title,
        description,
        price
    })

    console.log(newItem)

    newItem.save()
        .then(()=>{
            res.json('Item Added')
        })
        .catch((err)=>{
            console.log(err)
        })
}

module.exports.update_item = (req,res) => {
    let itemID = req.params.id;
    const {title, description, price} = req.body;

    const updatePost = {
        title,
        description,
        price
    };

    const update = item.findByIdAndUpdate(itemID,updatePost)
        .then(()=>{
            res.status(200).send({
                status:'post updated'
            });
        }).catch((err)=>{
            console.log(err);
            res.status(200).send({status:'error with updating data', error:err.message});
        })
}

module.exports.delete_item = (req,res) => {
    let itemID = req.params.id;
    item.findByIdAndDelete(itemID)
        .then(() => {
            res.status(200).send({ status: 'item deleted' });
        })
        .catch((err) => {
            console.log(err.message);
            res
                .status(500)
                .send({ status: 'Error with delete user', error: err.message });
        });
}