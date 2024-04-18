import React, { useState } from 'react';
import SockJsClient from 'react-stomp';

const SOCKET_URL = 'http://localhost:8080/produce';

const App = () => {
  const [message, setMessage] = useState([]);

  let onConnected = () => {
    console.log("Connected!!")
  }

  let onMessageReceived = (msg) => {
    console.log(msg)
    setMessage(msg);
  }

  return (
    <div>
      <SockJsClient
        url={SOCKET_URL}
        topics={['/topic/getProduce']}
        onConnect={onConnected}
        onDisconnect={console.log("Disconnected!")}
        onMessage={msg => onMessageReceived(msg)}
        debug={false}
      />
      <div className="table">
      <table className="table-table">
        <thead>
          <tr>
            <th>Produce Id</th>
            <th>Weight</th>
            <th>Farmer Id</th>
            <th>Farmer Name</th>
            <th>Clerk Id</th>
            <th>Clerk Name</th>
          </tr>
        </thead>
        {message != null && (
          <tbody>
            {message
              .map((val, key) => {
                return (
                  <tr key={key}>
                    <td>{val.produceid}</td>
                    <td>{val.weight}</td>
                    <td>{val.categoryid}</td>
                    <td>{val.farmerid}</td>
                    <td>{val.clerkid}</td>
                    <td>{val.centerid}</td>
                  </tr>
                );
              })}
          </tbody>
        )}
      </table>
    </div>
      {/* <div>{message}</div> */}
    </div>
  );
}

export default App;