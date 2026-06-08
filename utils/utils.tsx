import axionLogo from '../assets/axion-150x60.png';
import boardsAndSwordsLogo from '../assets/boardsAndSwords 5to2.png';
import diceSaloonLogo from '../assets/diceSaloonSingles 500x200.png';
import gameHQLogo from '../assets/gameHQ 250x100.png';
import gatheringPoingLogo from '../assets/gatheringPointGames 450x180.png';
import harlequinsLogo from '../assets/harlequins-150x60.png';
import highlanderGamesLogo from '../assets/highlanderGames 5to2 b.png';
import londonMagicLogo from '../assets/londonMagicTraders-150x60.png';
import lvlUpLogo from '../assets/lvlUp-150x60.png';
import magicCardTraderLogo from '../assets/magicCardTrader-150x60.png';
import magicMadhouseLogo from '../assets/magicMadhouse-150x60.png';
import manaGamingLogo from '../assets/manaGaming 150x60.png';
import manaleakLogo from '../assets/manaLeak-150x60.png';
import pgLeedsLogo from '../assets/patriotGamesLeeds-150x60.png';
import skywardFireLogo from '../assets/skywardFire 580x232.png';
import starCityGamesLogo from '../assets/starCityGames-150x60.png';
import totalCardsLogo from '../assets/totalCards 500x200.png';
import trollLogo from '../assets/trollTrader-150x60.png';

import { ImageSourcePropType } from 'react-native';
import SellerType from '../types/SellerType';

export const currency = {
    EUR: { representation: '€', decimalPlaces: 2, conversionFactor: 1 },
    GBP: { representation: '£', decimalPlaces: 2, conversionFactor: 1 },
    JPY: { representation: '¥', decimalPlaces: 0, conversionFactor: 1 },
    USD: { representation: '$', decimalPlaces: 2, conversionFactor: 1 }
};

const sellers = {
    axion: {
        name: 'Axion Now',
        logo: axionLogo,
        currency: currency.GBP,
        region: 'UK',
    },
    boardsAndSwords: {
        name: 'Boards & Swords',
        logo: boardsAndSwordsLogo,
        currency: currency.GBP,
        region: 'UK',
    },
    diceSaloon: {
        name: 'Dice Saloon',
        logo: diceSaloonLogo,
        currency: currency.GBP,
        region: 'UK',
    },
    gameHQ: {
        name: 'Game HQ',
        logo: gameHQLogo,
        currency: currency.GBP,
        region: 'UK',
    },
    gatheringPoint: {
        name: 'Gathering Point Games',
        logo: gatheringPoingLogo,
        currency: currency.GBP,
        region: 'UK',
    },
    harlequins: {
        name: 'Harlequins',
        logo: harlequinsLogo,
        currency: currency.GBP,
        region: 'UK',
    },
    highlanderGames: {
        name: 'Highlander Games',
        logo: highlanderGamesLogo,
        currency: currency.GBP,
        region: 'UK',
    },
    londonMagic: {
        name: 'London Magic Traders',
        logo: londonMagicLogo,
        currency: currency.GBP,
        region: 'UK',
    },
    lvlUp: {
        name: 'Lvl Up Gaming',
        logo: lvlUpLogo,
        currency: currency.GBP,
        region: 'UK',
    },
    magicCardTrader: {
        name: 'Magic Card Trader',
        logo: magicCardTraderLogo,
        currency: currency.GBP,
        region: 'UK',
    },
    magicMadhouse: {
        name: 'Magic Madhouse',
        logo: magicMadhouseLogo,
        currency: currency.GBP,
        region: 'UK',
    },
    manaGaming: {
        name: 'Mana Gaming',
        logo: manaGamingLogo,
        currency: currency.GBP,
        region: 'UK',
    },
    manaLeak: {
        name: 'Manaleak',
        logo: manaleakLogo,
        currency: currency.GBP,
        region: 'UK',
    },
    pgLeeds: {
        name: 'Patriot Games Leeds',
        logo: pgLeedsLogo,
        currency: currency.GBP,
        region: 'UK',
    },
    skywardFire: {
        name: 'Skyward Fire',
        logo: skywardFireLogo,
        currency: currency.GBP,
        region: 'UK',
    },
    totalCards: {
        name: 'Total Cards',
        logo: totalCardsLogo,
        currency: currency.GBP,
        region: 'UK',
    },
    trollTrader: {
        name: 'Troll Trader',
        logo: trollLogo,
        currency: currency.GBP,
        region: 'UK',
    },

    // Non-UK

    starCityGames: {
        name: 'Star City Games',
        logo: starCityGamesLogo,
        currency: currency.USD,
        region: 'International',
    },
};

export const configureSellers = (): SellerType[] => {
    return Object.values(sellers).map(
        (seller): SellerType => ({ ...seller, enabled: true, favourite: false, loading: false })
    );
};

export const getLogoForSeller = (sellerName: string): ImageSourcePropType => {
    return Object.values(sellers).filter((s) => s.name === sellerName)[0].logo;
};

export const filterFoilsOptions = {
    all: 'All',
    foil: 'Foil',
    nonFoil: 'Non-Foil'
};

export const sortPriceOptions = {
    asc: 'Ascending',
    dsc: 'Descending'
};
// ↑ ↓
