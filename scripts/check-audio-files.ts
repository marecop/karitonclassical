/**
 * 音訊檔案名診斷工具
 * 用於檢查 playlists.ts 中的檔案名是否有潛在問題
 */

import { playlists } from '../src/data/playlists';

interface FileNameIssue {
  trackId: string;
  trackTitle: string;
  filename: string;
  issues: string[];
}

function checkFilename(filename: string): string[] {
  const issues: string[] = [];
  
  // 檢查 Ouvertüre 前是否有空格
  if (filename.includes('Ouvertüre') && !filename.match(/Ouvertüre\s/)) {
    issues.push('"Ouvertüre" 前可能缺少空格');
  }
  
  // 檢查括號後是否有空格
  if (filename.match(/\)[A-Z]/) || filename.match(/\)\d/)) {
    issues.push('括號後可能缺少空格');
  }
  
  // 檢查數字和字母之間是否有空格
  if (filename.match(/\d{1,3}[A-Z]/)) {
    issues.push('數字和字母之間可能缺少空格（例如：306Overture 應該是 306 Overture）');
  }
  
  // 檢查多個連續空格
  if (filename.includes('  ')) {
    issues.push('包含多個連續空格');
  }
  
  // 檢查特殊字符編碼問題
  if (filename.includes('ü') || filename.includes('ö') || filename.includes('ä') || filename.includes('ß')) {
    issues.push('包含德語特殊字符，確保編碼正確');
  }
  
  // 檢查單引號
  if (filename.includes("'") && !filename.includes("\\'")) {
    issues.push('包含單引號，可能需要轉義');
  }
  
  return issues;
}

function main() {
  console.log('='.repeat(80));
  console.log('音訊檔案名診斷報告');
  console.log('='.repeat(80));
  console.log();
  
  const allIssues: FileNameIssue[] = [];
  
  playlists.forEach(playlist => {
    console.log(`播放列表: ${playlist.title} (${playlist.folderName})`);
    console.log('-'.repeat(80));
    
    playlist.tracks.forEach(track => {
      const issues = checkFilename(track.filename);
      if (issues.length > 0) {
        allIssues.push({
          trackId: track.id,
          trackTitle: track.title,
          filename: track.filename,
          issues
        });
        
        console.log(`❌ Track ${track.id}: ${track.title}`);
        console.log(`   檔案名: ${track.filename}`);
        console.log(`   問題:`);
        issues.forEach(issue => console.log(`     - ${issue}`));
        console.log();
      }
    });
  });
  
  console.log('='.repeat(80));
  console.log(`總計發現 ${allIssues.length} 個檔案有潛在問題`);
  console.log('='.repeat(80));
  
  if (allIssues.length > 0) {
    console.log('\n建議修復的檔案：');
    allIssues.forEach(({ trackId, trackTitle, filename, issues }) => {
      console.log(`\nTrack ${trackId}: ${trackTitle}`);
      console.log(`當前檔案名: ${filename}`);
      console.log(`問題: ${issues.join(', ')}`);
    });
  }
}

main();
