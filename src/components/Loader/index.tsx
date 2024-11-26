function Loader(props: {
    visible?: boolean
}): JSX.Element | null {
    const { visible = false } = props

    if (!visible) return null

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-lg">
                <img src="/assets/loader.svg" alt="alert" className="w-16 h-16 animate-spin" />
                <p className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-300">Espera un momento...</p>
            </div>
        </div>
    )
}

export default Loader