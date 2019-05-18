import React from 'react';
import '../../styles/loading.css';

function Loading(props) {
  return (
    <React.Fragment>
      <div className="lds-css ng-scope">
        <div style={{ width: '100%', height: '100%' }} className="lds-pacman">
          <div>
            <div />
            <div />
            <div />
          </div>
          <div>
            <div />
            <div />
          </div>
        </div>
      </div>
      <h3>Comming soon...</h3>
    </React.Fragment>
  );
}
export default Loading;
