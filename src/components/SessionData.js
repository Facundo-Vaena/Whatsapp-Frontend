import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../context";
import axios from "axios";

const SessionData = () => {
  const [data, setData] = useState({ contacts: null, chats: null });
  const { instanceId, setInstanceId } = useContext(UserContext);

  const getData = async () => {
    console.log("instances: ", instanceId);
    const fetch = await axios.get(
      `http://localhost:3003/userData/${instanceId}`
    );
    setData({ chats: fetch.data.chats, contacts: fetch.data.contacts });
    console.log("received contacts at front: ", fetch.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div style={{display: "flex", margin: "20px", marginRight: "30px"}}>
      {data?.contacts?.length || data?.chats?.length ?
       ( <>
        <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row"
        }}
      >
        { (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h1>Contacts</h1>
            <table style={{alignItems: "center"}}>
              <tr>
                <th>Nombre</th>
              </tr>
              {data?.contacts?.map(({ name, notify }) => {
                return (
                  <tr>
                    <td key={ name || notify }>{ name || notify }</td>
                  </tr>
                );
              })}
            </table>
          </div>
        )}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {(
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h1>Chats</h1>
            <table>
              <tr>
                <th>Nombre/Numero</th>
              </tr>
              {data?.chats?.map(({ id, name }) => {
                const recivedKey = name || id.slice(3, 13)
                return (
                  <tr>
                    <td key={recivedKey}>{recivedKey}</td>
                  </tr>
                );
              })}
            </table>
          </div>
        )}
      </div>
      </>): <h2>No data yet</h2>
      }
    </div>
  );
};

export default SessionData;
