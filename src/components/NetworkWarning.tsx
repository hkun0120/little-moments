'use client';

import { FC, useState, useEffect } from 'react';
import { useConnection } from '@solana/wallet-adapter-react';
import { useI18n } from './I18nProvider';

export const NetworkWarning: FC = () => {
  const { connection } = useConnection();
  const { locale } = useI18n();
  const [isMainnet, setIsMainnet] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // 检查连接的 RPC 是否是主网
    const endpoint = connection.rpcEndpoint;
    const isMainnetEndpoint = 
      endpoint.includes('mainnet') || 
      endpoint.includes('api.mainnet-beta.solana.com') ||
      (!endpoint.includes('devnet') && !endpoint.includes('testnet') && !endpoint.includes('localhost'));
    
    setIsMainnet(isMainnetEndpoint);
  }, [connection]);

  if (!isMainnet || dismissed) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50 animate-slide-up">
      <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-4 shadow-lg">
        <div className="flex items-start space-x-3">
          <span className="text-2xl">⚠️</span>
          <div className="flex-1">
            <h3 className="font-bold text-yellow-800">
              {locale === 'zh' ? '请切换到 Devnet 测试网' : 'Please switch to Devnet'}
            </h3>
            <p className="text-sm text-yellow-700 mt-1">
              {locale === 'zh' 
                ? '您的 Phantom 钱包当前连接的是主网。请在钱包设置中切换到 Devnet 以免消耗真实 SOL。'
                : 'Your Phantom wallet is connected to Mainnet. Please switch to Devnet in wallet settings to avoid spending real SOL.'
              }
            </p>
            <div className="mt-3 flex flex-col space-y-2">
              <div className="text-xs text-yellow-600 bg-yellow-100 rounded-lg p-2">
                <strong>{locale === 'zh' ? '步骤：' : 'Steps:'}</strong>
                <ol className="list-decimal ml-4 mt-1">
                  <li>{locale === 'zh' ? '打开 Phantom 钱包' : 'Open Phantom wallet'}</li>
                  <li>{locale === 'zh' ? '点击左上角设置 ⚙️' : 'Click settings ⚙️'}</li>
                  <li>{locale === 'zh' ? '开发者设置 → 切换到 Devnet' : 'Developer Settings → Switch to Devnet'}</li>
                </ol>
              </div>
              <a
                href="https://faucet.solana.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 underline hover:text-blue-800"
              >
                🚰 {locale === 'zh' ? '获取免费测试 SOL' : 'Get free test SOL'}
              </a>
            </div>
          </div>
          <button 
            onClick={() => setDismissed(true)}
            className="text-yellow-500 hover:text-yellow-700"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};
