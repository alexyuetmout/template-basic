# Vercel 部署指南

## 🚀 快速部署步骤

### 1. 准备工作

#### 安装 Vercel CLI
```bash
npm i -g vercel
```

#### 登录 Vercel
```bash
vercel login
```

### 2. 数据库设置

✅ **你已经配置好了远程 PostgreSQL 数据库！**

当前数据库连接：
- 提供商：Zeabur
- 连接已测试成功
- 数据表已创建
- 初始数据已填充

你可以直接使用现有的数据库连接字符串进行部署。

### 3. 环境变量配置

在 Vercel Dashboard 中设置以下环境变量：

#### 必需配置
```env
# 数据库（使用你现有的 Zeabur 连接）
DATABASE_URL="postgresql://root:RXF1AwhDi5aKel64230Vjf7tUH9P8MxL@sfo1.clusters.zeabur.com:31825/zeabur"

# Better Auth
BETTER_AUTH_SECRET="生产环境随机密钥"
BETTER_AUTH_URL="https://你的域名.vercel.app"
NEXT_PUBLIC_BETTER_AUTH_URL="https://你的域名.vercel.app"

# Stripe
STRIPE_SECRET_KEY="sk_live_你的生产密钥"
STRIPE_PUBLISHABLE_KEY="pk_live_你的生产公钥"
STRIPE_WEBHOOK_SECRET="whsec_你的webhook密钥"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_你的生产公钥"

# 环境
NODE_ENV="production"
```

#### 可选配置
```env
# Google OAuth
GOOGLE_CLIENT_ID="你的Google客户端ID"
GOOGLE_CLIENT_SECRET="你的Google客户端密钥"

# 邮件服务
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="你的邮箱"
SMTP_PASS="你的应用密码"

# 定时任务密钥
CRON_SECRET="生产环境定时任务密钥"
```

### 4. 部署到 Vercel

#### 方法 1：命令行部署
```bash
# 在项目根目录运行
vercel

# 生产部署
vercel --prod
```

#### 方法 2：GitHub 集成
1. 在 Vercel Dashboard 中点击 "New Project"
2. 导入你的 GitHub 仓库
3. Vercel 会自动检测 Next.js 项目
4. 添加环境变量
5. 点击 "Deploy"

### 5. 数据库初始化

✅ **数据库已经初始化完成！**

你的 Zeabur 数据库已经包含：
- 所有必需的数据表
- 默认系统设置
- 示例产品价格

部署时不需要额外的数据库初始化步骤。

### 6. Stripe Webhook 配置

1. 在 Stripe Dashboard 中添加新的 webhook 端点
2. URL: `https://你的域名.vercel.app/api/webhooks/stripe`
3. 选择事件：
   - `payment_intent.succeeded`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `invoice.payment_succeeded`
4. 复制 webhook 签名密钥到环境变量

### 7. 定时任务设置

Vercel Pro 支持 Cron Jobs，已在 `vercel.json` 中配置：
- 每天凌晨 2 点运行积分处理任务

如果使用免费版，可以使用外部服务（如 cron-job.org）调用：
```bash
curl -H "Authorization: Bearer YOUR_CRON_SECRET" https://你的域名.vercel.app/api/cron/points
```

## 🔧 配置文件说明

### vercel.json
```json
{
  "functions": {
    "src/app/api/webhooks/stripe/route.ts": {
      "maxDuration": 30
    },
    "src/app/api/cron/points/route.ts": {
      "maxDuration": 60
    }
  },
  "crons": [
    {
      "path": "/api/cron/points",
      "schedule": "0 2 * * *"
    }
  ]
}
```

### package.json 修改
添加了构建和安装后脚本：
```json
{
  "scripts": {
    "build": "prisma generate && next build",
    "postinstall": "prisma generate"
  }
}
```

## 🚨 常见问题与解决方案

### 1. 数据库连接失败
```
Error: P1001: Can't reach database server
```
**解决方案**：
- 检查 DATABASE_URL 是否正确
- 确保数据库服务正在运行
- 检查防火墙设置

### 2. Prisma 生成失败
```
Error: Generator "client" failed
```
**解决方案**：
- 确保 `postinstall` 脚本包含 `prisma generate`
- 在 Vercel 环境变量中添加 `PRISMA_GENERATE_DATAPROXY=true`

### 3. Stripe Webhook 验证失败
```
Error: Invalid signature
```
**解决方案**：
- 检查 STRIPE_WEBHOOK_SECRET 是否正确
- 确保 webhook URL 可以访问
- 检查 Stripe 事件选择

### 4. 认证问题
```
Error: BETTER_AUTH_SECRET is required
```
**解决方案**：
- 生成强随机密钥：`openssl rand -base64 32`
- 设置正确的 BETTER_AUTH_URL

### 5. 构建超时
**解决方案**：
- 优化依赖项
- 使用 Vercel Pro 获得更长构建时间
- 分离构建步骤

## 📊 监控和维护

### 1. 日志查看
- Vercel Dashboard > Functions 标签页
- 查看函数执行日志
- 实时错误监控

### 2. 性能监控
- Vercel Analytics
- Web Vitals 监控
- 用户访问统计

### 3. 数据库监控
- 使用数据库提供商的监控工具
- 设置连接数和查询性能警报
- 定期备份数据

## 🔄 更新部署

### 自动部署
如果使用 GitHub 集成，推送到主分支会自动触发部署。

### 手动部署
```bash
# 更新代码后
vercel --prod
```

### 回滚部署
在 Vercel Dashboard 中可以快速回滚到之前的版本。

## 📝 部署检查清单

- [ ] 云数据库已设置并可访问
- [ ] 所有环境变量已在 Vercel 中配置
- [ ] Stripe webhook 已配置并测试
- [ ] Google OAuth 已设置（如果使用）
- [ ] 自定义域名已添加（可选）
- [ ] SSL 证书已生效
- [ ] 数据库结构已推送
- [ ] 种子数据已填充
- [ ] 定时任务已设置
- [ ] 监控和日志已配置

## 🎉 部署完成

部署成功后，你的应用将在以下地址可用：
- 默认域名：`https://你的项目名.vercel.app`
- 自定义域名：`https://你的域名.com`（如果已配置）

现在可以开始使用完整的用户系统 + 支付系统 + 积分系统了！