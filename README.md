# 🚀 AutoPilot DCA – Predictive Crypto Buying Agent

AutoPilot DCA is an intelligent, decentralized investment dashboard that automates crypto buying based on real-time prediction confidence. It combines AI-powered insights from **Allora’s oracle network** with seamless execution through **Aptos blockchain wallets**, offering a smarter, adaptive DCA (Dollar-Cost Averaging) experience for both novice and professional users.

---

## 🧠 Problem Statement

In the rapidly evolving world of crypto investing, users face overwhelming complexity, inconsistent information, and unpredictable market behavior. Many retail investors lack the technical expertise to interpret signals, manually analyze trends, or manage investments efficiently. Emotional trading decisions, fragmented tools, and a lack of real-time predictive insights often lead to poor outcomes and loss of trust in decentralized finance.

Traditional DCA platforms are either rigid or demand high customization. There's no unified system that brings together on-chain intelligence, AI-driven prediction confidence, and secure decentralized execution — in a format simple enough for beginners but powerful enough for pros.

---

## ✅ Solution

AutoPilot DCA integrates:

- 🧠 **Allora’s AI Prediction Oracle**  
  Uses real-time confidence scores to determine optimal buy timing.

- 🔐 **Aptos Wallet Adapter**  
  Seamless, non-custodial wallet connection and simulated transaction support.

- ⚙️ **Dynamic Buy Logic**  
  Executes simulated buys when confidence > 0.7 and avoids low-confidence zones, minimizing poor entries.

- 🎛️ **Customizable Dashboard**  
  Users adjust confidence thresholds and frequencies in real time.

- 📉 **Simulation Engine**  
  Demonstrates real-world utility with adjustable parameters, paving the way for live execution.

---

## ⚙️ Features

- 🔮 Live confidence score fetching via **Allora prediction API**
- 🔐 Wallet connectivity using `@aptos-labs/wallet-adapter`
- 📊 Configurable DCA engine for asset buys based on score thresholds
- 🌐 Responsive frontend built with **React** + **TailwindCSS**
- 🎛️ Dashboard to adjust:
  - Confidence threshold
  - Buy intervals
  - Token options (mocked or real assets)
- 📈 Real-time feedback for each decision
- 🧪 Future-ready for on-chain execution

---

## 📦 Tech Stack

```
Frontend     – React.js, TailwindCSS, TypeScript  
Wallets      – @aptos-labs/wallet-adapter (Petra, Martian, etc.)  
AI Oracle    – Allora AI Agent Prediction API  
Blockchain   – Aptos  
Hosting      – Vercel / Netlify (or local dev)  
Tooling      – Zustand, Axios, Lucide Icons, ShadCN UI  
```

---

## 🖼️ Architecture Overview

```
User → React UI → Allora Prediction API → Confidence Score  
                    ↓  
           Aptos Wallet Adapter → Wallet Execution  
                    ↓  
              AutoPilot Logic → Simulated Buys / Skips  
```

---

## 🧪 Local Setup

```bash
git clone https://github.com/your-username/autopilot-dca
cd autopilot-dca
npm install
npm run dev
```

Create `.env.local` (if API key or env vars required):

```env
VITE_ALLORA_API_URL=https://api.allora.network/predict
```

---

## 📈 Example Scenario

- Allora returns prediction confidence = `0.82` → ✅ Agent executes a simulated buy  
- Prediction confidence = `0.59` → ❌ Agent skips buy to avoid low-confidence entry  
- User adjusts threshold from `0.7` to `0.65` via the dashboard in real-time  

---

## 🔮 Future Enhancements

- Enable **on-chain buy execution** using Aptos smart contracts  
- Add **multi-asset/token support**  
- Plug in **historical market backtesting**  
- Integrate **voice/chat configuration agent** using LLM  
- Build **PWA/mobile responsive** version  
- Deploy to mainnet with secure private key handling

---

## 🙌 Contributions

We welcome contributions! Open an issue for a bug or feature request, or fork the repo and submit a PR.

---


