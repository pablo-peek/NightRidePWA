import { CSSProperties, useState } from "react"

type Props = {
    placeholder?: string
    onChange?: undefined | ((event: React.ChangeEvent<HTMLInputElement> | any) => void)
    value?: string
    className?: string
    error?: boolean
    validate?: boolean
    inactive?: boolean
    style?: CSSProperties
}

function PasswordInput(props: Props): JSX.Element {
    const {
        placeholder = "",
        onChange = () => null,
        value = "",
        className = "",
        error = false,
        validate = false,
        inactive = false,
        style
    } = props
    const [showPassword, setShowPassword] = useState(false)

    const handleInputChange = (e: { target: { value: any } }) => {
        if (onChange && typeof onChange === "function") onChange(e.target.value)
    }

    return (
        <div className="input-wrapper relative">
            <input
                type={showPassword ? "text" : "password"}
                autoComplete="off"
                className={className}
                placeholder={placeholder}
                onChange={handleInputChange}
                style={style}
                value={value}
                disabled={inactive}
            />
            <p className="absolute right-4 top-5 cursor-pointer text-blue-500" onClick={() => !inactive && setShowPassword(!showPassword)}>
                {!showPassword ? "Mostrar" : "Ocultar"}
            </p>
        </div>
    )
}

export default PasswordInput