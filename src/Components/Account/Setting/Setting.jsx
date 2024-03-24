import './Setting.css'; //Import styling

//Setting component to display user's information
export default function Setting(props){
    return(
        <div className="setting-container">
            {/* Setting name */}
            <div className='setting-name'>
                <h2 className='setting'>{props.setting}</h2>
            </div>
            {/* Setting value */}
            <div className='setting-value'>
                <p className={props.setting === 'Password' ? 'password-value' : 'value'}>{props.value}</p>
            </div>
        </div>
    );
}