# 个人中心功能文档

## 概述

完整的个人中心功能，包含用户信息管理、安全设置、订单查看、积分管理、订阅管理和通知设置。

## 功能特性

### 📋 **个人信息管理** (`/profile`)
- 修改用户名
- 查看账户基本信息
- 显示注册时间和账户状态

### 🔒 **安全设置** (`/profile/security`)
- 修改密码功能
- 密码强度验证
- 安全状态监控

### 🛍️ **订单管理** (`/profile/orders`)
- 查看购买历史
- 订单状态跟踪
- 统计总订单数、消费金额、获得积分

### 💰 **积分中心** (`/profile/points`)
- 积分余额查看
- 积分使用历史
- 过期提醒
- 积分获得和消费记录

### 📅 **订阅管理** (`/profile/subscriptions`)
- 查看活跃订阅
- 取消订阅功能
- 订阅历史记录
- 计费周期管理

### 🔔 **通知设置** (`/profile/notifications`)
- 邮件通知偏好
- 推送通知设置
- 分类通知管理

## 文件结构

```
src/
├── app/profile/
│   ├── page.tsx                    # 个人信息页面
│   ├── security/page.tsx           # 安全设置页面
│   ├── orders/page.tsx             # 订单管理页面
│   ├── points/page.tsx             # 积分中心页面
│   ├── subscriptions/page.tsx      # 订阅管理页面
│   └── notifications/page.tsx      # 通知设置页面
├── components/profile/
│   └── ProfileLayout.tsx           # 个人中心布局组件
└── app/api/user/
    ├── profile/route.ts            # 用户信息API
    ├── change-password/route.ts    # 修改密码API
    └── notifications/route.ts      # 通知设置API
```

## API 路由

### 用户信息管理
- **GET** `/api/user/profile` - 获取用户信息
- **PUT** `/api/user/profile` - 更新用户信息

### 密码管理
- **POST** `/api/user/change-password` - 修改密码

### 通知设置
- **GET** `/api/user/notifications` - 获取通知设置
- **PUT** `/api/user/notifications` - 更新通知设置

### 订单相关（已存在）
- **GET** `/api/orders` - 获取用户订单
- **GET** `/api/points/balance` - 获取积分余额
- **GET** `/api/points/transactions` - 获取积分交易记录
- **GET** `/api/checkout/subscription` - 获取用户订阅

## 数据库变更

需要执行以下数据库迁移来支持新功能：

```sql
-- 添加 UserSettings 表
CREATE TABLE user_settings (
  id TEXT PRIMARY KEY,
  user_id TEXT UNIQUE NOT NULL,
  notification_settings JSONB,
  preferences JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 更新 TransactionType 枚举
ALTER TYPE transaction_type ADD VALUE 'PURCHASE';
ALTER TYPE transaction_type ADD VALUE 'SUBSCRIPTION';
```

或者使用 Prisma 迁移：

```bash
npx prisma migrate dev --name add-user-settings
```

## 使用方法

### 基本使用

```tsx
import { ProfileLayout } from "@/components/profile/ProfileLayout";

export default function MyProfilePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      <Header />
      <ProfileLayout>
        {/* 您的页面内容 */}
      </ProfileLayout>
      <Footer />
    </div>
  );
}
```

### 菜单配置

在 `ProfileLayout.tsx` 中的 `menuItems` 数组配置侧边栏菜单：

```tsx
const menuItems = [
  {
    title: "个人信息",
    href: "/profile",
    icon: User,
    description: "管理您的个人资料"
  },
  // ... 其他菜单项
];
```

## 组件特性

### 🎨 **响应式设计**
- 移动端优化
- 自适应布局
- 侧边栏折叠

### 🔄 **状态管理**
- 加载状态显示
- 错误处理
- 成功提示

### 🔐 **安全特性**
- 密码强度验证
- 表单验证
- API安全验证

### 💫 **用户体验**
- 平滑动画效果
- 直观的状态指示
- 友好的错误提示

## 样式定制

### 主题颜色
```css
/* 成功状态 */
.success {
  @apply bg-green-50 text-green-700 border-green-200;
}

/* 错误状态 */
.error {
  @apply bg-red-50 text-red-700 border-red-200;
}

/* 警告状态 */
.warning {
  @apply bg-yellow-50 text-yellow-700 border-yellow-200;
}
```

### 自定义菜单样式
```tsx
// 活跃状态
"bg-blue-50 text-blue-700 border-l-4 border-blue-700"

// 悬停状态
"text-gray-600 hover:text-gray-900 hover:bg-gray-100"
```

## 扩展功能

### 添加新的个人中心页面

1. 在 `/app/profile/` 下创建新页面
2. 在 `ProfileLayout.tsx` 中添加菜单项
3. 创建对应的 API 路由（如需要）

示例：
```tsx
// app/profile/preferences/page.tsx
export default function PreferencesPage() {
  return (
    <ProfileLayout>
      <div>
        <h1>偏好设置</h1>
        {/* 您的内容 */}
      </div>
    </ProfileLayout>
  );
}
```

### 自定义通知类型

在 `notifications/route.ts` 中修改 `defaultSettings`：

```tsx
const defaultSettings = {
  emailMarketing: false,
  emailSecurity: true,
  emailBilling: true,
  emailProducts: true,
  // 添加新的通知类型
  emailReports: false,
  pushReports: false,
};
```

## 权限控制

所有个人中心页面都需要用户登录：

```tsx
const session = await auth.api.getSession({
  headers: await headers(),
});

if (!session) {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
```

## 最佳实践

### 1. **错误处理**
- 始终提供友好的错误信息
- 使用try-catch包装API调用
- 显示适当的加载状态

### 2. **数据验证**
- 前端和后端都要验证数据
- 使用TypeScript类型检查
- 验证用户输入格式

### 3. **用户体验**
- 提供即时反馈
- 保存成功后显示确认信息
- 使用防抖处理频繁操作

### 4. **安全考虑**
- 密码相关操作需要当前密码验证
- 敏感信息不在前端存储
- API调用需要身份验证

## 故障排除

### 常见问题

1. **菜单不显示**
   - 检查路由是否正确配置
   - 确认 `usePathname()` 返回正确路径

2. **API调用失败**
   - 检查用户是否已登录
   - 验证API路由是否存在
   - 查看控制台错误信息

3. **样式问题**
   - 确认Tailwind CSS类名正确
   - 检查响应式断点设置
   - 验证暗黑模式支持

4. **数据库错误**
   - 运行 `npx prisma migrate dev`
   - 确认模型关系正确
   - 检查数据库连接

## Dashboard 迁移说明

### 🔄 **重要变更**
原来的 `/dashboard` 路由已经被重定向到个人中心 (`/profile`)，提供更完整和统一的用户体验。

### 🛠️ **自动处理**
- `/dashboard` 会自动重定向到 `/profile`
- 所有相关链接已更新
- 中间件确保平滑过渡

### 📋 **已更新的链接**
- 支付成功页面：`/dashboard` → `/profile`
- 订阅成功页面：`/dashboard` → `/profile`
- Header导航：`Dashboard` → `个人中心`
- 订单链接：`/orders` → `/profile/orders`
- 订阅管理：`/subscriptions` → `/profile/subscriptions`

### 🔧 **如果需要恢复Dashboard**
如果您的项目需要保留独立的Dashboard页面：

1. **删除重定向**：移除 `src/middleware.ts` 文件
2. **恢复Dashboard页面**：重新实现 `src/app/dashboard/page.tsx`
3. **更新链接**：将相关链接改回 `/dashboard`

### 💡 **推荐做法**
建议使用新的个人中心体系，它提供：
- 更好的用户体验
- 完整的功能覆盖
- 响应式设计
- 模块化架构

如需更多帮助，请查看代码注释或联系开发团队。