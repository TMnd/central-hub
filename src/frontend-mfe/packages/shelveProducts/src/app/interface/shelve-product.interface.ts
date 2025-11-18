export interface ShelveProduct {
    name: string,
    productId: string
    barCode: string,
    code: string,
    expiryDate: string,
    date: string,
    description: string
}

export interface ShelveProductTable extends ShelveProduct {
    daysLeft: number
    isSelected?: boolean
}

export interface ShelveProductCount {
    productName: string
    productCount: string
}
