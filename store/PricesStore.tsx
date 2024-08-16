import { makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PriceType from '../types/PriceType';
import SellerType from '../types/SellerType';
import { configureSellers, filterFoilsOptions, sortPriceOptions } from '../utils/utils';
import { getPrices } from '../gateway/http';


const samePrice = (a: PriceType, b: PriceType): boolean => a.productRef === b.productRef;

const sortBySeller = (a: PriceType, b: PriceType) => a.seller.localeCompare(b.seller);
const sortPriceAscending = (a: PriceType, b: PriceType): number => a.price_relativeUnits - b.price_relativeUnits;
const sortPriceDescending = (a: PriceType, b: PriceType): number => b.price_relativeUnits - a.price_relativeUnits;
const sortByPrice = (sortBy: string) => sortBy === sortPriceOptions.asc ? sortPriceAscending : sortPriceDescending;

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


class PricesStore {

    sellers: SellerType[] = [];
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
        }).then(() => {
            setTimeout(() => {
                // there appears to be a race condition with AsyncStorage
                // which prevents updating the info from working correctly without a delay
                this.updateSellerInfo();
                console.log('Hydrated store');
            }, (250));
        });
    }

    searchForPrices = (searchTerm: string): void => {
        this.clearResults();
        this.activeSellers.forEach(({ name }) => {
            this.setSellerLoading(name, true);

            getPrices(name, searchTerm).then((prices) => {
                this.setSellerLoading(name, false);
                this.addPrices(prices)
            });
        });
    }

    get activeSellers(): SellerType[] { return this.sellers.filter((s) => s.enabled); }

    get sellersLoadingCount() { return this.sellers.filter(({ loading }) => loading).length; }

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

    setSellerLoading = (targetSellerName: string, setLoading: boolean) => {
        this.sellers = this.sellers.map((s) => {
            let { name, loading } = s;
            if (name === targetSellerName) loading = setLoading;
            return {
                ...s,
                loading,
            };
        });
    };

    findSellerFromName = (targetSellerName: string) => this.sellers.find(({ name }) => name === targetSellerName);

    updateSellerInfo = () => {
        console.log('Loading seller info');

        let updatedSellerInfo: SellerType[] = [];
        const newSellerInfo = configureSellers();

        const findNewInfo = (targetSellerName: string): SellerType | undefined =>
            newSellerInfo.find(({ name }) => name === targetSellerName);

        // remove deleted sellers
        // remove bookmarks for deleted sellers
        updatedSellerInfo = this.sellers.filter(({ name }) => {
            // check if old seller still exists in new seller info
            const updatedSeller = findNewInfo(name);

            // keep seller if still exists in new info
            if (updatedSeller) return true;

            // else discard seller AND delete all bookmarks for it
            this.bookmarkedPrices = this.bookmarkedPrices.filter(({ seller }) => seller !== name);
            return false;
        });

        // update existing sellers
        updatedSellerInfo = updatedSellerInfo.map(s => {
            // if seller has new info, update logo
            // else return same info
            const foundSeller = findNewInfo(s.name);
            return foundSeller ? {
                ...s,
                logo: foundSeller.logo,
            } : s;
        });

        // add new sellers
        newSellerInfo.forEach(s => {
            if (!this.findSellerFromName(s.name)) {
                updatedSellerInfo = updatedSellerInfo.concat(s);
            }
        });

        // sort selers alphabetically
        updatedSellerInfo.sort((a, b) => a.name.localeCompare(b.name));

        // set updated sellers
        this.sellers = updatedSellerInfo;
    }
}

export const pricesStore = new PricesStore();
