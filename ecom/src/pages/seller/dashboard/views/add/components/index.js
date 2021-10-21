import { AddSubmitButton } from "./product.add.submitbutton"
import { AddDescriptionInput } from "./product.add.descinput"
import { AddPhotoGallery } from "./product.add.gallery"
import { AddNameInput } from "./product.add.nameinput"
import { 
    MultiSelectInput, 
    CreatableMultiSelectInput,
    CreatableSingleSelectInput,
} from "./add.custom.select"

// TEST VERSION, PLACEHOLDER FOR THE MULTI-SELECT
const GeneralInput = props => {
    return (
        <div className="add__name-container">
            <span className="add__name-label">{props.label}</span>
            <input onChange={props.handleChange} className="add__name-input" type={props.type}></input>
        </div>
    )
}

export {
    GeneralInput, 
    AddDescriptionInput, 
    AddSubmitButton, 
    AddPhotoGallery, 
    AddNameInput, 
    MultiSelectInput, 
    CreatableMultiSelectInput,
    CreatableSingleSelectInput
}

