import retryIcon from '../../assets/images/icon-retry.svg';
import errorIcon from '../../assets/images/icon-error.svg';

export default function Error({onRetry}) {

    return(
        <div className="flex flex-col justify-between items-center gap-6">
            <img src={errorIcon} alt="Error Icon" className='w-10'/>
            <h1 className='font2 font-bricolage text-white'>Something went wrong</h1>
            <p className='text-neutral-300'>We couldn’t connect to the server (API error). Please try again in a few moments.</p>
            <button  onClick={onRetry} className='flex bg-neutral-800 rounded-lg px-4 py-3 gap-2.5 items-center cursor-pointer'>
                <img src={retryIcon} alt="Retry Icon" className='w-4' />
                <span className='text-white'>Retry</span>
            </button>

        </div>

    )
}