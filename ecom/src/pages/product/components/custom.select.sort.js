import Select from 'react-select'

const defaultOptions = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]

const defaultPlaceholder = "Select"

const styleMultiSelect = {
    control: (styles) => ({
        ...styles,
        backgroundColor: 'white',
        width: 179,
        height: 32,
        borderRadius: 2,
        borderColor: "#ededed",
        marginLeft: "auto",
        marginRight: 0,
        textAlign: "start",
        fontSize: 12,
        fontWeight: 500,
    }),
    option: (styles, { isDisabled, isFocused, isSelected }) => ({
        ...styles,
        color: isFocused ? "#ffa15f" : "#3d3d3f",
        backgroundColor: "white",
        textAlign: "start",
        fontSize: 12,
        fontWeight: 500,
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: 1.43,
        letterSpacing: "normal",
    }),
    menu: (styles, state) => ({
        ...styles,
        position: "absolute",
        right: 0,
        width: 179,
    }),
    indicatorSeparator: (styles, state) => ({
        ...styles,
        backgroundColor: "white",
    }),
    placeholder: (base) => ({
        ...base,
        isRrl: false,
    }),
    multiValueContainer: (base) => ({
        ...base,
        backgroundColor: "#ffa15f",
    }),
}

export const SortProductList = props => {
    let options = props.options
    if (options === undefined)
        options = defaultOptions
    
    let placeholder = props.placeholder
    if(placeholder === undefined)
        placeholder = defaultPlaceholder

    const onChange = e => {
        if(props.onChange)
            props.onChange(e.value)
        else return
    }

    return (
        <div className="">
            <span className="">{props.children}</span>
            <Select
                className=""
                classNamePrefix="add_multi"
                onChange={e => onChange(e)}
                options={options}
                defaultValue={options[0]}
                styles={styleMultiSelect}
                placeholder={placeholder}
            />
        </div>
    )
}

