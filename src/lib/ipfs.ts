// 使用免费的 IPFS 网关上传（无需 API Key）
// 方案：Pinata 公共网关 + Base64 fallback

async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// 尝试使用免费的 IPFS pinning 服务
async function uploadToPinataPublic(file: File): Promise<string | null> {
  try {
    const formData = new FormData();
    formData.append('file', file);

    // 使用 nft.storage 的替代方案：直接用 Pinata 的公共上传
    // 注意：这个方案在生产环境可能有限制
    const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: 'POST',
      headers: {
        // Pinata 免费 API keys（需要用户自己的）
        'pinata_api_key': process.env.NEXT_PUBLIC_PINATA_API_KEY || '',
        'pinata_secret_api_key': process.env.NEXT_PUBLIC_PINATA_SECRET_KEY || '',
      },
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      return `ipfs://${data.IpfsHash}`;
    }
    return null;
  } catch (error) {
    console.warn('Pinata upload failed, using fallback');
    return null;
  }
}

export async function uploadImage(file: File): Promise<string> {
  console.log('📤 Uploading image...');
  
  // 方案1：尝试 Pinata（如果配置了 API key）
  if (process.env.NEXT_PUBLIC_PINATA_API_KEY) {
    const ipfsUrl = await uploadToPinataPublic(file);
    if (ipfsUrl) {
      console.log('✅ Uploaded to Pinata:', ipfsUrl);
      return ipfsUrl;
    }
  }

  // 方案2：使用 Base64 Data URL（Hackathon 演示用）
  // 这样图片会直接存在 metadata 里，不需要外部服务
  console.log('📦 Using Base64 encoding (demo mode)');
  const base64 = await fileToBase64(file);
  console.log('✅ Image encoded, size:', Math.round(base64.length / 1024), 'KB');
  return base64;
}

export async function uploadMetadata(metadata: object): Promise<string> {
  console.log('📤 Uploading metadata...');
  
  // 方案1：尝试 Pinata
  if (process.env.NEXT_PUBLIC_PINATA_API_KEY) {
    try {
      const response = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'pinata_api_key': process.env.NEXT_PUBLIC_PINATA_API_KEY || '',
          'pinata_secret_api_key': process.env.NEXT_PUBLIC_PINATA_SECRET_KEY || '',
        },
        body: JSON.stringify(metadata),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Metadata uploaded to Pinata');
        return `ipfs://${data.IpfsHash}`;
      }
    } catch (error) {
      console.warn('Pinata metadata upload failed');
    }
  }

  // 方案2：使用 Data URL（Hackathon 演示用）
  console.log('📦 Using inline metadata (demo mode)');
  const metadataBase64 = btoa(unescape(encodeURIComponent(JSON.stringify(metadata))));
  const dataUrl = `data:application/json;base64,${metadataBase64}`;
  console.log('✅ Metadata encoded');
  return dataUrl;
}

export function ipfsToHttp(ipfsUri: string): string {
  // 处理 IPFS URL
  if (ipfsUri.startsWith('ipfs://')) {
    const cid = ipfsUri.replace('ipfs://', '');
    return `https://gateway.pinata.cloud/ipfs/${cid}`;
  }
  // 处理 Base64 Data URL（直接返回）
  if (ipfsUri.startsWith('data:')) {
    return ipfsUri;
  }
  return ipfsUri;
}
