
function CurrencyFormatter({amount, currency = 'PHP'}) {
    const formatter = new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
    })

    return <span>{formatter.format(amount)}</span>
}

export function formatCurrency(amount) {
    const formatter = new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
        minimumFractionDigits: 2,
    })

    return formatter.format(amount);
}

export default CurrencyFormatter