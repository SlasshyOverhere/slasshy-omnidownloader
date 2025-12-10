use crate::database::{Database, Download, SearchHistory, Setting};
use tauri::{AppHandle, Manager, State};
use std::sync::Mutex;

pub struct AppState {
    pub db: Mutex<Database>,
}

// Download commands
#[tauri::command]
pub async fn add_download(
    state: State<'_, AppState>,
    download: Download,
) -> Result<(), String> {
    let db = state.db.lock().map_err(|e| e.to_string())?;
    db.add_download(&download).map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn get_downloads(state: State<'_, AppState>) -> Result<Vec<Download>, String> {
    let db = state.db.lock().map_err(|e| e.to_string())?;
    db.get_downloads().map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn update_download_status(
    state: State<'_, AppState>,
    id: String,
    status: String,
) -> Result<(), String> {
    let db = state.db.lock().map_err(|e| e.to_string())?;
    db.update_download_status(&id, &status).map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn delete_download(state: State<'_, AppState>, id: String) -> Result<(), String> {
    let db = state.db.lock().map_err(|e| e.to_string())?;
    db.delete_download(&id).map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn clear_downloads(state: State<'_, AppState>) -> Result<(), String> {
    let db = state.db.lock().map_err(|e| e.to_string())?;
    db.clear_downloads().map_err(|e| e.to_string())
}

// Search history commands
#[tauri::command]
pub async fn add_search(
    state: State<'_, AppState>,
    query: String,
    title: Option<String>,
    thumbnail: Option<String>,
) -> Result<(), String> {
    let db = state.db.lock().map_err(|e| e.to_string())?;
    db.add_search(&query, title.as_deref(), thumbnail.as_deref()).map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn get_search_history(
    state: State<'_, AppState>,
    limit: i64,
) -> Result<Vec<SearchHistory>, String> {
    let db = state.db.lock().map_err(|e| e.to_string())?;
    db.get_search_history(limit).map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn clear_search_history(state: State<'_, AppState>) -> Result<(), String> {
    let db = state.db.lock().map_err(|e| e.to_string())?;
    db.clear_search_history().map_err(|e| e.to_string())
}

// Settings commands
#[tauri::command]
pub async fn save_setting(
    state: State<'_, AppState>,
    key: String,
    value: String,
) -> Result<(), String> {
    let db = state.db.lock().map_err(|e| e.to_string())?;
    db.save_setting(&key, &value).map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn get_setting(
    state: State<'_, AppState>,
    key: String,
) -> Result<Option<String>, String> {
    let db = state.db.lock().map_err(|e| e.to_string())?;
    db.get_setting(&key).map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn get_all_settings(state: State<'_, AppState>) -> Result<Vec<Setting>, String> {
    let db = state.db.lock().map_err(|e| e.to_string())?;
    db.get_all_settings().map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn delete_setting(state: State<'_, AppState>, key: String) -> Result<(), String> {
    let db = state.db.lock().map_err(|e| e.to_string())?;
    db.delete_setting(&key).map_err(|e| e.to_string())
}
