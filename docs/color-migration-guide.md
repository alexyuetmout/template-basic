# 颜色系统迁移指南

本指南帮助您将项目中的硬编码颜色值迁移到基于 CSS 变量的主题系统。

## 迁移概述

### 1. 新的颜色系统特点
- 使用 OKLCH 颜色空间（更好的颜色感知）
- 完整的语义化颜色变量
- 支持深色模式自动切换
- 易于主题定制

### 2. 主要变更
- 已更新 `globals.css` 使用新的 OKLCH 颜色系统
- 创建了自动迁移脚本 `scripts/migrate-colors.js`
- 所有硬编码颜色将映射到语义化变量

## 使用迁移脚本

```bash
# 运行迁移脚本
node scripts/migrate-colors.js
```

## 颜色映射对照表

### 基础颜色
| 旧颜色类 | 新颜色类 | 用途 |
|---------|---------|------|
| text-gray-900, text-neutral-900 | text-foreground | 主要文本 |
| text-gray-600, text-neutral-600 | text-muted-foreground | 次要文本 |
| bg-white | bg-background | 页面背景 |
| bg-neutral-100 | bg-muted | 静音背景 |
| border-neutral-200 | border-border | 边框 |

### 品牌色
| 旧颜色类 | 新颜色类 | 用途 |
|---------|---------|------|
| text-blue-600, bg-blue-600 | text-primary, bg-primary | 主要操作 |
| text-red-600, bg-red-600 | text-destructive, bg-destructive | 危险操作 |

### 功能色（映射到图表色）
| 旧颜色类 | 新颜色类 | 建议用途 |
|---------|---------|------|
| text-green-600 | text-chart-2 | 成功状态 |
| text-yellow-400 | text-chart-3 | 警告状态 |
| text-purple-600 | text-chart-4 | 特殊强调 |
| text-orange-600 | text-chart-5 | 其他强调 |

## 手动处理事项

### 1. 特殊文件
以下文件需要手动检查：
- `src/components/ui/avatar.tsx` - 包含颜色数组
- `src/components/ui/checkbox.tsx` - 包含复杂的颜色状态

### 2. 添加新的语义颜色
如果需要专门的成功/警告颜色，可以在 `globals.css` 中添加：

```css
:root {
  /* 添加成功色 */
  --success: oklch(0.7 0.2 150);
  --success-foreground: oklch(1 0 0);
  
  /* 添加警告色 */
  --warning: oklch(0.8 0.2 90);
  --warning-foreground: oklch(0.2 0 0);
}

.dark {
  --success: oklch(0.6 0.2 150);
  --warning: oklch(0.7 0.2 90);
}

@theme inline {
  --color-success: var(--success);
  --color-success-foreground: var(--success-foreground);
  --color-warning: var(--warning);
  --color-warning-foreground: var(--warning-foreground);
}
```

## 主题定制

### 更改主题色
只需修改 `globals.css` 中的 CSS 变量值：

```css
:root {
  /* 修改主色调 */
  --primary: oklch(0.6 0.2 30); /* 改为橙色系 */
}
```

### OKLCH 颜色值说明
OKLCH 格式：`oklch(亮度 饱和度 色相)`
- 亮度：0-1（0=黑色，1=白色）
- 饱和度：0-0.4（0=灰色，0.4=鲜艳）
- 色相：0-360（色环角度）

常见色相值：
- 0-30：红色系
- 30-90：黄色系
- 90-150：绿色系
- 150-210：青色系
- 210-270：蓝色系
- 270-330：紫色系
- 330-360：品红色系

## 测试检查清单

迁移后请检查：
- [ ] 页面在明亮模式下显示正常
- [ ] 页面在深色模式下显示正常
- [ ] 主题切换过渡平滑
- [ ] 所有交互状态（悬停、焦点等）正常
- [ ] 控制台无颜色相关错误

## 常见问题

### Q: 为什么使用 OKLCH？
A: OKLCH 提供更好的颜色感知一致性，特别是在调整亮度时。

### Q: 如何快速预览颜色？
A: 可以使用在线工具如 [oklch.com](https://oklch.com) 预览和调整颜色。

### Q: 迁移后发现颜色不对？
A: 检查是否有特殊的颜色使用场景未被覆盖，可以手动添加映射规则。