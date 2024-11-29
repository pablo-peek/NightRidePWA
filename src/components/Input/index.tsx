import React, { useState } from "react"
import { CSSProperties , FocusEvent} from "react"

export type Props = {
    name?: string,
    icon?: string
    placeholder?: string
    onChange?: undefined | ((event: React.ChangeEvent<HTMLInputElement> | any) => void)
    onBlur?: undefined | ((event: FocusEvent<HTMLInputElement> | any) => any)
    value?: any
    className?: string
    error?: boolean
    validate?: boolean
    inactive?: boolean
    type?: string
    style?: CSSProperties
    errorMessage?: string | undefined
    onKeyDown?: undefined | ((event: React.KeyboardEvent<HTMLInputElement> | any) => void)
    onPaste?: undefined | ((event: React.KeyboardEvent<HTMLInputElement> | any) => void)
}

function Input(props: Props): JSX.Element {
    const {
        name = "",
        icon = "",
        placeholder = "",
        onChange = () => null,
        onBlur = () => null,
        value = "",
        className = "",
        error = false,
        validate = false,
        inactive = false,
        type = "text",
        style = {},
        errorMessage = "",
        onKeyDown = () => null,
        onPaste: onPasteCapture = () => null
    } = props
    const [errMessage, setErrMessage] = useState('')
    const classNames = errorMessage ? "error" : validate ? "validate" : inactive ? "inactive" : " input_container"

     if (!placeholder) placeholder.concat(`Ingrese un ${type == "number" || type == "tel" ? "numero" : "texto"}`)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
        if (onChange && typeof onChange === "function") onChange(e.target.value)
    }
    
    const handleInputBlur = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onBlur && typeof onBlur === "function") {
            const isMessageError = await onBlur(e.target.value)    
            if(isMessageError){
                setErrMessage(isMessageError)
            }else {
                setErrMessage('')
            }
        }
    }
    
    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement> | any) => {
        if (onKeyDown && typeof onKeyDown === "function") onKeyDown(e);
    };

    const handleInputPaste = (e: React.KeyboardEvent<HTMLAnchorElement> | any) => {
        if (onPasteCapture && typeof onPasteCapture === "function") onPasteCapture(e);
    };

    return (
        <div className="input-wrapper">
            <input
                type={type}
                autoComplete="off"
                className={className}
                placeholder={placeholder}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                onKeyDown={handleInputKeyDown}
                onPaste={handleInputPaste}
                style={style}
                value={value}
                disabled={inactive}
            />
            {
                errorMessage && (
                    <span className="text-sm text-red-600">
                    {errorMessage}
                    </span>
                )
            }
        </div>
    )
}

export default Input