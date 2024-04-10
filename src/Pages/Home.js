import React, { useState } from 'react';

import '../Components/general.css'; //Import Styling

//Import componentts
import SystemAdminView from './SystemAdminView';
import ConsultantHome from './ConsultantView/ConsultantHome/ConsultantHome';
import TimesheetListView from './TimesheetListView';


export default function Home(props) {
    let view;
    const role=props.role
    switch (role) {
        case 'Consultant':
            view = <ConsultantHome />;
            break;
        case 'LineManager':
            view = <TimesheetListView role={role} />;
            break;
        case 'FinanceTeamMember':
            view = <TimesheetListView role={role} />;
            break;
        case 'Administrator':
            view = <SystemAdminView />;
            break;
    }
    return (
        <div className='home-container'>
            {view}
        </div>
    );
}