#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 颜色映射规则
const colorMappings = {
  // 文本颜色
  'text-gray-900': 'text-foreground',
  'text-gray-600': 'text-muted-foreground',
  'text-gray-500': 'text-muted-foreground',
  'text-gray-400': 'text-muted-foreground',
  'text-neutral-900': 'text-foreground',
  'text-neutral-600': 'text-muted-foreground',
  'text-neutral-500': 'text-muted-foreground',
  'text-neutral-400': 'text-muted-foreground',
  'text-neutral-100': 'text-foreground',
  'text-neutral-300': 'text-muted',
  
  // 暗色模式文本
  'dark:text-neutral-100': 'dark:text-foreground',
  'dark:text-neutral-400': 'dark:text-muted-foreground',
  'dark:text-gray-100': 'dark:text-foreground',
  
  // 背景颜色
  'bg-neutral-100': 'bg-muted',
  'bg-neutral-800': 'bg-card',
  'bg-gray-500': 'bg-muted',
  'bg-gray-400': 'bg-muted',
  'bg-white': 'bg-background',
  
  // 暗色模式背景
  'dark:bg-neutral-900': 'dark:bg-background',
  'dark:bg-neutral-800': 'dark:bg-card',
  
  // 边框颜色
  'border-neutral-200': 'border-border',
  'border-neutral-300': 'border-border',
  'border-neutral-700': 'border-border',
  'border-gray-200': 'border-border',
  
  // 暗色模式边框
  'dark:border-neutral-700': 'dark:border-border',
  
  // 品牌色
  'text-blue-600': 'text-primary',
  'text-blue-500': 'text-primary',
  'text-blue-400': 'text-primary',
  'text-blue-700': 'text-primary',
  'bg-blue-600': 'bg-primary',
  'bg-blue-500': 'bg-primary',
  'bg-blue-100': 'bg-primary/10',
  'bg-blue-50': 'bg-primary/5',
  'border-blue-700': 'border-primary',
  'border-blue-500': 'border-primary',
  'border-blue-600': 'border-primary',
  'ring-blue-500': 'ring-primary',
  
  // 暗色模式品牌色
  'dark:text-blue-400': 'dark:text-primary',
  'dark:text-blue-300': 'dark:text-primary',
  'dark:bg-blue-500': 'dark:bg-primary',
  'dark:bg-blue-900': 'dark:bg-primary/20',
  
  // 危险色
  'text-red-600': 'text-destructive',
  'text-red-500': 'text-destructive',
  'bg-red-50': 'bg-destructive/5',
  'bg-red-600': 'bg-destructive',
  'border-red-200': 'border-destructive/30',
  
  // 暗色模式危险色
  'dark:bg-red-900': 'dark:bg-destructive/10',
  'dark:border-red-800': 'dark:border-destructive/30',
  
  // 成功色（映射到 chart-2）
  'text-green-500': 'text-chart-2',
  'text-green-600': 'text-chart-2',
  'text-green-100': 'text-chart-2/80',
  'bg-green-600': 'bg-chart-2',
  
  // 暗色模式成功色
  'dark:text-green-400': 'dark:text-chart-2',
  
  // 警告色（映射到 chart-3）
  'text-yellow-400': 'text-chart-3',
  'fill-yellow-400': 'fill-chart-3',
  
  // 其他颜色
  'text-purple-600': 'text-chart-4',
  'text-purple-700': 'text-chart-4',
  'bg-purple-50': 'bg-chart-4/5',
  'bg-purple-600': 'bg-chart-4',
  
  'text-orange-600': 'text-chart-5',
  'bg-orange-600': 'bg-chart-5',
  
  // 暗色模式其他颜色
  'dark:text-purple-400': 'dark:text-chart-4',
  'dark:text-orange-400': 'dark:text-chart-5',
};

// 需要特殊处理的文件
const specialFiles = {
  'avatar.tsx': true,
  'checkbox.tsx': true
};

function shouldSkipFile(filePath) {
  const fileName = path.basename(filePath);
  return specialFiles[fileName];
}

function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllFiles(filePath, fileList);
    } else if (filePath.endsWith('.tsx') || filePath.endsWith('.jsx')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

function migrateFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let hasChanges = false;
  
  // 跳过特殊文件
  if (shouldSkipFile(filePath)) {
    console.log(`⏭️  跳过特殊文件: ${path.relative(process.cwd(), filePath)}`);
    return;
  }
  
  // 替换颜色类
  Object.entries(colorMappings).forEach(([oldClass, newClass]) => {
    // 使用正则表达式确保只替换完整的类名
    const regex = new RegExp(`\\b${oldClass}\\b`, 'g');
    const newContent = content.replace(regex, newClass);
    
    if (newContent !== content) {
      content = newContent;
      hasChanges = true;
    }
  });
  
  if (hasChanges) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ 已更新: ${path.relative(process.cwd(), filePath)}`);
    return true;
  }
  return false;
}

// 主函数
function main() {
  const srcPath = path.join(process.cwd(), 'src');
  
  if (!fs.existsSync(srcPath)) {
    console.error('❌ 找不到 src 目录');
    process.exit(1);
  }
  
  console.log('🔍 正在查找文件...');
  const files = getAllFiles(srcPath);
  console.log(`📁 找到 ${files.length} 个文件\n`);
  
  let updatedCount = 0;
  files.forEach(file => {
    if (migrateFile(file)) {
      updatedCount++;
    }
  });
  
  console.log(`\n✨ 迁移完成！共更新 ${updatedCount} 个文件`);
  console.log('\n📝 后续步骤：');
  console.log('1. 检查 avatar.tsx 和 checkbox.tsx 等特殊文件');
  console.log('2. 运行 pnpm dev 查看效果');
  console.log('3. 根据需要调整 globals.css 中的颜色值');
  console.log('4. 测试深色模式切换是否正常');
}

// 运行脚本
main();