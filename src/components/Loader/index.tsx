function Loader(props: {
    visible?: boolean
}): JSX.Element | null {
    const { visible = false } = props

    if (!visible) return null

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <span className="loading loading-dots loading-md"></span>
        </div>
    )
}

export default Loader