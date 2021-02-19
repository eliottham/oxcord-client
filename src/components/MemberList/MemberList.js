import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png';

import './MemberList.css';

const MemberList = ({ users }) => (
  <div className='textContainer'>
    {users ? (
      <div>
        <h2>
          <u>Members</u>
        </h2>
        <div className='activeContainer'>
          <h3>
            {users.map(({ name }) => (
              <div key={name} className='activeItem'>
                {name}
                <img alt='Online Icon' src={onlineIcon} />
              </div>
            ))}
          </h3>
        </div>
      </div>
    ) : null}
  </div>
);

export default MemberList;
