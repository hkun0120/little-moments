import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import {
  createNft,
  mplTokenMetadata,
} from '@metaplex-foundation/mpl-token-metadata';
import {
  generateSigner,
  percentAmount,
} from '@metaplex-foundation/umi';
import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters';
import { WalletContextState } from '@solana/wallet-adapter-react';

// Devnet RPC endpoint
const DEVNET_RPC = 'https://api.devnet.solana.com';

export interface MintResult {
  success: boolean;
  signature?: string;
  mintAddress?: string;
  error?: string;
}

export async function mintMemoryNFT(
  wallet: WalletContextState,
  metadataUri: string,
  name: string
): Promise<MintResult> {
  try {
    console.log('🚀 Starting mint process...');
    console.log('📍 Wallet:', wallet.publicKey?.toString());
    console.log('📝 Metadata URI:', metadataUri);
    console.log('📛 Name:', name);

    if (!wallet.publicKey) {
      return { success: false, error: 'Wallet not connected' };
    }

    if (!wallet.signTransaction) {
      return { success: false, error: 'Wallet does not support signing' };
    }

    // Create Umi instance with explicit devnet RPC
    console.log('🔗 Connecting to Devnet...');
    const umi = createUmi(DEVNET_RPC)
      .use(mplTokenMetadata())
      .use(walletAdapterIdentity(wallet));

    // Generate mint address
    const mint = generateSigner(umi);
    console.log('🔑 Generated mint address:', mint.publicKey.toString());

    // Create the NFT
    console.log('⏳ Creating NFT transaction...');
    const { signature } = await createNft(umi, {
      mint,
      name,
      uri: metadataUri,
      sellerFeeBasisPoints: percentAmount(0), // No royalties - not for trading
      symbol: 'MOMENT',
      isMutable: false, // Immutable - true record
    }).sendAndConfirm(umi, {
      confirm: { commitment: 'confirmed' },
    });

    // Convert signature to string
    const signatureStr = Buffer.from(signature).toString('base64');
    console.log('✅ NFT Minted! Signature:', signatureStr);

    return {
      success: true,
      signature: signatureStr,
      mintAddress: mint.publicKey.toString(),
    };
  } catch (error: any) {
    console.error('❌ Minting error:', error);
    
    // 提取更详细的错误信息
    let errorMessage = 'Failed to mint NFT';
    
    if (error.message) {
      errorMessage = error.message;
    }
    
    // 检查常见错误
    if (error.message?.includes('insufficient funds') || error.message?.includes('Insufficient')) {
      errorMessage = '余额不足 / Insufficient SOL balance. Please get SOL from faucet.solana.com';
    } else if (error.message?.includes('blockhash')) {
      errorMessage = '网络超时，请重试 / Network timeout, please try again';
    } else if (error.message?.includes('User rejected')) {
      errorMessage = '用户取消了交易 / User rejected the transaction';
    } else if (error.message?.includes('WalletSignTransactionError')) {
      errorMessage = '钱包签名失败，请确保 Phantom 已切换到 Devnet / Wallet signing failed. Make sure Phantom is on Devnet';
    }
    
    return {
      success: false,
      error: errorMessage,
    };
  }
}

export async function fetchUserNFTs(walletAddress: string): Promise<any[]> {
  // For MVP demo, we'll store minted NFTs in localStorage
  // In production, this would query the blockchain
  try {
    const stored = localStorage.getItem(`memories_${walletAddress}`);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function saveMemoryLocally(walletAddress: string, memory: any): void {
  try {
    const existing = localStorage.getItem(`memories_${walletAddress}`);
    const memories = existing ? JSON.parse(existing) : [];
    memories.unshift(memory);
    localStorage.setItem(`memories_${walletAddress}`, JSON.stringify(memories));
  } catch (error) {
    console.error('Error saving memory locally:', error);
  }
}
