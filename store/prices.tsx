import {action, computed, makeAutoObservable, makeObservable, observable} from 'mobx';
import PriceType from "../types/PriceType";


const dummyPrices = [
    {
        "seller": "Axion Now",
        "title": "Rekindling Phoenix - Foil - Prerelease Promo",
        "imgSrc": "https://crystal-cdn4.crystalcommerce.com/photos/6422572/medium/RekindlingPhoenixpromo.jpg",
        "productRef": "https://www.axionnow.com//catalog/magic_singles-promo_cards-promos_prerelease/rekindling_phoenix__foil__prerelease_promo/1491943",
        "expansion": "Promos: Prerelease",
        "price": 784,
        "stock": {
            "inStock": true,
            "stock": 1
        },
        "subtitle": "",
        "isFoil": true
    },
    {
        "seller": "Axion Now",
        "title": "Rekindling Phoenix",
        "imgSrc": "https://crystal-cdn3.crystalcommerce.com/photos/6421887/medium/155691_200w.jpg",
        "productRef": "https://www.axionnow.com//catalog/magic_singles-ixalan_block-rivals_of_ixalan/rekindling_phoenix/1465773",
        "expansion": "Rivals of Ixalan",
        "price": 266,
        "stock": {
            "inStock": true,
            "stock": 4
        },
        "subtitle": "",
        "isFoil": false
    },
    {
        "seller": "Magic Madhouse",
        "title": "Tarmogoyf",
        "imgSrc": "https://cdn11.bigcommerce.com/s-b4ioc4fed9/products/412836/images/528012/1614956320-35642800__74766.1649690281.386.513.jpg?c=1",
        "productRef": "https://magicmadhouse.co.uk/magic-the-gathering-tarmogoyf-time-spiral-remastered?sku=ETSR-3235M",
        "expansion": "Time Spiral Remastered",
        "price": 2499,
        "stock": {
            "inStock": true,
            "stock": 1
        },
        "subtitle": "",
        "isFoil": false
    },
    {
        "seller": "Magic Madhouse",
        "title": "Tarmogoyf",
        "imgSrc": "https://cdn11.bigcommerce.com/s-b4ioc4fed9/products/412832/images/633708/1422444276-95411900__64057.1656637362.386.513.jpg?c=1",
        "productRef": "https://magicmadhouse.co.uk/magic-the-gathering-tarmogoyf-future-sight?sku=EFUT-3153R",
        "expansion": "Future Sight",
        "price": 4999,
        "stock": {
            "inStock": true,
            "stock": 6
        },
        "subtitle": "",
        "isFoil": false
    },
    {
        "seller": "Axion Now",
        "title": "Fire // Ice",
        "imgSrc": "https://crystal-cdn4.crystalcommerce.com/photos/6483827/medium/fireice_ultm.png",
        "productRef": "https://www.axionnow.com//catalog/magic_singles-masters_sets-ultimate_masters/fire__ice/1547575",
        "expansion": "Ultimate Masters",
        "price": 24,
        "stock": {
            "inStock": true,
            "stock": 1
        },
        "subtitle": "",
        "isFoil": false
    },
]

class PricesStore {

    sellers: string[] = [];
    // prices: PriceInterface[] = [];
    prices: PriceType[] = dummyPrices;

    constructor() {
        // makeObservable(this, {
        //     addPrices: action,
        //     sellers: observable,
        //     sortedPrices: computed,
        //     numberOfPrices: computed,
        // });
        makeAutoObservable(this);
    }

    clearResults(): void {
        this.prices = [];
    }

    addPrices(pricesToAdd: []): void {
        console.log(pricesToAdd);
        this.prices = [...this.prices, ...pricesToAdd];
        console.log(this.prices.length);
    }

    get sortedPrices(): PriceType[] {
        return this.prices;
    }

    get numberOfPrices(): number {
        return this.prices.length;
    }

}

export const pricesStore = new PricesStore();
