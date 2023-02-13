interface ProgressBarProps {
    progress: number;
}

const ProgressBar = (props: ProgressBarProps) => {

    return (
        <div className='h-3 rounded-xl bg-zinc-700 w-full mt-4'>
            <div
                role='progressbar'
                aria-label='progresso de habitos completados nesse dia'
                aria-aria-valuenow={props.progress}
                className='h-3 rounded-xl bg-violet-600'
                style={{ width: `${props.progress}%` }}
            />
        </div>
    )
}

export default ProgressBar;