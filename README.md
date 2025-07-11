# 🦆 LazyContent | AI-Powered Blog to Social Media Tool

LazyContent is a personal AI-powered tool designed to **convert any blog post URL** into **engaging social media content** using **Google Gemini API**, and automatically **save the results to Notion**.

---

## 🚀 Features

- ✨ One-click transformation of blog URLs to social content
- 📱 Auto-generate captions, tags, hashtags for:
  - Facebook
  - LinkedIn
  - Threads (X)
  - YouTube
  - Instagram
- 🎥 60-second social media Reel script
- 🧠 Built using Next.js, Tailwind CSS, and Gemini AI
- 🗂️ Data saved directly to your Notion database

---

## 🔧 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/IsaacTalb/lazycontent.git
cd lazycontent
```

### 2. Install Dependencies

```bash
npm install # or yarn install
```

### 3. Configure Environment Variables

Create a `.env.local` file at the root of your project:

```
GEMINI_API_KEY=your_gemini_api_key
NOTION_DATABASE_ID=your_notion_database_id
NOTION_TOKEN=your_notion_integration_token
```

💡 You must share access of the Notion database with your integration token from Notion Developers.

### 4. Run the Development Server

```bash
npm run dev # or yarn dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 🧪 Example Use Case

Paste any blog post URL, click “Process Content”, and LazyContent will auto-generate social content and save it into your Notion workspace.

---

## 🤝 Contributing

We welcome contributions to improve LazyContent! Here's how:

- 🍴 Fork this repo
- 🌱 Create a new branch: `git checkout -b feature/awesome`
- ✅ Commit your changes: `git commit -m 'Add cool feature'`
- 📤 Push to your fork: `git push origin feature/awesome`
- 🛠️ Open a Pull Request

---

## 📌 Project Goals

I built this as a personal productivity tool to help clients and creators automate repetitive content workflows. This is also part of a broader system called:

- 📝 Duck Note by Duck Cloud – a future web app that allows you to:
  - 🎙️ Talk → Transcribe in English, Myanmar, Khmer
  - 🧠 Smart feedback & suggestions via AI
  - 📥 Save everything neatly into Notion
  - 💡 Advanced recommendation and loopback system

