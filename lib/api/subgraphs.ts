const SUBGRAPH_URLS: Record<string, string> = {
  ethereum:
    "https://gateway.thegraph.com/api/subgraphs/id/5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV",
  arbitrum:
    "https://gateway.thegraph.com/api/subgraphs/id/5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV",
  base: "https://gateway.thegraph.com/api/subgraphs/id/5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV",
  optimism:
    "https://gateway.thegraph.com/api/subgraphs/id/5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV",
  polygon:
    "https://gateway.thegraph.com/api/subgraphs/id/5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV",
  bsc: "https://gateway.thegraph.com/api/subgraphs/id/5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV",
  avalanche:
    "https://gateway.thegraph.com/api/subgraphs/id/5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV",
};

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

  const endpoint = SUBGRAPH_URLS[chain] || SUBGRAPH_URLS.ethereum;

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
