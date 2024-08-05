
export const InvoiceWeight = (items = []) => {
    if (items.length < 1) {
        return 0
    }
    return items.map(({ quantity, weight }) => (quantity * weight)).reduce((sum, i) => sum + i, 0);
}