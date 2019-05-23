import React from 'react';
import '../../styles/loading.css';

function Loading(props) {
  return (
    <div className="d-flex justify-content-center">
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
    </div>
  );
}
export default Loading;
