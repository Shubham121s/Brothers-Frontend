
export const InvoiceQuantity = (items = []) => {
    if (items.length < 1) {
        return 0
    }
    return items.map(({ quantity }) => (quantity)).reduce((sum, i) => sum + i, 0);
}

