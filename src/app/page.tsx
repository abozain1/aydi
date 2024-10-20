"use client";
import dynamic from "next/dynamic";
import styles from "./page.module.css";
const SortableList = dynamic(() => import("@/comps/sortableList"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className={styles.page}>
      <SortableList />
    </div>
  );
}
