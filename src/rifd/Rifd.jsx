import React, { useEffect, useState, useRef } from "react";
import { database, ref, onValue } from "../firebase";

const Rifd = () => {
  const [nameValue, setNameValue] = useState(""); // Giá trị hiện tại của Name
  const [history, setHistory] = useState(() => {
    const savedHistory = localStorage.getItem("Rifd");
    return savedHistory ? JSON.parse(savedHistory) : [];
  });
  console.log("🚀 ~ const[history,setHistory]=useState ~ history:", history);
  const prevValue = useRef(""); // Lưu giá trị trước đó để so sánh sự thay đổi

  useEffect(() => {
    const nameRef = ref(database, "ENTRY/Name"); // Tham chiếu tới đường dẫn ENTRY/Name trong Firebase

    onValue(nameRef, (snapshot) => {
      const currentNameValue = snapshot.val(); // Lấy giá trị của Name từ Firebase

      if (currentNameValue !== prevValue.current) {
        const timestamp = new Date().toLocaleString(); // Lấy thời gian hiện tại

        // Thêm vào lịch sử nếu giá trị thay đổi
        const newHistory = {
          time: timestamp,
          value: currentNameValue,
        };

        // Sử dụng prev để lấy giá trị cũ của state history
        setHistory((prev) => {
          const checked = prev?.some(
            (item) => item?.value === newHistory?.value
          );

          if (newHistory?.value) {
            const updatedHistory = [newHistory, ...prev]?.slice(0, 20); // Cắt lại lịch sử nếu cần
            localStorage.setItem("Rifd", JSON.stringify(updatedHistory)); // Lưu vào LocalStorage
            return updatedHistory;
          }
          return prev; // Không thay đổi nếu giá trị đã có trong lịch sử
        });

        // Cập nhật giá trị hiện tại
        setNameValue(currentNameValue);
        prevValue.current = currentNameValue; // Lưu giá trị trước đó để so sánh lần sau
      }
    });
  }, []); // Chạy 1 lần khi component được mount

  return (
    <div>
      <h2>RFID Infomation</h2>
      <div>
        <p>
          <strong></strong> {nameValue}
        </p>
      </div>

      <h3>Change History (Last 20 Entries)</h3>
      <ul>
        {history?.length > 0 ? (
          history.map((item, index) => (
            <li key={index}>
              {item.time} - {item.value}
            </li>
          ))
        ) : (
          <h3>Không có dữ liệu</h3>
        )}
      </ul>
    </div>
  );
};

export default Rifd;
