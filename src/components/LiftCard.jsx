import React from 'react';
import './LiftCard.css';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const LiftCard = ({ lift }) => {
  const { ID, Fl, Alarm, Door } = lift;
  const isDoorOpen = Door === '1';
  const isAlarm = Alarm === '1';

  return (
    <div className={`lift-card ${isAlarm ? 'alert' : ''}`}>
      <div className="arrow">
        {Fl > 0 ? <FaArrowUp /> : <FaArrowDown />}
      </div>

      {/* 🔄 force reanimation with a dynamic key */}
      <div key={`door-${isDoorOpen}`} className={`circle ${isDoorOpen ? 'open' : ''}`}>
        <span className="floor-number">{Fl}</span>
      </div>

      <div className="lift-id">Lift {ID}</div>
    </div>
  );
};

export default LiftCard;
