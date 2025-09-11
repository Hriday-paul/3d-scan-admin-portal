
// import { ImSpinner8 } from 'react-icons/im'

export default function Loader() {
    return (
        <div className='min-h-40 flex items-center justify-center'>
            {/* <ImSpinner8 className="text-4xl text-primary animate-spin" /> */}
            <div className="w-11 aspect-square rounded-full border-[3px] border-gray-100 border-r-primary animate-spin"></div>
        </div>

    )
}
