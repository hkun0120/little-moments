// 国际化配置 - 中英文切换
export type Locale = 'zh' | 'en';

export interface Translations {
  // 通用
  common: {
    connectWallet: string;
    back: string;
    loading: string;
    error: string;
    success: string;
    confirm: string;
    cancel: string;
  };
  
  // 导航/头部
  nav: {
    home: string;
    create: string;
    gallery: string;
    about: string;
  };
  
  // 首页
  home: {
    title: string;
    subtitle: string;
    description: string;
    startButton: string;
    viewGallery: string;
    tagline: string;
    features: {
      emotion: { title: string; desc: string };
      permanent: { title: string; desc: string };
      private: { title: string; desc: string };
    };
  };
  
  // 创建页面
  create: {
    title: string;
    uploadTitle: string;
    uploadDesc: string;
    formTitle: string;
    formDesc: string;
    previewTitle: string;
    mintButton: string;
    minting: string;
  };
  
  // 表单
  form: {
    myFeeling: string;
    myFeelingDesc: string;
    myFeelingPlaceholder: string;
    myFeelingNote: string;
    childWords: string;
    childWordsDesc: string;
    childWordsPlaceholder: string;
    location: string;
    locationPlaceholder: string;
    childAge: string;
    childAgePlaceholder: string;
    context: string;
    contextDesc: string;
    contextPlaceholder: string;
    previewMint: string;
  };
  
  // 图片上传
  upload: {
    dragDrop: string;
    or: string;
    browse: string;
    supportedFormats: string;
    changeImage: string;
  };
  
  // AI 分析
  ai: {
    analyzing: string;
    analyzingDesc: string;
    title: string;
    artworkDesc: string;
    childPerspective: string;
    memoryAnchors: string;
    memoryAnchorsDesc: string;
    emotionPrompts: string;
    emotionPromptsDesc: string;
    writeNow: string;
    writeNowDesc: string;
  };
  
  // 铸造成功
  success: {
    title: string;
    subtitle: string;
    memoryPreserved: string;
    viewOnChain: string;
    createAnother: string;
    backToGallery: string;
  };
  
  // 画廊
  gallery: {
    title: string;
    subtitle: string;
    empty: string;
    emptyDesc: string;
    viewDetails: string;
    mintAddress: string;
    recordedAt: string;
  };
  
  // 网络
  network: {
    devnet: string;
    devnetNote: string;
    getFreeSOL: string;
  };
  
  // 钱包
  wallet: {
    connect: string;
    connectDesc: string;
    connected: string;
    disconnect: string;
  };
}

export const translations: Record<Locale, Translations> = {
  zh: {
    common: {
      connectWallet: '连接钱包',
      back: '返回',
      loading: '加载中...',
      error: '出错了',
      success: '成功',
      confirm: '确认',
      cancel: '取消',
    },
    nav: {
      home: '首页',
      create: '创建记忆',
      gallery: '记忆画廊',
      about: '关于',
    },
    home: {
      title: '童画记',
      subtitle: 'Little Moments',
      description: '用区块链永久珍藏孩子的画作与你此刻的感受',
      startButton: '开始记录',
      viewGallery: '查看画廊',
      tagline: '用爱定格，让童年永恒',
      features: {
        emotion: { title: '情感优先', desc: '记录的不是画，是你看到画时的感受' },
        permanent: { title: '永久珍藏', desc: '区块链确保记忆永不丢失' },
        private: { title: '家庭私有', desc: '只属于你和孩子的珍贵时光' },
      },
    },
    create: {
      title: '创建一份记忆',
      uploadTitle: '上传画作',
      uploadDesc: '上传孩子的画作开始',
      formTitle: '记录你此刻的感受',
      formDesc: '这是记忆的核心——用你的话写下这一刻',
      previewTitle: '预览记忆',
      mintButton: '铸造记忆 NFT',
      minting: '正在创建记忆...',
    },
    form: {
      myFeeling: '我的感受',
      myFeelingDesc: '这是记忆的核心。看着这幅画，你此刻的心情是什么？',
      myFeelingPlaceholder: '她今天画画特别专注，我突然意识到她已经有了自己的小世界...',
      myFeelingNote: '✨ 这份真实的感受将被永久珍藏在区块链上',
      childWords: '孩子说了什么',
      childWordsDesc: '记录下孩子画这幅画时说的话',
      childWordsPlaceholder: '这是一个会飞的房子！',
      location: '地点',
      locationPlaceholder: '家里、美术课、奶奶家...',
      childAge: '孩子年龄',
      childAgePlaceholder: '5岁3个月',
      context: '当时的情境',
      contextDesc: '发生了什么？美术课后？特别的一天？',
      contextPlaceholder: '每周美术课后完成的作品',
      previewMint: '✨ 预览并铸造记忆 NFT',
    },
    upload: {
      dragDrop: '拖拽图片到这里',
      or: '或者',
      browse: '点击选择文件',
      supportedFormats: '支持 JPG、PNG、HEIC 格式',
      changeImage: '更换图片',
    },
    ai: {
      analyzing: 'AI 正在分析画作...',
      analyzingDesc: '理解色彩、构图和情感表达',
      title: 'AI 画作分析',
      artworkDesc: '画作描述',
      childPerspective: '孩子的视角',
      memoryAnchors: '这一刻的记忆锚点',
      memoryAnchorsDesc: '记录这些细节，让记忆更加鲜活',
      emotionPrompts: '情感反思提示',
      emotionPromptsDesc: '这些问题帮助你回忆和表达这一刻的感受',
      writeNow: '现在，用你自己的话写下这一刻的感受吧',
      writeNowDesc: '只有你真实的情感才能被永久珍藏',
    },
    success: {
      title: '🎉 记忆已永久珍藏！',
      subtitle: '这份感动将在区块链上永存',
      memoryPreserved: '记忆已保存',
      viewOnChain: '在链上查看',
      createAnother: '再创建一个',
      backToGallery: '返回画廊',
    },
    gallery: {
      title: '记忆画廊',
      subtitle: '你珍藏的每一份感动',
      empty: '还没有记忆',
      emptyDesc: '创建你的第一份记忆吧',
      viewDetails: '查看详情',
      mintAddress: '铸造地址',
      recordedAt: '记录于',
    },
    network: {
      devnet: '测试网',
      devnetNote: '当前在 Solana Devnet 测试网运行，可免费获取测试 SOL',
      getFreeSOL: '获取免费测试 SOL',
    },
    wallet: {
      connect: '连接钱包',
      connectDesc: '使用 Phantom 钱包连接',
      connected: '已连接',
      disconnect: '断开连接',
    },
  },
  en: {
    common: {
      connectWallet: 'Connect Wallet',
      back: 'Back',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      confirm: 'Confirm',
      cancel: 'Cancel',
    },
    nav: {
      home: 'Home',
      create: 'Create',
      gallery: 'Gallery',
      about: 'About',
    },
    home: {
      title: 'Little Moments',
      subtitle: '童画记',
      description: 'Preserve your child\'s artwork and your feelings forever on the blockchain',
      startButton: 'Start Recording',
      viewGallery: 'View Gallery',
      tagline: 'Capture love, preserve childhood forever',
      features: {
        emotion: { title: 'Emotion First', desc: 'Capture feelings, not just artwork' },
        permanent: { title: 'Forever Preserved', desc: 'Blockchain ensures memories never fade' },
        private: { title: 'Family Private', desc: 'Precious moments for you and your child' },
      },
    },
    create: {
      title: 'Create a Memory',
      uploadTitle: 'Upload Artwork',
      uploadDesc: 'Start by uploading your child\'s artwork',
      formTitle: 'Record Your Feelings',
      formDesc: 'This is the heart of the memory — write it in your own words',
      previewTitle: 'Preview Memory',
      mintButton: 'Mint Memory NFT',
      minting: 'Creating Memory...',
    },
    form: {
      myFeeling: 'My Feeling',
      myFeelingDesc: 'This is the heart of the memory. What do you feel when you see this artwork?',
      myFeelingPlaceholder: 'She was so focused today. I suddenly realized she has her own little world now...',
      myFeelingNote: '✨ This genuine feeling will be preserved forever on the blockchain',
      childWords: 'Child\'s Words',
      childWordsDesc: 'What did your child say about this artwork?',
      childWordsPlaceholder: 'This is a flying house!',
      location: 'Location',
      locationPlaceholder: 'Home, Art class, Grandma\'s...',
      childAge: 'Child\'s Age',
      childAgePlaceholder: '5 years 3 months',
      context: 'Context',
      contextDesc: 'What was happening? After art class? A special day?',
      contextPlaceholder: 'Finished after weekly art class',
      previewMint: '✨ Preview & Mint Memory NFT',
    },
    upload: {
      dragDrop: 'Drag and drop image here',
      or: 'or',
      browse: 'Click to browse',
      supportedFormats: 'Supports JPG, PNG, HEIC',
      changeImage: 'Change Image',
    },
    ai: {
      analyzing: 'AI is analyzing the artwork...',
      analyzingDesc: 'Understanding colors, composition, and emotional expression',
      title: 'AI Artwork Analysis',
      artworkDesc: 'Artwork Description',
      childPerspective: 'Child\'s Perspective',
      memoryAnchors: 'Memory Anchors',
      memoryAnchorsDesc: 'Record these details to make the memory more vivid',
      emotionPrompts: 'Reflection Prompts',
      emotionPromptsDesc: 'These questions help you recall and express your feelings',
      writeNow: 'Now, write your feelings in your own words',
      writeNowDesc: 'Only your genuine emotions can be preserved forever',
    },
    success: {
      title: '🎉 Memory Preserved Forever!',
      subtitle: 'This moment will live on the blockchain',
      memoryPreserved: 'Memory Saved',
      viewOnChain: 'View on Chain',
      createAnother: 'Create Another',
      backToGallery: 'Back to Gallery',
    },
    gallery: {
      title: 'Memory Gallery',
      subtitle: 'Every precious moment you\'ve preserved',
      empty: 'No memories yet',
      emptyDesc: 'Create your first memory',
      viewDetails: 'View Details',
      mintAddress: 'Mint Address',
      recordedAt: 'Recorded at',
    },
    network: {
      devnet: 'Devnet',
      devnetNote: 'Running on Solana Devnet. Get free test SOL to try.',
      getFreeSOL: 'Get Free Test SOL',
    },
    wallet: {
      connect: 'Connect Wallet',
      connectDesc: 'Connect with Phantom wallet',
      connected: 'Connected',
      disconnect: 'Disconnect',
    },
  },
};

export function getTranslations(locale: Locale): Translations {
  return translations[locale];
}
