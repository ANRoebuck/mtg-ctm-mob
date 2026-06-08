import { ImageSourcePropType } from 'react-native';

type SellerType = {
    name: string;
    logo: ImageSourcePropType;
    currency: {};
    region: string;
    enabled: boolean;
    favourite: boolean;
    loading: boolean;
};

export default SellerType;
