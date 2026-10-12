import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
// import styles from "./loading.module.css";

export default function Loading() {
  return (
    <main className={styles.loadingPage}>
      <div className={styles.skeletonGrid}>
        {Array.from({ length: 6 }, (_, index) => (
          <div className={styles.skeletonCard} key={index}>
          <div className={styles.skeletonHeader}>
            <Skeleton circle height={48} width={48} baseColor="#272b46" highlightColor="#3a4161" />

            <div className={styles.skeletonTitle}>
              <Skeleton height={20} width="180px" baseColor="#272b46" highlightColor="#3a4161" />
              <Skeleton height={14} width="120px" baseColor="#272b46" highlightColor="#3a4161" />
            </div>
          </div>

          <Skeleton height={14} width="45%" baseColor="#272b46" highlightColor="#3a4161" />
          <Skeleton height={14} width="60%" baseColor="#272b46" highlightColor="#3a4161" />
          <Skeleton height={30} width="100%" baseColor="#272b46" highlightColor="#3a4161" />
          </div>
        ))}
      </div>
    </main>
  );
}
