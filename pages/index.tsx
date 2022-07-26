import { Button } from "antd";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className="p-6">
      <p className="px-0">Location</p>
      <Button type="primary">Button</Button>
    </div>
  );
};

export default Home;
