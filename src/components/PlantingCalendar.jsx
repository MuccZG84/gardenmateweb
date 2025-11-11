import React from 'react';
import styles from '../styles/PlantingCalendar.module.css';

const MONTHS = [
  "siječanj", "veljača", "ožujak", "travanj", "svibanj", "lipanj",
  "srpanj", "kolovoz", "rujan", "listopad", "studeni", "prosinac"
];

export default function PlantingCalendar({ plant }) {
  if (!plant) return null;

  return (
    <div className={styles.calendarContainer}>
      <h3 className={styles.title}>Kalendar sadnje i berbe</h3>
      <div className={styles.monthGrid}>
        {MONTHS.map((month) => {
          const isSadnja = plant.sadnja.includes(month);
          const isBerba = plant.berba.includes(month);
          let cellClass = styles.month;

          if (isSadnja && isBerba) cellClass += ` ${styles.both}`;
          else if (isSadnja) cellClass += ` ${styles.sadnja}`;
          else if (isBerba) cellClass += ` ${styles.berba}`;

          return (
            <div key={month} className={cellClass}>
              {month.slice(0, 3)}
            </div>
          );
        })}
      </div>
      <div className={styles.legend}>
        <span className={styles.sadnjaBox}></span> Sadnja
        <span className={styles.berbaBox}></span> Berba
      </div>
    </div>
  );
}