import React, { useState } from 'react';

import '../Components/general.css'; //Import Styling

//Import componentts
import SystemAdminView from './SystemAdminView';
import ConsultantHome from './ConsultantView/ConsultantHome/ConsultantHome';
import TimesheetListView from './TimesheetListView';


export default function Home(props) {
    // const [view, setView] = useState('default');
    let view;
    switch (props.view) {
        case 'consultant':
            view = <ConsultantHome />;
            break;
        case 'linemanager':
            view = <TimesheetListView />;
            break;
        case 'financeteam':
            view = <TimesheetListView  />;
            break;
        case 'systemadmin':
            view = <SystemAdminView />;
            break;
    }
    return (
        <div className='home-container'>
            {view}
        </div>
    );
}