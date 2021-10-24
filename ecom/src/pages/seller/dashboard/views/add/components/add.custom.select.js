import Select from 'react-select'
import CreatableSelect from 'react-select/creatable'

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
        width: 785,
        height: 48,
        borderRadius: 2,
        borderColor: "#ededed",
        marginLeft: "auto",
        marginRight: 0,
        textAlign: "start",
    }),
    option: (styles, { isDisabled, isFocused, isSelected }) => ({
        ...styles,
        color: isFocused ? "#ffa15f" : "#3d3d3f",
        backgroundColor: "white",
        textAlign: "start",
        fontSize: 14,
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
        width: 785,
        height: 48,
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

export const CreatableMultiSelectInput = props => {
    let options = props.options
    if (options === undefined)
        options = defaultOptions
    
    let placeholder = props.placeholder
    if(placeholder === undefined)
        placeholder = defaultPlaceholder

    const formatListValue = values => {
        let tmp = values.map(e => e.value).join(",")
        props.onChange(tmp)
    }

    return (
        <div className="add__multi-container">
            <span className="add__multi-label">{props.children}</span>
            <CreatableSelect
                className="add__multi"
                classNamePrefix="add_multi"
                isMulti={true}
                onChange={formatListValue}
                options={options}
                delimiter={","}
                styles={styleMultiSelect}
                placeholder={placeholder}
            />
        </div>
    )
}

export const CreatableSingleSelectInput = props => {
    let options = props.options
    if (options === undefined)
        options = defaultOptions
    
    let placeholder = props.placeholder
    if(placeholder === undefined)
        placeholder = defaultPlaceholder

    return (
        <div className="add__multi-container">
            <span className="add__multi-label">{props.children}</span>
            <CreatableSelect
                className="add__multi"
                classNamePrefix="add_multi"
                onChange={e => props.onChange(e.value)}
                options={options}
                styles={styleMultiSelect}
                placeholder={placeholder}
            />
        </div>
    )
}


export const MultiSelectInput = props => {
    let options = props.options
    if (options === undefined)
        options = defaultOptions
    
    let placeholder = props.placeholder
    if(placeholder === undefined)
        placeholder = defaultPlaceholder

    const formatListValue = values => {
        let tmp = values.map(e => e.value)
        props.onChange(tmp)
    }
    return (
        <div className="add__multi-container">
            <span className="add__multi-label">{props.children}</span>
            <Select
                className="add__multi"
                classNamePrefix="add_multi"
                isMulti={true}
                onChange={formatListValue}
                options={options}
                delimiter={","}
                styles={styleMultiSelect}
                placeholder={placeholder}
            />
        </div>
    )
}
