import React from "react";
export default function Alerts(props) {
  const firstPayWeek = new Date("6/3/19");
  const today = new Date();
  const mSecSince1stPay = today.valueOf() - firstPayWeek.valueOf();
  const mSecPerWeek = 604800000;
  const weekNum = Math.ceil(mSecSince1stPay / mSecPerWeek);
  const payAlert =
    weekNum % 2 === 1 ? (today.getDay() !== 5 ? "Pay Week!" : "Payday!") : null;
  const alerts = payAlert ? [payAlert, ...props.alerts] : [...props.alerts];
  return (
    <div
      style={{
        gridArea: "alerts",
        backgroundColor: props.alertsColor,
        padding: "10px 10%",
        color: "#fff"
      }}
    >
      <div className="card-title">Alerts</div>
      <ul>
        {alerts.map(alert => (
          <li key={`alert${alert}`}>{alert}</li>
        ))}
      </ul>
    </div>
  );
}
