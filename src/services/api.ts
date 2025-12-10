import { invoke } from '@tauri-apps/api/core';
import { listen, UnlistenFn } from '@tauri-apps/api/event';

// Types matching Rust structs
export interface Download {
    id: string;
    title: string;
    url: string;
    format: string;
    path: string;
    timestamp: number;
    status: string;
    size_bytes?: number;
    platform?: string;
    thumbnail?: string;
}

export interface SearchHistory {
    id: string;
    query: string;
    timestamp: number;
    title?: string;
    thumbnail?: string;
}

export interface Setting {
    key: string;
    value: string;
}

export interface MediaInfo {
    title: string;
    duration?: number;
    thumbnail?: string;
    formats: FormatInfo[];
    platform: string;
    uploader?: string;
    description?: string;
    view_count?: number;
    like_count?: number;
    upload_date?: string;
    webpage_url?: string;
}

export interface FormatInfo {
    format_id: string;
    ext: string;
    resolution?: string;
    filesize?: number;
    filesize_approx?: number;
    vcodec?: string;
    acodec?: string;
    fps?: number;
    tbr?: number;
    format_note?: string;
    quality_label?: string;
}

export interface DownloadProgress {
    id: string;
    progress: number;
    speed: string;
    eta: string;
    status: string;
    downloaded_bytes?: number;
    total_bytes?: number;
    filename?: string;
}

export interface DownloadRequest {
    id: string;
    url: string;
    output_path: string;
    format?: string;
    audio_only: boolean;
    quality?: string;
    embed_thumbnail: boolean;
    embed_metadata: boolean;
}

export interface YtDlpInfo {
    version: string;
    path: string;
    is_embedded: boolean;
}

// Download API
export const api = {
    // Downloads
    async addDownload(download: Download): Promise<void> {
        return invoke('add_download', { download });
    },

    async getDownloads(): Promise<Download[]> {
        return invoke('get_downloads');
    },

    async updateDownloadStatus(id: string, status: string): Promise<void> {
        return invoke('update_download_status', { id, status });
    },

    async deleteDownload(id: string): Promise<void> {
        return invoke('delete_download', { id });
    },

    async clearDownloads(): Promise<void> {
        return invoke('clear_downloads');
    },

    // Search History
    async addSearch(query: string, title?: string, thumbnail?: string): Promise<void> {
        return invoke('add_search', { query, title, thumbnail });
    },

    async getSearchHistory(limit: number = 50): Promise<SearchHistory[]> {
        return invoke('get_search_history', { limit });
    },

    async clearSearchHistory(): Promise<void> {
        return invoke('clear_search_history');
    },

    // Settings
    async saveSetting(key: string, value: string): Promise<void> {
        return invoke('save_setting', { key, value });
    },

    async getSetting(key: string): Promise<string | null> {
        return invoke('get_setting', { key });
    },

    async getAllSettings(): Promise<Setting[]> {
        return invoke('get_all_settings');
    },

    async deleteSetting(key: string): Promise<void> {
        return invoke('delete_setting', { key });
    },

    // yt-dlp Management
    async checkYtDlp(): Promise<YtDlpInfo> {
        return invoke('check_yt_dlp');
    },

    async getDefaultDownloadPath(): Promise<string> {
        return invoke('get_default_download_path');
    },

    async getSupportedPlatforms(): Promise<string[]> {
        return invoke('get_supported_platforms');
    },

    async getDownloadFolderSize(path: string): Promise<number> {
        return invoke('get_download_folder_size', { path });
    },

    // Media Info & Downloading
    async getMediaInfo(url: string): Promise<MediaInfo> {
        return invoke('get_media_info', { url });
    },

    async startDownload(request: DownloadRequest): Promise<void> {
        return invoke('start_download', { request });
    },

    async cancelDownload(id: string): Promise<void> {
        return invoke('cancel_download', { id });
    },

    // Event listeners
    onDownloadProgress(callback: (progress: DownloadProgress) => void): Promise<UnlistenFn> {
        return listen<DownloadProgress>('download-progress', (event) => {
            callback(event.payload);
        });
    },
};

// Helper functions
export function formatBytes(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function formatDuration(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

export function generateDownloadId(): string {
    return `dl_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

export default api;
