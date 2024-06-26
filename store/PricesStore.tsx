import { makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PriceType from '../types/PriceType';
import SellerType from '../types/SellerType';
import {
    configureSellers,
    filterFoilsOptions,
    sortPriceOptions
} from '../utils/utils';
import { getPrices } from '../gateway/http';

const dummyPrices: PriceType[] = [
    {
        seller: 'Axion Now',
        title: 'Rekindling Phoenix - Foil - Prerelease Promo',
        imgSrc: 'https://crystal-cdn4.crystalcommerce.com/photos/6422572/medium/RekindlingPhoenixpromo.jpg',
        productRef:
            'https://www.axionnow.com//catalog/magic_singles-promo_cards-promos_prerelease/rekindling_phoenix__foil__prerelease_promo/1491943',
        expansion: 'Promos: Prerelease',
        price_relativeUnits: 784,
        price_textRepresentation: '£7.84',
        stock_inStock: true,
        stock_level: '1',
        subtitle: '',
        isFoil: true
    },
    {
        seller: 'Axion Now',
        title: 'Rekindling Phoenix',
        imgSrc: 'https://crystal-cdn3.crystalcommerce.com/photos/6421887/medium/155691_200w.jpg',
        productRef:
            'https://www.axionnow.com//catalog/magic_singles-ixalan_block-rivals_of_ixalan/rekindling_phoenix/1465773',
        expansion: 'Rivals of Ixalan',
        price_relativeUnits: 266,
        price_textRepresentation: '£2.66',
        stock_inStock: true,
        stock_level: '4',
        subtitle: '',
        isFoil: false
    },
    {
        seller: 'Magic Madhouse',
        title: 'Tarmogoyf',
        imgSrc: 'https://cdn11.bigcommerce.com/s-b4ioc4fed9/products/412836/images/528012/1614956320-35642800__74766.1649690281.386.513.jpg?c=1',
        productRef:
            'https://magicmadhouse.co.uk/magic-the-gathering-tarmogoyf-time-spiral-remastered?sku=ETSR-3235M',
        expansion: 'Time Spiral Remastered',
        price_relativeUnits: 2499,
        price_textRepresentation: '£24.99',
        stock_inStock: true,
        stock_level: '1',
        subtitle: '',
        isFoil: false
    },
    {
        seller: 'Magic Madhouse',
        title: 'Tarmogoyf',
        imgSrc: 'https://cdn11.bigcommerce.com/s-b4ioc4fed9/products/412832/images/633708/1422444276-95411900__64057.1656637362.386.513.jpg?c=1',
        productRef:
            'https://magicmadhouse.co.uk/magic-the-gathering-tarmogoyf-future-sight?sku=EFUT-3153R',
        expansion: 'Future Sight',
        price_relativeUnits: 4999,
        price_textRepresentation: '£49.99',
        stock_inStock: true,
        stock_level: '6',
        subtitle: '',
        isFoil: false
    },
    {
        seller: 'Axion Now',
        title: 'Fire // Ice',
        imgSrc: 'https://crystal-cdn4.crystalcommerce.com/photos/6483827/medium/fireice_ultm.png',
        productRef:
            'https://www.axionnow.com//catalog/magic_singles-masters_sets-ultimate_masters/fire__ice/1547575',
        expansion: 'Ultimate Masters',
        price_relativeUnits: 24,
        price_textRepresentation: '£0.24',
        stock_inStock: true,
        stock_level: '1',
        subtitle: '',
        isFoil: false
    }
];

const sortBySeller = (a: PriceType, b: PriceType) =>
    a.seller.localeCompare(b.seller);

const sortPriceAscending = (a: PriceType, b: PriceType): number =>
    a.price_relativeUnits - b.price_relativeUnits;
const sortPriceDescending = (a: PriceType, b: PriceType): number =>
    b.price_relativeUnits - a.price_relativeUnits;
const sortByPrice = (sortBy: string) =>
    sortBy === sortPriceOptions.asc ? sortPriceAscending : sortPriceDescending;

const filterFoilOnly = (p: PriceType): boolean => p.isFoil;
const filterNonFoilOnly = (p: PriceType): boolean => !p.isFoil;
const maybeFilterFoils = (filterBy: string) => {
    switch (filterBy) {
        case filterFoilsOptions.foil:
            return filterFoilOnly;
        case filterFoilsOptions.nonFoil:
            return filterNonFoilOnly;
        default:
            return () => true;
    }
};

const samePrice = (a: PriceType, b: PriceType): boolean =>
    a.seller === b.seller &&
    a.title === b.title &&
    a.subtitle === b.subtitle &&
    a.expansion === b.expansion;

class PricesStore {

    sellers: SellerType[] = configureSellers();
    // discoveredPrices: PriceType[] = dummyPrices;
    discoveredPrices: PriceType[] = [];
    bookmarkedPrices: PriceType[] = [];
    sortPriceBy: string = sortPriceOptions.asc;
    filterFoilsBy: string = filterFoilsOptions.all;

    constructor() {
        makeAutoObservable(this);

        makePersistable(this, {
            name: 'ctmPricesStore',
            properties: [
                'sellers',
                'bookmarkedPrices',
                'sortPriceBy',
                'filterFoilsBy'
            ],
            storage: AsyncStorage
        }).then(() => console.log('hydrated store'));
    }

    get activeSellers(): SellerType[] {
        return this.sellers.filter((s) => s.enabled);
    }

    get sortedPrices(): PriceType[] {
        return this.discoveredPrices
            .slice()
            .filter(({ seller }) => this.isActiveSeller(seller))
            .filter(maybeFilterFoils(this.filterFoilsBy))
            .sort(sortByPrice(this.sortPriceBy));
    }

    get sortedBookmarks(): PriceType[] {
        return this.bookmarkedPrices
            .slice()
            .sort(sortByPrice(this.sortPriceBy))
            .sort(sortBySeller);
    }

    isActiveSeller = (seller: string) => {
        return this.sellers.find(({ name }) => name === seller)?.enabled;
    };

    search = (searchTerm: string) : void => {
        this.clearResults();
        this.activeSellers.forEach(({ name }) => getPrices(name, searchTerm).then(this.addPrices));
    }

    clearResults = (): void => {
        this.discoveredPrices = [];
    };

    addPrices = (pricesToAdd: PriceType[]): void => {
        this.discoveredPrices = [...this.discoveredPrices, ...pricesToAdd];
    };

    addBookmarks = (bookmarksToAdd: PriceType[]): void => {
        const updatedBookmarks = [...this.bookmarkedPrices, ...bookmarksToAdd];
        this.bookmarkedPrices = updatedBookmarks;
    };

    deleteBookmark = (bookmarkToDelete: PriceType): void => {
        const updatedBookmarks = this.bookmarkedPrices.filter(
            (p) => !samePrice(p, bookmarkToDelete)
        );
        this.bookmarkedPrices = updatedBookmarks;
    };

    isBookmarked = (maybeBookmarked: PriceType): boolean => {
        return this.bookmarkedPrices.some((b) => samePrice(b, maybeBookmarked));
    };

    setSortPriceBy = (sortBy: string): void => {
        this.sortPriceBy = sortBy;
    };

    setFilterFoilsBy = (filterBy: string): void => {
        this.filterFoilsBy = filterBy;
    };

    toggleSellerEnabled = (sellerName: string): void => {
        this.sellers = this.sellers.map((s) => {
            let { enabled, name } = s;
            if (name === sellerName) enabled = !enabled;
            return {
                ...s,
                enabled
            };
        });
    };
}

export const pricesStore = new PricesStore();
