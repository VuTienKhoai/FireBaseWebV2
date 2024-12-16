import React, { useEffect, useState, useRef } from "react";
import { database, ref, onValue } from "./firebase";

const Device = () => {
  const [deviceData, setDeviceData] = useState({
    Cleaner: "",
    WaterHeater: "",
    Air: "",
  });
  const [history, setHistory] = useState(() => {
    // Khôi phục từ LocalStorage khi khởi tạo
    const savedHistory = localStorage.getItem("device");
    return savedHistory ? JSON.parse(savedHistory) : [];
  });
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

        // Kiểm tra nếu phần tử trong newHistory đã tồn tại trong history
        if (newHistory.length > 0) {
          setHistory((prevHistory) => {
            // Lọc các phần tử trong newHistory để chỉ giữ lại những phần tử không trùng với history
            const updatedHistory = [
              ...newHistory.filter(
                (newItem) =>
                  !prevHistory.some(
                    (existingItem) =>
                      existingItem.key === newItem.key &&
                      existingItem.value === newItem.value
                  )
              ),
              ...prevHistory,
            ].slice(0, 50); // Giới hạn 50 bản ghi

            // Lưu vào LocalStorage
            localStorage.setItem("device", JSON.stringify(updatedHistory));

            return updatedHistory;
          });
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
        {history?.length > 0 ? (
          history.map((item, index) => (
            <li key={index}>
              {item.time} - {item.key}: {item.value}
            </li>
          ))
        ) : (
          <h3>Không có dữ liệu</h3>
        )}
      </ul>
    </div>
  );
};

export default Device;
