import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../context";
import { Link } from "react-router-dom";
import axios from "axios";

const QrLogin = () => {
  const [state, setState] = useState("");
  const { instanceId, setInstanceId } = useContext(UserContext);

    const getQrCode = async () => {
      // const qr = await axios.get("http://localhost:3003/login");
      // const { qrCode, registrationId: newInstanceId } = qr.data;
      // setState(qrCode);   
      // console.log("qrCode: ", qrCode);
      // console.log("socket after fetch: ", newInstanceId);
      // setInstanceId(newInstanceId)
      // console.log(instanceId, "socket after context updated");  
      // return  
      const init = await axios.get("http://localhost:3003/login");
      console.log("respuesta del init(): ", init.data);
      const { registrationId: newInstanceId } = init.data;
      setInstanceId(newInstanceId);
      setTimeout(async () => {
        const qrFetch = await axios.get(`http://localhost:3003/login/qr/${newInstanceId}`);
        console.log("qrFetch: ", qrFetch.data);
        setState(qrFetch.data.qr);
        // return;
      }, 6000);
    }

  useEffect(() => {
    console.log("instanceId antes de ejecutar qr method: ", instanceId);
    // if (instanceId === "no hay socket") {
      getQrCode();
    // }
  }, []);

  return (
    <div>
      <img src={state} alt="qr-code"  />
      <Link to="/session">Click once scanned</Link>
    </div>
  );
};

export default QrLogin;
