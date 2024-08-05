export const InvoiceTotal = (items = [], convert_rate = 1) => {
    if (items.length < 1) {
        return 0
    }
    return items.map(({ PoList: { unit_price }, item_quantity }) => {
        const unit_rate = Number(unit_price)
        const quantity = parseInt(item_quantity)
        return Number(((unit_rate * Number(convert_rate)).toFixed(2) * quantity).toFixed(2))
    }).reduce((sum, i) => sum + i, 0);
}