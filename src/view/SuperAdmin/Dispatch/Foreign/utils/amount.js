export const InvoiceTotal = (items = []) => {
    console.log(items);
    if (items.length < 1) {
        return 0
    }
    return items.map(({ PoList, quantity }) => (PoList?.unit_price * quantity)).reduce((sum, i) => sum + i, 0);
}
