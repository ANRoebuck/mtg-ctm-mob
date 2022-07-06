
type PriceType = {
    seller: string,
    title: string,
    imgSrc: string,
    productRef: string,
    expansion: string,
    price: number,
    stock: StockType,
    subtitle: string,
    isFoil: boolean,
}

type StockType = {
    inStock: boolean,
    stock: number,
}

export default PriceType;
