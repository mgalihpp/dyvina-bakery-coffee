const rupiah = new Intl.NumberFormat("id-ID");

export function formatRupiah(amount: number) {
  return `Rp ${rupiah.format(amount)}`;
}
