import "./dashboard.css";
import useFetch from "../../hooks/useFetch";
import { useEffect } from "react";

const Dashboard = () => {
  const { data, pending, error, h } = useFetch(
    "http://localhost:5000/api/v1/trans"
  );

  console.log({ data, pending, error, h }, "not seeing it");

  return <h2>Dashboard</h2>;
};

export default Dashboard;
