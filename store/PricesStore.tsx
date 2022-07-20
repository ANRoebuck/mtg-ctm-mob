import { action, computed, makeAutoObservable, makeObservable } from 'mobx';
import { getStoredDataOrDefault, storeData, storeDataString } from '../gateway/storage';
import PriceType from "../types/PriceType";
import SellerType from '../types/SellerType';
import { configureSellers, filterFoilsOptions, sortPriceOptions } from '../utils/utils';


const dummyPrices: PriceType[] = [
    {
        "seller": "Axion Now",
        "title": "Rekindling Phoenix - Foil - Prerelease Promo",
        "imgSrc": "https://crystal-cdn4.crystalcommerce.com/photos/6422572/medium/RekindlingPhoenixpromo.jpg",
        "productRef": "https://www.axionnow.com//catalog/magic_singles-promo_cards-promos_prerelease/rekindling_phoenix__foil__prerelease_promo/1491943",
        "expansion": "Promos: Prerelease",
        "price_relativeUnits": 784,
        "price_textRepresentation": "£7.84",
        "stock_inStock": true,
        "stock_level": "1",
        "subtitle": "",
        "isFoil": true
    },
    {
        "seller": "Axion Now",
        "title": "Rekindling Phoenix",
        "imgSrc": "https://crystal-cdn3.crystalcommerce.com/photos/6421887/medium/155691_200w.jpg",
        "productRef": "https://www.axionnow.com//catalog/magic_singles-ixalan_block-rivals_of_ixalan/rekindling_phoenix/1465773",
        "expansion": "Rivals of Ixalan",
        "price_relativeUnits": 266,
        "price_textRepresentation": "£2.66",
        "stock_inStock": true,
        "stock_level": "4",
        "subtitle": "",
        "isFoil": false
    },
    {
        "seller": "Magic Madhouse",
        "title": "Tarmogoyf",
        "imgSrc": "https://cdn11.bigcommerce.com/s-b4ioc4fed9/products/412836/images/528012/1614956320-35642800__74766.1649690281.386.513.jpg?c=1",
        "productRef": "https://magicmadhouse.co.uk/magic-the-gathering-tarmogoyf-time-spiral-remastered?sku=ETSR-3235M",
        "expansion": "Time Spiral Remastered",
        "price_relativeUnits": 2499,
        "price_textRepresentation": "£24.99",
        "stock_inStock": true,
        "stock_level": "1",
        "subtitle": "",
        "isFoil": false
    },
    {
        "seller": "Magic Madhouse",
        "title": "Tarmogoyf",
        "imgSrc": "https://cdn11.bigcommerce.com/s-b4ioc4fed9/products/412832/images/633708/1422444276-95411900__64057.1656637362.386.513.jpg?c=1",
        "productRef": "https://magicmadhouse.co.uk/magic-the-gathering-tarmogoyf-future-sight?sku=EFUT-3153R",
        "expansion": "Future Sight",
        "price_relativeUnits": 4999,
        "price_textRepresentation": "£49.99",
        "stock_inStock": true,
        "stock_level": "6",
        "subtitle": "",
        "isFoil": false
    },
    {
        "seller": "Axion Now",
        "title": "Fire // Ice",
        "imgSrc": "https://crystal-cdn4.crystalcommerce.com/photos/6483827/medium/fireice_ultm.png",
        "productRef": "https://www.axionnow.com//catalog/magic_singles-masters_sets-ultimate_masters/fire__ice/1547575",
        "expansion": "Ultimate Masters",
        "price_relativeUnits": 24,
        "price_textRepresentation": "£0.24",
        "stock_inStock": true,
        "stock_level": "1",
        "subtitle": "",
        "isFoil": false
    },
]


const sortByPriceKey = 'ctm_sortByPrice';
const sortPriceAscending = (a: PriceType, b: PriceType): number => a.price_relativeUnits - b.price_relativeUnits;
const sortPriceDescending = (a: PriceType, b: PriceType): number => b.price_relativeUnits - a.price_relativeUnits;
const sortByPrice = (sortBy: string) => sortBy === sortPriceOptions.asc ? sortPriceAscending : sortPriceDescending;


const filterFoilsKey = 'ctm_filterFoils';
const filterFoilOnly = (p: PriceType): boolean => p.isFoil;
const filterNonFoilOnly = (p: PriceType): boolean => !p.isFoil;
const maybeFilterFoils = (filterBy: string) => {
    switch(filterBy) {
        case filterFoilsOptions.foil:
            return filterFoilOnly;
        case filterFoilsOptions.nonFoil:
            return filterNonFoilOnly;
        default:
            return () => true;
    }
}


class PricesStore {

    sellers: SellerType[] = configureSellers();
    prices: PriceType[] = dummyPrices;
    sortPriceBy: string = sortPriceOptions.asc;
    filterFoilsBy: string = filterFoilsOptions.all;

    constructor() {
        // makeObservable(this, {
        //     addPrices: action,
        //     sellers: observable,
        //     sortedPrices: computed,
        //     numberOfPrices: computed,
        // });
        makeAutoObservable(this);
        this.loadStoredValues();
    }

    loadStoredValues = (): void => {
        getStoredDataOrDefault(sortByPriceKey, sortPriceOptions.asc).then(s => this.setSortPriceBy(s));
        getStoredDataOrDefault(filterFoilsKey, filterFoilsOptions.all).then(s => this.setFilterFoilsBy(s));
    }

    get activeSellers(): SellerType[] {
        return this.sellers.filter(s => s.enabled);
    }

    get sortedPrices(): PriceType[] {
        return this.prices.slice()
            .filter(({ seller }) => this.isActiveSeller(seller))
            .filter(maybeFilterFoils(this.filterFoilsBy))
            .sort(sortByPrice(this.sortPriceBy));
    }

    isActiveSeller = (seller: string) => {
        return this.sellers.find(({ name }) => name === seller)?.enabled;
    }

    clearResults = (): void => {
        this.prices = [];
    }

    addPrices = (pricesToAdd: PriceType[]): void => {
        this.prices = [...this.prices, ...pricesToAdd];
    }

    setSortPriceBy = (sortBy: string): void => {
        this.sortPriceBy = sortBy;
        storeDataString(sortByPriceKey, sortBy);
    }

    setFilterFoilsBy = (filterBy: string): void => {
        this.filterFoilsBy = filterBy;
        storeDataString(filterFoilsKey, filterBy);
    }

    toggleSellerEnabled = (sellerName: string): void => {
        this.sellers = this.sellers.map(s => {
            let { enabled, name } = s;
            if (name === sellerName) enabled = !enabled;
            return {
                ...s,
                enabled,
            };
        });
    }
}

export const pricesStore = new PricesStore();
