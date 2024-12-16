import React, { useEffect, useState } from "react";
import { database, ref, onValue } from "./firebase";

const Environment = () => {
  const [humidity, setHumidity] = useState("");
  const [temperature, setTemperature] = useState("");
  const [history, setHistory] = useState(() => {
    // Khôi phục từ LocalStorage khi khởi tạo
    const savedHistory = localStorage.getItem("history");
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  useEffect(() => {
    const envRef = ref(database, "env");

    onValue(envRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const newHumidity = data.Humidity || "N/A";
        const newTemperature = data.Temperature || "N/A";

        // Tạo mục lịch sử mới
        const newEntry = {
          time: new Date().toLocaleString(),
          humidity: newHumidity,
          temperature: newTemperature,
        };

        // Cập nhật lịch sử và lưu vào LocalStorage
        setHistory((prevHistory) => {
          const isDuplicate = prevHistory.some(
            (item) =>
              item.humidity === newEntry.humidity &&
              item.temperature === newEntry.temperature
          );

          if (!isDuplicate) {
            const updatedHistory = [newEntry, ...prevHistory].slice(0, 50); // Giữ tối đa 50 mục
            localStorage.setItem("history", JSON.stringify(updatedHistory)); // Lưu vào LocalStorage
            return updatedHistory;
          }

          return prevHistory; // Không thay đổi nếu trùng
        });

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
        {history?.length > 0 ? (
          history.map((item, index) => (
            <li key={index}>
              {item.time} - Humidity: {item.humidity} % - Temperature:{" "}
              {item.temperature} °C
            </li>
          ))
        ) : (
          <h3>Không có dữ liệu</h3>
        )}
      </ul>
    </div>
  );
};

export default Environment;
