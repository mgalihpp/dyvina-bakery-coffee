const rupiah = new Intl.NumberFormat("id-ID");

export function formatRupiah(amount: number) {
  return `Rp ${rupiah.format(amount)}`;
}

const TIME_ZONE = "Asia/Jakarta";
const DAY_MS = 86_400_000;

const dayKey = (date: Date) =>
  date.toLocaleDateString("sv-SE", { timeZone: TIME_ZONE });

const clock = (date: Date) =>
  date.toLocaleTimeString("en-GB", {
    timeZone: TIME_ZONE,
    hour: "2-digit",
    minute: "2-digit",
  });

const dayMonth = (date: Date) =>
  date.toLocaleDateString("id-ID", {
    timeZone: TIME_ZONE,
    day: "numeric",
    month: "short",
  });

export function formatOrderTime(date: Date, now: Date) {
  const day = dayKey(date);
  if (day === dayKey(now)) return clock(date);
  if (day === dayKey(new Date(now.getTime() - DAY_MS))) return "Kemarin";
  return dayMonth(date);
}

export function formatOrderDateTime(date: Date) {
  return `${dayMonth(date)}, ${clock(date)}`;
}

export function formatPhone(phone: string) {
  const local = phone.startsWith("62") ? `0${phone.slice(2)}` : phone;
  return local.replace(/^(\d{4})(\d{4})(\d+)$/, "$1-$2-$3");
}
