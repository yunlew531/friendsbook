export enum LoginError {
  '信箱必須填寫' = 1,
  '密碼必須填寫' = 2,
  '密碼至少要6字' = 3,
  '用戶不存在，請檢查信箱是否正確' = 4,
  '密碼錯誤' = 5,
}

export enum RegisterError {
  '此信箱已註冊過' = 1,
  '用戶名必須填寫' = 2,
  '信箱必須填寫' = 3,
  '密碼必須填寫' = 4,
  '信箱格式錯誤' = 6,
  '用戶名至少要2字' = 8,
  '密碼至少要6字' = 9,
}

export enum UploadImgError {
  '只能上傳 jpeg、jpg 格式' = 1,
}

export enum PublishArticleError {
  '需要填寫內容!' = 2,
}
