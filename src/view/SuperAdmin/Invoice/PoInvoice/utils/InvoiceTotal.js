export const InvoiceTotal = (items = []) => {
    if (items.length < 1) {
        return 0
    }
    return items.map(({  unit_price, quantity }) => {
        const unit_rate = Number(unit_price)
        const item_quantity = parseInt(quantity)
        return Number(((unit_rate) * item_quantity))
    }).reduce((sum, i) => sum + i, 0);
}