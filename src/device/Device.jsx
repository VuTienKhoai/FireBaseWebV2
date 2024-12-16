import React, { useEffect, useState, useRef } from "react";
import { database, ref, onValue } from "../firebase";

const Device = () => {
  const [deviceData, setDeviceData] = useState({
    Cleaner: "",
    WaterHeater: "",
    air: "",
  });
  const [history, setHistory] = useState([]);
  const prevData = useRef({}); // Lưu giá trị trước đó

  useEffect(() => {
    const devRef = ref(database, "dev"); // Tham chiếu tới node `dev` trong Firebase

    onValue(devRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const timestamp = new Date().toLocaleString();
        const newHistory = [];

        // Kiểm tra sự thay đổi từng giá trị
        Object.keys(data).forEach((key) => {
          if (data[key] !== prevData.current[key]) {
            newHistory.push({
              time: timestamp,
              key: key,
              value: data[key],
            });
          }
        });

        // Cập nhật lịch sử nếu có thay đổi
        if (newHistory.length > 0) {
          setHistory((prevHistory) =>
            [...newHistory, ...prevHistory].slice(0, 50)
          ); // Giới hạn 50 bản ghi
        }

        // Cập nhật giá trị hiện tại và lưu giá trị trước đó
        setDeviceData(data);
        prevData.current = data;
      }
    });
  }, []);

  return (
    <div>
      <h2>Device Data</h2>
      <div>
        <p>
          <strong>Cleaner:</strong> {deviceData.Cleaner}
        </p>
        <p>
          <strong>Water Heater:</strong> {deviceData.WaterHeater}
        </p>
        <p>
          <strong>Air Conditioner:</strong> {deviceData.Air}
        </p>
      </div>

      <h3>Change History (Last 50 Entries)</h3>
      <ul>
        {history.map((entry, index) => (
          <li key={index}>
            {entry.time} - {entry.key}: {entry.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Device;
