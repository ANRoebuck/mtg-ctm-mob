import axionLogo from '../assets/axion-150x60.png';
import bigOrbitLogo from '../assets/bigOrbitCards-150x60.png';
import chaosLogo from '../assets/chaosCards-150x60.png';
import harlequinsLogo from '../assets/harlequins-150x60.png';
import hareruyaLogo from '../assets/hareryua-150x60.png';
import lazyDragonLogo from '../assets/lazyDragonGaming-150x60.jpg';
import londonMagicLogo from '../assets/londonMagicTraders-150x60.png';
import lvlUpLogo from '../assets/lvlUp-150x60.png';
import magicCardTraderLogo from '../assets/magicCardTrader-150x60.png';
import magicMadhouseLogo from '../assets/magicMadhouse-150x60.png';
import manaleakLogo from '../assets/manaLeak-150x60.png';
import mkmLogo from '../assets/mkm-150x60.png';
import mountBattenLogo from '../assets/mountBatten-150x60.png';
import nerdShakLogo from '../assets/nerdShak-150x60.jpg';
import pgLeedsLogo from '../assets/patriotGamesLeeds-150x60.png';
import starCityGamesLogo from '../assets/starCityGames-150x60.png';
import trollLogo from '../assets/trollTrader-150x60.png';
import unionCountyLogo from '../assets/unionCountyGames-150x60.png';

export const currency = {
    EUR: { representation: '€', decimalPlaces: 2, conversionFactor: 1, },
    GBP: { representation: '£', decimalPlaces: 2, conversionFactor: 1, },
    JPY: { representation: '¥', decimalPlaces: 0, conversionFactor: 1, },
    USD: { representation: '$', decimalPlaces: 2, conversionFactor: 1, },
}

export const sellers = {
    axion: {
        name: 'Axion Now',
        logo: axionLogo,
        currency: currency.GBP,
    },
    bigOrbit: {
        name: 'Big Orbit Cards',
        logo: bigOrbitLogo,
        currency: currency.GBP,
    },
    chaos: {
        name: 'Chaos Cards',
        logo: chaosLogo,
        currency: currency.GBP,
    },
    hareruya: {
        name: 'Hareruya',
        logo: hareruyaLogo,
        currency: currency.GBP,
    },
    harlequins: {
        name: 'Harlequins',
        logo: harlequinsLogo,
        currency: currency.GBP,
    },
    lazyDragon : {
        name: 'Lazy Dragon Gaming',
        logo: lazyDragonLogo,
        currency: currency.GBP,
    },
    lvlUp: {
        name: 'Lvl Up Gaming',
        logo: lvlUpLogo,
        currency: currency.GBP,
    },
    londonMagic: {
        name: 'London Magic Traders',
        logo: londonMagicLogo,
        currency: currency.GBP,
    },
    magicCardTrader: {
        name: 'Magic Card Trader',
        logo: magicCardTraderLogo,
        currency: currency.GBP,
    },
    magicMadhouse: {
        name: 'Magic Madhouse',
        logo: magicMadhouseLogo,
        currency: currency.GBP,
    },
    manaLeak: {
        name: 'Manaleak',
        logo: manaleakLogo,
        currency: currency.GBP,
    },
    mkm: {
        name: 'Magic Card Market',
        logo: mkmLogo,
        currency: currency.EUR,
    },
    mountBatten: {
        name: 'Mountbatten Collectables',
        logo: mountBattenLogo,
        currency: currency.GBP,
    },
    nerdShak: {
        name: 'Nerd Shak',
        logo: nerdShakLogo,
        currency: currency.GBP,
    },
    pgLeeds: {
        name: 'Patriot Games Leeds',
        logo: pgLeedsLogo,
        currency: currency.GBP,
    },
    unionCounty: {
        name: 'Union County Games',
        logo: unionCountyLogo,
        currency: currency.GBP,
    },

    // Non-UK

    starCityGames: {
        name: 'Star City Games',
        logo: starCityGamesLogo,
        currency: currency.USD,
    },
    trollTrader: {
        name: 'Troll Trader',
        logo: trollLogo,
        currency: currency.JPY,
    },
};

export const getLogoForSeller = (sellerName: string) => {
    return Object.values(sellers).filter(s => s.name === sellerName)[0].logo;
}

export const sortOosBy = {
    last : 'Last',
    exclude : 'Exclude',
    none : 'Don\'t sort',
};

export const filterFoilsBy = {
    all: 'All',
    foil: 'Foil',
    nonFoil: 'Non-Foil',
};

export const sortPriceBy = {
    asc: 'Ascending',
    dsc: 'Descending',
};
// ↑ ↓
