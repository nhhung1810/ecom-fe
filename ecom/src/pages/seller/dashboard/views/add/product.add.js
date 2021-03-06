import React, { useState } from "react";

import "./add.css"
import { imageUploadAPI, uploadProductAPI } from "../../../../../api/upload.api";

import {
    AddSubmitButton,
    AddDescriptionInput,
    AddNameInput,
    AddPhotoGallery,
    GeneralInput,
    MultiSelectInput,
} from "./components";

import { BRAND_LIST, CATEGORIES_LIST, COLORS_LIST, SIZE_LIST } from "../../../../../const/options.list.const";
import { SingleSelectInput } from "./components/add.custom.select";
import { useHistory } from "react-router";

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

    const handleSubmit = async e => {
        // TODO: VALIDATE ALL ENTRY
        e.preventDefault();
        if(name.trim().length === 0) return
        if(ctg.length === 0) return
        if(brand.length === 0) return
        if(price === 0) return
        if(size.length === 0) return
        if(colors.length === 0) return
        if(quantity === 0) return
        // Phase upload data
        const productData = {
            "name": name,
            "categories": ctg,
            "brand": brand,
            "price": parseFloat(price),
            "size": size,
            "colors": colors,
            "quantity": parseInt(quantity),
            "description": des,
        }
        let prodRes = await uploadProductAPI(productData)
        if (!prodRes) return;

        let imageResponse = await imageUploadAPI(images, prodRes.id)
        history.push("/dashboard/product")
    }

    return (
        <div className="add__container">
            <p className="add__title">Products / Add Product</p>
            <form onSubmit={handleSubmit}>
                <AddPhotoGallery setImages={setImages} />
                <AddNameInput
                    handleChange={(e) => { setName(e.target.value) }} />
                <MultiSelectInput 
                    options={CATEGORIES_LIST}
                    onChange={setCtg}
                    placeholder="Select categories"> CATEGORIES 
                </MultiSelectInput>
                <SingleSelectInput
                    options={BRAND_LIST}
                    onChange={setBrand}
                    placeholder={"Select brand"}>
                    BRAND
                </SingleSelectInput>
                <GeneralInput
                    handleChange={(e) => { setPrice(e.target.value) }}
                    type="number" label={"PRICE ($)"} />
                <MultiSelectInput
                    options={SIZE_LIST}
                    onChange={setSize}
                    placeholder={"Select size"}>SIZES
                </MultiSelectInput>
                <MultiSelectInput
                    options={COLORS_LIST}
                    onChange={setColors}
                    placeholder={"Select colors"}>COLORS
                </MultiSelectInput>
                <GeneralInput
                    handleChange={(e) => { setQuantity(e.target.value) }}
                    type="number" label={"QUANTITY"} />
                <AddDescriptionInput handleChange={(e) => { setDes(e.target.value) }} />
                <AddSubmitButton />
            </form>
        </div>
    )
}