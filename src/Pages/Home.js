import React, { useState } from 'react';

import '../Components/general.css'; //Import Styling

//Import componentts
import SystemAdminView from './SystemAdminView';
import ConsultantHome from './ConsultantView/ConsultantHome/ConsultantHome';
import TimesheetListView from './TimesheetListView';


export default function Home() {
    // const [view, setView] = useState('default');
    let view;
    const role="linemanager";//need to set the role from the login page global state
    switch (role) {
        case 'consultant':
            view = <ConsultantHome />;
            break;
        case 'linemanager':
            view = <TimesheetListView role={role} />;
            break;
        case 'financeteam':
            view = <TimesheetListView role={role} />;
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