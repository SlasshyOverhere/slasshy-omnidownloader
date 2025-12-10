// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod commands;
mod database;
mod downloader;

use commands::AppState;
use database::Database;
use std::sync::Mutex;
use tauri::Manager;

pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_dialog::init())
        .setup(|app| {
            // Get app data directory
            let app_data_dir = app
                .path()
                .app_data_dir()
                .expect("Failed to get app data directory");

            // Ensure binaries directory exists for yt-dlp
            let binaries_dir = app_data_dir.join("binaries");
            std::fs::create_dir_all(&binaries_dir).ok();

            // Initialize database
            let db = Database::new(app_data_dir)
                .expect("Failed to initialize database");

            // Store in app state
            app.manage(AppState { db: Mutex::new(db) });

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            // Download commands
            commands::add_download,
            commands::get_downloads,
            commands::update_download_status,
            commands::delete_download,
            commands::clear_downloads,
            // Search history commands
            commands::add_search,
            commands::get_search_history,
            commands::clear_search_history,
            // Settings commands
            commands::save_setting,
            commands::get_setting,
            commands::get_all_settings,
            commands::delete_setting,
            // Downloader commands
            downloader::check_yt_dlp,
            downloader::get_media_info,
            downloader::start_download,
            downloader::cancel_download,
            downloader::get_supported_platforms,
            downloader::get_default_download_path,
            downloader::get_download_folder_size,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
