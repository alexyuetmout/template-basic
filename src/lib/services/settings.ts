import { db } from "@/lib/db";
import { AppSetting } from "@prisma/client";

export class SettingsService {
  static async getSetting(key: string): Promise<AppSetting | null> {
    return db.appSetting.findUnique({
      where: { key },
    });
  }

  static async getSettingValue(key: string, defaultValue?: string): Promise<string | null> {
    const setting = await this.getSetting(key);
    return setting?.isEnabled ? setting.value : defaultValue || null;
  }

  static async getAllSettings(): Promise<AppSetting[]> {
    return db.appSetting.findMany({
      orderBy: { key: "asc" },
    });
  }

  static async getEnabledSettings(): Promise<AppSetting[]> {
    return db.appSetting.findMany({
      where: { isEnabled: true },
      orderBy: { key: "asc" },
    });
  }

  static async setSetting(
    key: string,
    value: string,
    description?: string,
    isEnabled: boolean = true
  ): Promise<AppSetting> {
    return db.appSetting.upsert({
      where: { key },
      update: {
        value,
        description,
        isEnabled,
      },
      create: {
        key,
        value,
        description,
        isEnabled,
      },
    });
  }

  static async updateSetting(
    key: string,
    updates: Partial<Pick<AppSetting, "value" | "description" | "isEnabled">>
  ): Promise<AppSetting> {
    return db.appSetting.update({
      where: { key },
      data: updates,
    });
  }

  static async enableSetting(key: string): Promise<AppSetting> {
    return this.updateSetting(key, { isEnabled: true });
  }

  static async disableSetting(key: string): Promise<AppSetting> {
    return this.updateSetting(key, { isEnabled: false });
  }

  static async deleteSetting(key: string): Promise<void> {
    await db.appSetting.delete({
      where: { key },
    });
  }

  // Helper methods for common settings
  static async getNumericSetting(key: string, defaultValue: number = 0): Promise<number> {
    const value = await this.getSettingValue(key);
    return value ? parseInt(value, 10) || defaultValue : defaultValue;
  }

  static async getBooleanSetting(key: string, defaultValue: boolean = false): Promise<boolean> {
    const value = await this.getSettingValue(key);
    return value ? value.toLowerCase() === "true" : defaultValue;
  }

  // Pre-defined settings
  static async initializeDefaultSettings(): Promise<void> {
    const defaultSettings = [
      {
        key: "points_expiry_months",
        value: "12",
        description: "Number of months after which one-time points expire",
        isEnabled: true,
      },
      {
        key: "max_points_per_order",
        value: "1000",
        description: "Maximum points that can be earned per order",
        isEnabled: true,
      },
      {
        key: "subscription_cancellation_allowed",
        value: "true",
        description: "Whether users can cancel their own subscriptions",
        isEnabled: true,
      },
      {
        key: "email_notifications_enabled",
        value: "true",
        description: "Whether email notifications are enabled",
        isEnabled: true,
      },
      {
        key: "maintenance_mode",
        value: "false",
        description: "Whether the application is in maintenance mode",
        isEnabled: false,
      },
    ];

    for (const setting of defaultSettings) {
      await db.appSetting.upsert({
        where: { key: setting.key },
        update: {},
        create: setting,
      });
    }
  }
}