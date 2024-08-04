export interface WalletBalance {
  error: null | Error | string;
  result: [
    {
      overall_balance: string;
      available_balance: string;
      block_height: number;
      tick: string;
    }
  ];
}

export interface TickerInfo {
  error: null | Error | string;
  result: {
    id: string;
    original_tick: string;
    tick: string;
    max_supply: string;
    decimals: number;
    limit_per_mint: string;
    remaining_supply: string;
    burned_supply: string;
    is_self_mint: boolean;
    deploy_inscription_id: string;
    block_height: number;
  };
}
