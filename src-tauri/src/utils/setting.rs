use std::env;
use std::fs::File;
use std::io::{Read, Write};


// 获取应用安装位置
#[tauri::command]
pub fn get_installation_path() -> String {
    env::current_exe()
        .map(|path| path.to_string_lossy().to_string())
        .unwrap_or_else(|_| "无法获取路径".to_string())
}

// 将内容写入文件
#[tauri::command]
pub fn write_to_file(file_path: String, content: String) -> Result<(), String> {
    let mut file = File::create(file_path).map_err(|e| e.to_string())?;
    file.write_all(content.as_bytes())
     .map_err(|e| e.to_string())?;
    Ok(())
}

// 读取文件内容
#[tauri::command]
pub fn read_from_file(file_path: String) -> Result<String, String> {
    let mut file = File::open(file_path).map_err(|e| e.to_string())?;
    let mut content = String::new();
    file.read_to_string(&mut content)
       .map_err(|e| e.to_string())?;
    Ok(content)
}