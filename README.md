# Slasshy OmniDownloader 🚀

**The Ultimate Cross-Platform Media Hub**

Slasshy OmniDownloader is a powerful, modern, and beautiful application designed to be your one-stop solution for downloading, organizing, and consuming media. Built with the latest web technologies and Rust, it delivers native performance with a stunning user interface.

## ⚡ Tech Stack

Built on the cutting edge of modern app development:

- **Core**: [Tauri 2](https://v2.tauri.app/) (Rust + Webview)
- **Frontend**: React 19 + TypeScript
- **Styling**: TailwindCSS + shadcn/ui
- **State & Data**: Local SQLite Database
- **Visuals**: Framer Motion + Three.js for immersive 3D effects

## ✨ Features

- **🎬 Universal Downloader**: Support for 1000+ platforms including YouTube, Twitch, and more.
- **📺 Smart Library**: Automatically organizes your downloaded movies and TV shows.
- **🎨 Immersive UI**: A rich, 3D animated interface with glassmorphism and dynamic visuals.
- **📊 Real-time Tracking**: Detailed progress bars, speed metrics, and download history.
- **🎵 Media Conversion**: Built-in tools for audio extraction and format conversion.
- **🚫 Ad-Free Experience**: Custom player with built-in ad-blocking and skips.

## 🛠️ Development Setup

### Prerequisites

- **Node.js**: v18 or higher
- **Rust**: Latest stable release ([Install Rust](https://www.rust-lang.org/tools/install))
- **Visual Studio C++ Build Tools** (Windows only)
- **yt-dlp**: Must be installed and available in your system PATH.

### Getting Started

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/slasshy-downloader.git
    cd slasshy-downloader/local-db
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Run Development Environment**
    ```bash
    npm run tauri dev
    ```

4.  **Build for Production**
    ```bash
    npm run tauri build
    ```

## 📝 License

This project is licensed under the [MIT License](LICENSE).
