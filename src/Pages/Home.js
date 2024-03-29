import React, { useState } from 'react';

import '../Components/general.css'; //Import Styling

//Import componentts
import ConsultantView from './ConsultantView';
import LineManagerView from './LineManagerView';
import FinanceTeamView from './FinanceTeamView';
import SystemAdminView from './SystemAdminView';


export default function Home(props) {
    // const [view, setView] = useState('default');
    let view;
    switch (props.view) {
        case 'consultant':
            view = <ConsultantView />;
            break;
        case 'linemanager':
            view = <LineManagerView />;
            break;
        case 'financeteam':
            view = <FinanceTeamView />;
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

// function View1() {
//     return <h1>View 1</h1>;
// }

// function View2() {
//     return <h1>View 2</h1>;
// }

// function View3() {
//     return <h1>View 3</h1>;
// }

// function DefaultView() {
//     return <h1>Default View</h1>;
// }