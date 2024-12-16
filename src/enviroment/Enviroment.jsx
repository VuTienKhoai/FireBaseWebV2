import React, { useEffect, useState } from "react";
import { database, ref, onValue } from "../firebase";

const Environment = () => {
  const [humidity, setHumidity] = useState("");
  const [temperature, setTemperature] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const envRef = ref(database, "env");
    onValue(envRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const newHumidity = data.Humidity || "N/A";
        const newTemperature = data.Temperature || "N/A";

        // Thêm giá trị mới vào lịch sử
        const newEntry = {
          time: new Date().toLocaleString(),
          humidity: newHumidity,
          temperature: newTemperature,
        };

        setHistory((prevHistory) => {
          const updatedHistory = [newEntry, prevHistory];
          return updatedHistory.slice(0, 50); // Giữ tối đa 50 giá trị
        });

        // Cập nhật giá trị hiện tại
        setHumidity(newHumidity);
        setTemperature(newTemperature);
      }
    });
  }, []);

  return (
    <div>
      <h2>Environment Data</h2>
      <p>
        <strong>Current Humidity:</strong> {humidity} %
      </p>
      <p>
        <strong>Current Temperature:</strong> {temperature} °C
      </p>

      <h3>History (Last 50 Entries)</h3>
      <ul>
        {history.map((entry, index) => (
          <li key={index}>
            {entry.time} - Humidity: {entry.humidity} % - Temperature:{" "}
            {entry.temperature} °C
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Environment;
