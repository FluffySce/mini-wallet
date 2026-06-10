export type Transaction = {
  id: number;

  sender_wallet_id: number;
  receiver_wallet_id: number;

  amount: number;

  type: string;
  status: string;

  description: string;

  created_at: string;
};
