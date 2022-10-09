class NetworkManager {

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
        shortname: "ethereum",
        fullName: "Ethereum",
        logoIcon: "ipfs://heeeelo",
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

    static networks: Network[] = [
        NetworkManager.ethMainnet,
        NetworkManager.polygon,
        NetworkManager.optimism
    ]
    
}

interface Network {
    chainID: number
    shortname: string
    fullName: string
    logoIcon: string
    nativeTokenName: string,
    rpc: string
}