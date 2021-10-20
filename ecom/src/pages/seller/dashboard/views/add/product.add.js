import React, { useState } from "react";
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable'

import "./add.css"
import { imageUploadAPI, uploadProductAPI } from "../../../../../api/upload.api";


import {
    AddSubmitButton,
    AddDescriptionInput,
    AddNameInput,
    AddPhotoGallery,
    GeneralInput
} from "./components";

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
        // TODO: VALIDATE ALL ENTRY
        e.preventDefault();

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
        console.log(prodRes);
        if (!prodRes)
            return;

        console.log(images);
        let imageResponse = await imageUploadAPI(images, prodRes.id)
        console.log(imageResponse);

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
                <MultiSelectInput />
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

const styleMultiSelect = {
    control: (styles) => ({ 
        ...styles, 
        backgroundColor: 'white',
        width : 785,
        height : 48,
        borderRadius: 2, 
        borderColor : "#ededed",
        marginLeft: "auto",
        marginRight: 0,
    }),
    option: (styles, { isDisabled, isFocused, isSelected }) => ({
        ...styles,
        color : isFocused ? "#ffa15f" : "#3d3d3f",
        backgroundColor : "white"
    }),
    menu : (styles, state) => ({
        ...styles,
        position: "absolute",
        right : 0,
        width : 785,
        height : 48,
    }),
    indicatorSeparator : (styles, state) => ({
        ...styles,
        backgroundColor : "white",
    })
}

const MultiSelectInput = props => {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]

    const getValue = (e) => console.log(e);
    return (
        <div className="add__multi-container">
            <CreatableSelect
                className="add__multi"
                classNamePrefix="add_multi"
                isMulti={true}
                onChange={getValue}
                options={options}
                delimiter={","}
                styles={styleMultiSelect}
                placeholder={"Select categories"}
            />
        </div>
    )
}
