# 🎨 Little Moments | 童画记

> **This is not about NFTs. It's about preserving emotions.**

A Solana-based DApp that allows parents to create lasting, immutable records of their children's artwork and the emotions felt in that moment. Forever anchored on the blockchain.

![Little Moments Banner](https://via.placeholder.com/1200x400/fef7ee/ed751b?text=Little+Moments+%7C+童画记)

## 🌟 What Makes This Special

Unlike typical NFT projects focused on trading and speculation, Little Moments is designed for **emotional preservation**:

- **💝 Emotion-First**: The `parent_feeling` field is the core value, not the image
- **⏰ Time-Anchored**: Each memory is timestamped immutably on Solana
- **🔒 Non-Tradable by Design**: These are personal family treasures, not assets
- **💰 Accessible**: Solana's low fees (~$0.001) make memory preservation natural

## 🎯 Hackathon Track

**Consumer & Entertainment** - Building tools that create meaningful experiences for families.

## 📸 Screenshots

### Home Page
![Home](https://via.placeholder.com/600x400/fffbf5/ed751b?text=Home+Page)

### Create Memory Flow
![Create](https://via.placeholder.com/600x400/fffbf5/ed751b?text=Create+Memory)

### Memory Gallery
![Gallery](https://via.placeholder.com/600x400/fffbf5/ed751b?text=Gallery)

## ⚡ Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Phantom Wallet (browser extension)
- Some SOL on Devnet (use [Solana Faucet](https://faucet.solana.com/))

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/little-moments.git
cd little-moments

# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

```env
# Optional: NFT.Storage API Token for IPFS uploads
# Get one free at https://nft.storage
NEXT_PUBLIC_NFT_STORAGE_TOKEN=your_token_here

# Network (devnet for demo)
NEXT_PUBLIC_SOLANA_NETWORK=devnet
```

## 🏗️ Architecture

```
┌──────────────────────────────────────────┐
│                Frontend                   │
│           (Next.js + React)              │
└────────────────┬─────────────────────────┘
                 │
    ┌────────────┴────────────┐
    │                         │
    ▼                         ▼
┌───────────┐          ┌──────────────┐
│   IPFS    │          │   Solana     │
│ (Images + │          │   Devnet     │
│ Metadata) │          │  (NFT Mint)  │
└───────────┘          └──────────────┘
```

### Tech Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **Blockchain**: Solana (Devnet), Metaplex NFT Standard
- **Wallet**: Solana Wallet Adapter (Phantom)
- **Storage**: IPFS via NFT.Storage
- **Styling**: Tailwind CSS with custom warm color palette

## 📦 Project Structure

```
little-moments/
├── src/
│   ├── app/
│   │   ├── layout.tsx        # Root layout with wallet provider
│   │   ├── page.tsx          # Landing page
│   │   ├── create/           # Memory creation flow
│   │   └── gallery/          # User's memory gallery
│   ├── components/
│   │   ├── Header.tsx        # Navigation header
│   │   ├── ImageUpload.tsx   # Drag & drop upload
│   │   ├── MemoryForm.tsx    # Emotion capture form
│   │   ├── MetadataPreview.tsx
│   │   ├── MintSuccess.tsx
│   │   └── MemoryCard.tsx
│   └── lib/
│       ├── metadata.ts       # NFT metadata generation
│       ├── ipfs.ts           # IPFS upload utilities
│       └── solana.ts         # NFT minting logic
├── tailwind.config.ts
└── package.json
```

## 🎨 NFT Metadata Schema

Our NFT metadata follows Metaplex standards with a custom `memory` extension:

```json
{
  "name": "Little Moments #000123",
  "description": "A precious memory of my child...",
  "image": "ipfs://...",
  "attributes": [
    { "trait_type": "Child Age", "value": "5Y3M" },
    { "trait_type": "Creation Type", "value": "Artwork" },
    { "trait_type": "Recorder", "value": "Parent" },
    { "trait_type": "Mint Year", "value": "2026" }
  ],
  "memory": {
    "recorded_at": "2026-01-27T19:32:00+08:00",
    "location": "Home",
    "parent_feeling": "She was very focused today. I suddenly realized she has her own inner world now.",
    "child_words": "This is a house that can fly.",
    "context": "Finished after weekly art class"
  }
}
```

> ⚠️ `parent_feeling` is the most important field - it's the emotional anchor of each memory.

## 🚀 Demo

### Live Demo
[https://little-moments.vercel.app](https://little-moments.vercel.app) *(deploy pending)*

### Video Walkthrough
[Watch on YouTube](#) *(coming soon)*

## 📋 Core Features (MVP)

- ✅ Wallet connection (Phantom)
- ✅ Artwork upload with drag & drop
- ✅ Emotion capture form with validation
- ✅ Metadata preview before minting
- ✅ NFT minting on Solana Devnet
- ✅ Personal memory gallery
- ✅ Beautiful, warm UI design

## 🚫 Intentionally NOT Included

- ❌ Secondary market / trading
- ❌ Social feed / public gallery
- ❌ Tokens / points / gamification
- ❌ Complex permission systems

This is by design. We're building for families, not traders.

## 🎯 For Hackathon Judges

### Why This Matters

1. **Real Problem**: Parents lose countless digital memories to cloud service shutdowns, phone changes, and data loss. Blockchain offers true permanence.

2. **Emotion Over Speculation**: While most NFT projects focus on floor price and trading volume, we focus on the words a parent writes. That's the real treasure.

3. **Solana's Perfect Fit**: Low fees make "casual" memory preservation possible. You shouldn't need to think twice about preserving a moment.

### 3-Minute Pitch Points

- 🎨 Upload a child's artwork
- 💝 Write what you feel (this is the core)
- ⛓️ Mint as immutable memory on Solana
- 📚 View your memory collection
- 🔮 Years later: re-read your feelings

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this for good.

## 🙏 Acknowledgments

- Solana Foundation for the amazing blockchain
- Metaplex for NFT standards
- NFT.Storage for free IPFS hosting
- All parents who want to preserve memories for their children

---

**Built with 💝 for the Solana Hackathon 2026**

*"Five years from now, you won't remember what you had for dinner today. But you'll treasure reading what you felt when you saw your child's drawing."*

---

## 📱 Connect

- Twitter: [@your_handle](#)
- Demo: [little-moments.xyz](#)
- GitHub: [github.com/YOUR_USERNAME/little-moments](#)

**Hackathon submission tags:** @trendsdotfun @solana_zh
