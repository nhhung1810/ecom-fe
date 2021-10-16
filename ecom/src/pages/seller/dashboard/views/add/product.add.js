import React, { useState } from "react";
import {
    AddSubmitButton,
    AddDescriptionInput,
    AddNameInput,
    AddPhotoGallery,
    GeneralInput
} from "./components";
import "./add.css"
import { imageUploadAPI, productAPI } from "../../../../../api/upload.api";

export const AddPage = props => {
    const [images, setImages] = useState([])
    const [name, setName] = useState('')
    const [ctg, setCtg] = useState('') // concatenate of value
    const [brand, setBrand] = useState('')
    const [price, setPrice] = useState(0)
    const [size, setSize] = useState('') // concatenate of value
    const [colors, setColors] = useState('') //concatenate of value
    const [quantity, setQuantity] = useState(0)
    const [des, setDes] = useState('')

    const handleSubmit = async e => {
        // TODO: VALID ALL ENTRY
        e.preventDefault();

        // Phase upload data
        const productData = {
            "name": name,
            "ctg": ctg,
            "brand": brand,
            "price": price,
            "size": size,
            "colors": colors,
            "quantity": quantity,
            "des": des,
        }

        // Should get the ID of the product
        // const productID = await productAPI(productData)
        let imgPromise = images.map(data => new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onloadend = () => resolve(reader.result)
            reader.onerror = reject
            reader.readAsDataURL(data)
        }))
        try {
            let values = await Promise.all(imgPromise)
            console.log(values)
            let imageData = values.map(data => {
                return {
                    "data": data,
                    "productId": 1
                }
            })
            // let response = await imageUploadAPI(imageData)
            // console.log(response)
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div className="add__container">
            <p className="add__title">Products / Add Product</p>
            <form onSubmit={handleSubmit}>
                <AddPhotoGallery setImages={setImages} />
                <AddNameInput
                    handleChange={(e) => { setName(e.target.value) }} />
                <GeneralInput
                    handleChange={(e) => { setCtg(e.target.value) }}
                    type="text" label={"CATEGORIES"} />
                <GeneralInput
                    handleChange={(e) => { setBrand(e.target.value) }}
                    type="text" label={"BRAND"} />
                <GeneralInput
                    handleChange={(e) => { setPrice(e.target.value) }}
                    type="number" label={"PRICE ($)"} />
                <GeneralInput
                    handleChange={(e) => { setSize(e.target.value) }}
                    type="text" label={"SIZE"} />
                <GeneralInput
                    handleChange={(e) => { setColors(e.target.value) }}
                    type="text" label={"COLORS"} />
                <GeneralInput
                    handleChange={(e) => { setQuantity(e.target.value) }}
                    type="number" label={"QUANTITY"} />
                <AddDescriptionInput handleChange={(e) => { setDes(e.target.value) }} />
                <AddSubmitButton />
            </form>
        </div>
    )
}
