const express = require('express')
const router = express.Router()
const product = require('../controllers/product')

router.get("/", (req, res) => {
    const products = product.get()
    if (!products) {
        return res.status(404).json({
            error: "no hay productos cargados"
        })
    }

    res.json(products);
})

router.post("/", (req, res) => {
    const data = req.body
    if (product.add(data)) {
        if(data.form === '1') return res.redirect("http://localhost:8080/web")
        res.status(201).json(data)
    }
    res.status(400).send()
})

router.put("/:id", (req, res) => {
    const data = req.body
    const { id } = req.params
    if (product.update(id, data)) {
        res.status(201).json(data)
    }
    res.status(400).send()
})

router.get("/:id", (req, res) => {
    const { id } = req.params
    const currentProduct = product.getById(id)
    if (currentProduct) {
        return res.json(currentProduct)
    }
    res.status(404).json({ error: "producto no encontrado" })
})

router.delete("/:id", (req, res) => {
    const { id } = req.params
    product.remove(id)
    res.send()
})

module.exports = router