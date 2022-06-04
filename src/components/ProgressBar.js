
import './progress.css'


export const ProgressBar = ({ percent = ' 50% ' }) => {

    return <div className="progress">
        <div className="progress-done" style={{ width: `${percent}`, maxWidth: '100%' }}>
            {percent}
        </div>
    </div>
}

export const Currency = ({ value = 700 }) => {

    return <div className='currency'>
        <progress min="0" max="1000" value={value.replace('$', '')} />
        <div>{value}</div>
    </div>

}


