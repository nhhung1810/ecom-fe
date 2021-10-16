import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
    AddSubmitButton,
    AddDescriptionInput,
    AddNameInput,
    AddPhotoGallery,
    GeneralInput
} from "./components";
import "./add.css"

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

    const history = useHistory()

    const handleSubmit = e =>{
        e.preventDefault()
        console.log(images)
        console.log(name)
        console.log(ctg)
        console.log(brand)
        console.log(price)
        console.log(size)
        console.log(colors)
        console.log(quantity)
        console.log(des)
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
