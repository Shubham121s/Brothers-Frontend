
export const InvoiceWeight = (items = []) => {
    if (items.length < 1) {
        return 0
    }
    return items.map(({ item_quantity, item_weight }) => (Number(item_quantity) * Number(item_weight)?.toFixed(3))).reduce((sum, weight) => sum + weight, 0)?.toFixed(3);
}