import { useEffect, useState } from "react";

function DowntimeComponent() {
  const [secondsLeft, setSecondsLeft] = useState(180); // 3 phút = 180 giây

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // clear nếu component unmount
  }, []);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${String(mins).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div className="flex justify-center ">
      <p className="text-sm flex items-center">
        mã xác nhận còn hiệu lực trong vòng :
      </p>
      <div className="text-xl text-red-500 flex items-center ms-1">
        {formatTime(secondsLeft)}
      </div>
    </div>
  );
}

export default DowntimeComponent;
