\# Slasshy OmniDownloader – 2026 Local-Only Secure Edition



\## Overview



\*\*Developer:\*\* Suman Patgiri

\*\*Platforms:\*\* Windows, macOS, Linux

\*\*Tech Stack:\*\* Tauri 2 + Rust + React 19 + SQLite

\*\*License:\*\* MIT

\*\*Purpose:\*\* Cross-platform media downloader, organizer, and converter supporting 1000+ platforms.



---



\## Architecture



```

Frontend (React UI)

│  - UI state and user actions

▼ secure invoke()

Rust Core (Tauri Commands)

│  - yt-dlp execution and file management

│  - SQLite storage for history and settings

▼

Local SQLite Database

```



No cloud. No network except media fetch. No secrets embedded.



---



\## Security Model



| Risk                        | Mitigation                                   |

| --------------------------- | -------------------------------------------- |

| Extract credentials         | No embedded secrets exist                    |

| Unauthorized privileged ops | Only Rust executes downloads and disk writes |

| Local DB corruption         | Optional integrity hashing per record        |

| Data leak to cloud          | Zero telemetry, no external DB               |



All privileged logic locked inside Rust.

Frontend can never reach the filesystem directly.



---



\## Database Specification



\### SQLite Schema



```

downloads

&nbsp;├─ id (uuid PRIMARY KEY)

&nbsp;├─ title TEXT

&nbsp;├─ url TEXT

&nbsp;├─ format TEXT

&nbsp;├─ path TEXT

&nbsp;├─ timestamp INTEGER

&nbsp;└─ status TEXT



search\_history

&nbsp;├─ id (uuid PRIMARY KEY)

&nbsp;├─ query TEXT

&nbsp;└─ timestamp INTEGER



settings

&nbsp;├─ key TEXT PRIMARY KEY

&nbsp;└─ value TEXT (JSON)

```



Offline forever.

Export/import the DB for backup or sync between devices.



---



\## Rust Command Templates



\### Add Download History



```rust

\#\[tauri::command]

pub async fn add\_history(item: HistoryItem) -> Result<(), String> {

&nbsp;   sqlite\_add(\&item).map\_err(|e| e.to\_string())

}

```



\### Get Download History



```rust

\#\[tauri::command]

pub async fn get\_history() -> Result<Vec<HistoryItem>, String> {

&nbsp;   sqlite\_get\_all().map\_err(|e| e.to\_string())

}

```



\### Save Setting



```rust

\#\[tauri::command]

pub async fn save\_setting(key: String, value: String) -> Result<(), String> {

&nbsp;   sqlite\_set\_setting(\&key, \&value).map\_err(|e| e.to\_string())

}

```



---



\## React Integration



```ts

const history = await invoke("get\_history");



await invoke("add\_history", {

&nbsp; item: {

&nbsp;   id: crypto.randomUUID(),

&nbsp;   title,

&nbsp;   url,

&nbsp;   format,

&nbsp;   path,

&nbsp;   timestamp: Date.now(),

&nbsp;   status: "completed",

&nbsp; }

});

```



Frontend only instructs. Backend does the real work.



---



\## Download Flow



```

User selects media → UI invokes download()

Rust spawns yt-dlp → emits progress events

Files saved to chosen filesystem path

History recorded in SQLite

```



Progress delivered via `tauri::async\_runtime` and event emitters.



---



\## Deployment \& Storage



| Platform | DB Location                                     |

| -------- | ----------------------------------------------- |

| Windows  | %AppData%/Slasshy/db.sqlite                     |

| macOS    | ~/Library/Application Support/Slasshy/db.sqlite |

| Linux    | ~/.config/Slasshy/db.sqlite                     |



Signed installers recommended:

Windows code signing + macOS Notarization.



Auto-updates only via trusted GitHub HTTPS releases.



---



\## Feature Set



\* Support for 1000+ platforms (yt-dlp backend)

\* Batch downloading

\* Metadata auto-renaming

\* Proxy and UA spoofing

\* Low RAM (< 100 MB)

\* Instant launch (<1s)



---



\## Roadmap



\* GPU-accelerated FFmpeg pipeline

\* Watch-folders for auto downloads

\* Plugin system (Rust extensions)

\* Thumbnail preview extraction

\* Multi-profile local accounts



---



\## Legal



This software is intended for personal, rights-compliant use only.

Users are responsible for ensuring they have permission to download content.



