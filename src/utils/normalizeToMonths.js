// utils/normalizeToMonths.js

export default function normalizeToFixedMonths(data = []) {
  if (!data.length) {
    return { labels: [], sales: [], purchase: [] };
  }

  // Parse & sort by date
  const parsed = data
    .map((d) => ({
      date: new Date(d._id),
      sales: Number(d.sales) || 0,
      purchase: Number(d.purchase) || 0,
    }))
    .sort((a, b) => a.date - b.date);

  const start = new Date(
    parsed[0].date.getFullYear(),
    parsed[0].date.getMonth(),
    1,
  );
  const end = new Date(
    parsed[parsed.length - 1].date.getFullYear(),
    parsed[parsed.length - 1].date.getMonth(),
    1,
  );

  // Map existing data → "YYYY-M"
  const map = new Map();
  parsed.forEach((d) => {
    const key = `${d.date.getFullYear()}-${d.date.getMonth()}`;
    map.set(key, { sales: d.sales, purchase: d.purchase });
  });

  const labels = [];
  const sales = [];
  const purchase = [];

  let cursor = new Date(start);

  while (cursor <= end) {
    const key = `${cursor.getFullYear()}-${cursor.getMonth()}`;

    // ✅ UNIQUE + READABLE LABEL
    labels.push(
      cursor.toLocaleString("en-US", {
        month: "short",
        year: "2-digit",
      }),
    );

    if (map.has(key)) {
      sales.push(map.get(key).sales);
      purchase.push(map.get(key).purchase);
    } else {
      sales.push(0);
      purchase.push(0);
    }

    cursor.setMonth(cursor.getMonth() + 1);
  }

  return { labels, sales, purchase };
}
