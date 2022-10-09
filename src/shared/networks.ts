export enum ChainID {
    Mainnet = 1,
    Polygon = 137,
    Optimism = 10,
    Mumbai = 80001
}

export class NetworkManager {

    private static ethMainnet: Network = {
        chainID: 1,
        shortname: "ethereum",
        fullName: "Ethereum",
        logoIcon: "ipfs://heeeelo",
        nativeTokenName: "ETH",
        rpc: 'https://rpc.ankr.com/eth'
    }

    private static polygon: Network = {
        chainID: 137,
        shortname: "polygon",
        fullName: "Polygon",
        logoIcon: "https://cdn.iconscout.com/icon/free/png-256/polygon-token-4086725-3379855.png",
        nativeTokenName: "MATIC",
        rpc: 'https://matic-mainnet.chainstacklabs.com'
    }

    private static optimism: Network = {
        chainID: 10,
        shortname: "optimism",
        fullName: "Optimsm",
        logoIcon: "ipfs://heeeelo",
        nativeTokenName: "MATIC",
        rpc: 'https://mainnet.optimism.io'
    }

    private static mumbai: Network = {
        chainID: 80001,
        shortname: "mumbai",
        fullName: "Mumbai Testnet",
        logoIcon: "https://seeklogo.com/images/P/polygon-matic-logo-1DFDA3A3A8-seeklogo.com.png",
        nativeTokenName: "MATIC",
        rpc: 'https://rpc.ankr.com/polygon_mumbai'
    }

    static networks: {[key: number]: Network} = {
        [ChainID.Mainnet] : NetworkManager.ethMainnet,
        [ChainID.Polygon] : NetworkManager.polygon,
        [ChainID.Optimism]: NetworkManager.optimism,
        [ChainID.Mumbai]: NetworkManager.mumbai
    }
    
}

export interface Network {
    chainID: number
    shortname: string
    fullName: string
    logoIcon: string
    nativeTokenName: string,
    rpc: string
}