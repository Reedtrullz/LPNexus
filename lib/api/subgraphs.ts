const SUBGRAPH_URLS: Record<string, string> = {
  ethereum: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3",
  arbitrum: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3-arbitrum-one",
  base: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3-base",
  optimism: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3-optimism",
  polygon: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3-polygon",
  bsc: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3-bsc",
  avalanche: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3-avalanche",
};

const GRAPH_API_KEY = process.env.NEXT_PUBLIC_THEGRAPH_API_KEY;

function getSubgraphUrl(chain: string): string {
  const baseUrl = SUBGRAPH_URLS[chain] || SUBGRAPH_URLS.ethereum;
  if (GRAPH_API_KEY) {
    return `https://gateway.thegraph.com/api/${GRAPH_API_KEY}/subgraphs/id/${chain === 'ethereum' ? '5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV' : 'DqwDgw7xAVjSXLt6XLy6VcwwqJPwS5Q6jY3w7xAVjSXL'}`;
  }
  return baseUrl;
}

export interface SubgraphPosition {
  id: string;
  token0: {
    id: string;
    symbol: string;
    decimals: string;
  };
  token1: {
    id: string;
    symbol: string;
    decimals: string;
  };
  feeTier: string;
  liquidity: string;
  tickLower: string;
  tickUpper: string;
  pool: {
    tick: string;
    sqrtPrice: string;
    token0Price: string;
    token1Price: string;
  };
}

export async function fetchUniswapV3Positions(
  owner: string,
  chain: string
): Promise<SubgraphPosition[]> {
  const query = `
    query Positions($owner: Bytes!) {
      positions(where: {owner: $owner, liquidity_gt: "0"}) {
        id
        token0 { id symbol decimals }
        token1 { id symbol decimals }
        feeTier
        liquidity
        tickLower
        tickUpper
        pool { tick sqrtPrice token0Price token1Price }
      }
    }
  `;

  const endpoint = getSubgraphUrl(chain);

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query,
        variables: { owner: owner.toLowerCase() },
      }),
    });

    if (!res.ok) {
      throw new Error(`Subgraph error: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();
    return json.data?.positions || [];
  } catch (error) {
    console.error(`Failed to fetch positions for ${chain}:`, error);
    return [];
  }
}

export async function fetchAllChainPositions(
  owner: string,
  chains: string[]
): Promise<Record<string, SubgraphPosition[]>> {
  const results: Record<string, SubgraphPosition[]> = {};

  await Promise.all(
    chains.map(async (chain) => {
      const positions = await fetchUniswapV3Positions(owner, chain);
      results[chain] = positions;
    })
  );

  return results;
}
