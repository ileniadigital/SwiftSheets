import React, { useState } from 'react';

import '../Components/general.css'; //Import Styling

//Import componentts
import ConsultantView from './ConsultantView';
import TimesheetListView from './TimesheetListView';


export default function Home(props) {
    // const [view, setView] = useState('default');
    let view;
    switch (props.view) {
        case 'consultant':
            view = <ConsultantView />;
            break;
        case 'linemanager':
            view = <TimesheetListView />;
            break;
        case 'financeteam':
            view = <TimesheetListView  />;
            break;
    }
    return (
        <div className='home-container'>
            {view}
        </div>
    );
}