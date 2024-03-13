import Hours from './Hours';

export default function WeekDay({day}) {
    return(
        <div>
            <h1>{day}</h1>
            <Hours/>
        </div>
    )
}