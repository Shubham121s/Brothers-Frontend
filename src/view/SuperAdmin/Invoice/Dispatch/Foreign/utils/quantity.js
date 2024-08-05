export const InvoiceQuantity = (items = []) => {
    if (items.length < 1) {
        return 0
    }
    return items.map(({ item_quantity }) => (item_quantity)).reduce((sum, quantity) => sum + quantity, 0);
}
