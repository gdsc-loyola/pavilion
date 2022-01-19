import React, { useState, useEffect, useCallback } from 'react';
import DashboardBase from '../components/DashboardBase';
import OrgsDataService from '../../services/orgs.service';
import more_options from '../../../static/assets/more_options.svg';
import '../../../stylesheets/org/Events.scss';

const Events = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [events, getEvents] = useState([]);
  const [user_loggedin] = useState('gdsc');

  function show_dropdown(e) {
    console.log(e.target);
    console.log(e.target.value);
    if (dropdownOpen) {
      setDropdownOpen(false);
    } else {
      setDropdownOpen(true);
    }
  }

  useEffect(() => {
    setEvents();
  }, [setEvents]);

  const setEvents = useCallback(() => {
    OrgsDataService.getByOrgUser(user_loggedin) //filter happens in the backend
      .then((res) => {
        // const org = res.data.find(({ user }) => user.username === user_loggedin)
        const org = res.data;
        console.log(res.data); //for testing
        return getEvents(org.events);
      })
      .catch((e) => console.log(e));
  }, [user_loggedin]);

  const tableData = () => {
    return events.map((val, i) => {
      return (
        <tr key={i} value={val.id}>
          <td value={val.name}>{val.name}</td>
          <td>
            {val.start_date} - {val.end_date}
          </td>
          <td>{val.last_updated}</td>
          <td>{val.status}</td>
          <td>
            <ul className="dropdown" style={{ display: dropdownOpen ? 'flex' : 'none' }}>
              <li>Edit</li>
              <li>Publish</li>
              <li>Delete</li>
            </ul>
          </td>
          <td>
            <img onClick={show_dropdown} src={more_options} />
          </td>
        </tr>
      );
    });
  };

  return (
    <div>
      <DashboardBase />
      <h1 className="title">Events</h1>
      <table className="events">
        <thead>
          <tr>
            <th>Name</th>
            <th>Duration</th>
            <th>Last Updated</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{tableData()}</tbody>
      </table>
    </div>
  );
};

export default Events;
