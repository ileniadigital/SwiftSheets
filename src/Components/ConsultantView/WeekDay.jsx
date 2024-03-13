import Hours from './Hours';

export default function WeekDay({day, addEventHandler}) {
    return(
        <div>
            <h1>{day}</h1>
            <Hours addEventHandler={addEventHandler}/>
        </div>
    )
}