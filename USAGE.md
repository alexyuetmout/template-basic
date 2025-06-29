# 项目使用指南 (USAGE.md)

## 📋 项目概览

这是一个基于 **Next.js 15** 和 **Better Auth** 的全栈应用模板，包含完整的用户认证、支付系统、积分管理等企业级功能。

### 🏗️ 技术栈
- **前端**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **认证**: Better Auth (现代认证库)
- **数据库**: PostgreSQL + Prisma ORM
- **支付**: Stripe 集成
- **部署**: Vercel 优化

---

## 🔐 认证系统架构

### 认证流程图
```
用户访问 → 检查session → 
├─ 已登录: 显示用户界面 (Dashboard/Profile)
└─ 未登录: 重定向到登录页面 (/auth/sign-in)
```

### 核心文件结构
```
src/
├── lib/
│   ├── auth.ts              # Better Auth 服务端配置
│   ├── auth-client.ts       # Better Auth 客户端配置
│   └── auth-middleware.ts   # API 路由保护中间件
├── app/
│   ├── auth/
│   │   ├── sign-in/         # 登录页面
│   │   └── sign-up/         # 注册页面
│   ├── dashboard/           # 用户仪表板 (受保护)
│   └── api/
│       ├── auth/[...all]/   # Better Auth 统一处理端点
│       ├── protected/       # 需要登录的API
│       └── admin/           # 需要管理员权限的API
└── components/
    └── auth/
        └── ProtectedRoute.tsx # 前端路由保护组件
```

---

## 🚀 快速开始

### 1. 环境变量配置

创建 `.env` 文件：

```env
# 数据库连接
DATABASE_URL="postgresql://username:password@host:port/database"

# Better Auth 配置
BETTER_AUTH_SECRET="your-32-character-secret-key"
BETTER_AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_BETTER_AUTH_URL="http://localhost:3000"

# Google OAuth (可选)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Stripe 支付 (可选)
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

# 其他配置
CREATE_ADMIN_USER="true"  # 种子数据时创建管理员用户
```

### 2. 数据库设置

```bash
# 安装依赖
npm install

# 数据库迁移
npx prisma migrate dev

# 生成 Prisma 客户端
npx prisma generate

# 种子数据 (可选)
npx prisma db seed
```

### 3. 启动开发服务器

```bash
npm run dev
```

访问 `http://localhost:3000`

---

## 👤 用户认证功能

### 注册流程
1. 用户访问 `/auth/sign-up`
2. 填写邮箱、密码、确认密码
3. 同意服务条款
4. 提交后自动创建：
   - User 记录 (用户基本信息)
   - Account 记录 (密码哈希)
   - Stripe Customer (如果启用支付)

### 登录流程
1. 用户访问 `/auth/sign-in`
2. 输入邮箱和密码
3. Better Auth 验证密码
4. 创建 session 记录
5. 重定向到首页或 dashboard

### Google OAuth
1. 点击 "Continue with Google"
2. 重定向到 Google 授权页面
3. 授权后返回应用
4. 自动创建或关联账户

---

## 🛡️ 路由保护机制

### 前端页面保护

```tsx
// 使用 ProtectedRoute 组件包装需要登录的页面
import { ProtectedRoute } from "@/components/auth/ProtectedRoute"

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <YourDashboardContent />
    </ProtectedRoute>
  )
}
```

### API 路由保护

```typescript
// 普通用户认证
import { requireAuth } from "@/lib/auth-middleware"

export async function GET() {
  const authResult = await requireAuth()
  if (authResult instanceof NextResponse) return authResult
  
  const { user } = authResult
  // 你的受保护逻辑
}

// 管理员权限检查
import { requireAdmin } from "@/lib/auth-middleware"

export async function GET() {
  const authResult = await requireAdmin()
  if (authResult instanceof NextResponse) return authResult
  
  // 仅管理员可访问的逻辑
}
```

### 客户端用户状态检查

```tsx
import { useSession } from "@/lib/auth-client"

function MyComponent() {
  const { data: session, isPending } = useSession()

  if (isPending) return <div>Loading...</div>
  if (!session) return <div>Please sign in</div>

  return (
    <div>
      <h1>Welcome, {session.user.name}!</h1>
      <p>Balance: ${session.user.balance}</p>
      <p>Points: {session.user.oneTimePoints}</p>
    </div>
  )
}
```

---

## 📊 数据库结构

### 用户相关表

#### Users 表
```sql
-- 用户基本信息和业务数据
id                  String   @id @default(cuid())
email               String   @unique
name                String?
image               String?
stripeCustomerId    String?  @unique
balance             Int      @default(0)          -- 账户余额
oneTimePoints       Int      @default(0)          -- 一次性积分
subscriptionPoints  Int      @default(0)          -- 订阅积分
pointsExpiresAt     DateTime?                     -- 积分过期时间
isAdmin             Boolean  @default(false)      -- 管理员标识
status              UserStatus @default(ACTIVE)   -- 用户状态
countryCode         String?                       -- 国家代码
emailVerified       Boolean  @default(false)      -- 邮箱验证状态
createdAt           DateTime @default(now())
updatedAt           DateTime @updatedAt
```

#### Sessions 表
```sql
-- Better Auth 会话管理
id          String   @id @default(cuid())
userId      String   -- 关联用户
expiresAt   DateTime -- 过期时间
token       String   @unique
ipAddress   String?
userAgent   String?
```

#### Accounts 表
```sql
-- OAuth 和密码存储
id                    String   @id @default(cuid())
userId                String   -- 关联用户
accountId             String   -- 第三方账户ID
providerId            String   -- 提供商 (google/email)
password              String?  -- 密码哈希 (Better Auth 管理)
accessToken           String?  -- OAuth token
refreshToken          String?  -- 刷新 token
```

### 业务逻辑表

#### Prices 表 (定价配置)
```sql
stripePriceId   String       @unique
amount          Int          -- 价格 (分为单位)
type            PriceType    -- ONE_TIME/SUBSCRIPTION/POINTS_PACKAGE
interval        PriceInterval? -- DAY/WEEK/MONTH/YEAR
pointsReward    Int          -- 奖励积分
```

#### Orders 表 (订单记录)
```sql
orderNumber     String       @unique @default(uuid())
userId          String       -- 买家
priceId         String       -- 价格配置
amount          Int          -- 订单金额
pointsAdded     Int          -- 获得积分
status          OrderStatus  -- PENDING/SUCCEEDED/FAILED
```

#### Subscriptions 表 (订阅管理)
```sql
stripeSubscriptionId  String             @unique
subscriptionType      SubscriptionType   -- MONTHLY/YEARLY
status                SubscriptionStatus -- ACTIVE/CANCELED
currentPeriodStart    DateTime
currentPeriodEnd      DateTime
```

---

## 🔗 API 端点

### Better Auth 自动端点

Better Auth 在 `/api/auth/[...all]` 下自动提供以下端点：

```
POST /api/auth/sign-up/email        # 邮箱注册
POST /api/auth/sign-in/email        # 邮箱登录
GET  /api/auth/sign-in/google       # Google OAuth 登录
POST /api/auth/sign-out             # 退出登录
GET  /api/auth/session              # 获取当前会话
POST /api/auth/session              # 更新会话
```

### 自定义业务端点

#### 用户相关
```
GET  /api/user/profile              # 获取用户资料
PUT  /api/user/profile              # 更新用户资料
GET  /api/user/balance              # 获取余额
POST /api/user/balance              # 更新余额
```

#### 积分系统
```
GET  /api/points/history            # 积分历史记录
POST /api/points/transfer           # 积分转账
GET  /api/points/expiring           # 即将过期积分
```

#### 订单管理
```
GET  /api/orders                    # 用户订单列表
POST /api/orders                    # 创建订单
GET  /api/orders/[id]               # 订单详情
```

#### 管理员端点
```
GET  /api/admin/users               # 用户列表 (仅管理员)
PUT  /api/admin/users/[id]          # 编辑用户 (仅管理员)
GET  /api/admin/orders              # 所有订单 (仅管理员)
```

---

## 💰 支付集成 (Stripe)

### 价格配置
```typescript
// 在 Prisma 中配置价格
const prices = [
  {
    stripePriceId: "price_1234",
    amount: 999,  // $9.99
    type: "POINTS_PACKAGE",
    pointsReward: 1000
  }
]
```

### 支付流程
1. 用户选择价格套餐
2. 前端调用 `/api/orders` 创建订单
3. 返回 Stripe Payment Intent
4. 用户完成支付
5. Stripe webhook 通知支付结果
6. 自动添加积分到用户账户

---

## 🎯 积分系统

### 积分类型
- **oneTimePoints**: 一次性购买的积分 (可过期)
- **subscriptionPoints**: 订阅获得的积分 (按月发放)

### 积分管理
```typescript
// 增加积分
await UserService.updateUserPoints(userId, {
  oneTimePoints: 1000,
  pointsExpiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30天后过期
})

// 消费积分
await PointTransactionService.createTransaction({
  userId,
  points: -100,
  transactionType: "SPEND",
  reason: "API调用消费"
})
```

---

## 🔧 开发工具

### 数据库管理
```bash
# 查看数据库
npx prisma studio

# 重置数据库
npx prisma migrate reset

# 创建新迁移
npx prisma migrate dev --name your-migration-name
```

### 调试认证
```bash
# 查看会话
curl http://localhost:3000/api/auth/session

# 测试受保护端点
curl -H "Cookie: your-session-cookie" \
     http://localhost:3000/api/protected/example
```

---

## 🚀 部署配置

### Vercel 部署
1. 连接 GitHub 仓库
2. 配置环境变量
3. 设置构建命令: `npm run build`
4. 设置 `BETTER_AUTH_URL` 为生产域名

### 环境变量检查清单
- [ ] `DATABASE_URL` - PostgreSQL 连接字符串
- [ ] `BETTER_AUTH_SECRET` - 32字符随机密钥
- [ ] `BETTER_AUTH_URL` - 应用域名 (生产环境)
- [ ] `GOOGLE_CLIENT_ID` - Google OAuth (如果使用)
- [ ] `GOOGLE_CLIENT_SECRET` - Google OAuth (如果使用)
- [ ] `STRIPE_SECRET_KEY` - Stripe 私钥 (如果使用支付)

---

## 🐛 常见问题解决

### 1. 认证失败
```bash
# 检查环境变量
echo $BETTER_AUTH_SECRET
echo $DATABASE_URL

# 检查数据库连接
npx prisma db push
```

### 2. Session 不持久
- 检查 cookie 域名设置
- 确认 `BETTER_AUTH_URL` 正确
- 检查 HTTPS 设置 (生产环境)

### 3. Google OAuth 失败
- 检查 OAuth 应用配置
- 确认回调 URL: `https://yourdomain.com/api/auth/callback/google`
- 验证客户端ID和密钥

### 4. 数据库迁移错误
```bash
# 强制重新同步
npx prisma db push --force-reset

# 检查模式差异
npx prisma migrate diff
```

---

## 📚 参考资源

- [Better Auth 官方文档](https://www.better-auth.com/)
- [Next.js 15 文档](https://nextjs.org/docs)
- [Prisma 文档](https://prisma.io/docs)
- [Stripe 集成指南](https://stripe.com/docs)

---

## 🤝 开发建议

1. **安全性**: 定期更新依赖，使用强密钥
2. **性能**: 合理使用数据库索引，优化查询
3. **监控**: 添加错误监控和性能监控
4. **测试**: 编写单元测试和集成测试
5. **文档**: 保持 API 文档更新

这个项目已经为你提供了企业级的认证和业务逻辑基础，你可以在此基础上快速开发你的具体业务功能！