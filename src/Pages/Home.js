import React, { useState } from 'react';

import '../Components/general.css'; //Import Styling

//Import componentts
import ConsultantHome from './ConsultantView/ConsultantHome/ConsultantHome';
import TimesheetListView from './TimesheetListView';


export default function Home(props) {
    // const [view, setView] = useState('default');
    let view;
    const role=props.view
    switch (props.view) {
        case 'consultant':
            view = <ConsultantHome />;
            break;
        case 'linemanager':
            view = <TimesheetListView role={role} />;
            break;
        case 'financeteam':
            view = <TimesheetListView role={role} />;
            break;
    }
    return (
        <div className='home-container'>
            {view}
        </div>
    );
}