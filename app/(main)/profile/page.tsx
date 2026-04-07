"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/auth/useAuth";
import { cn } from "@/lib/theme/theme.config";
import {
  User as UserIcon,
  Mail,
  Phone,
  MapPin,
  Edit3,
  Shield,
  Bell,
  CreditCard,
  Settings,
  LogOut,
  ChevronRight,
  Sprout,
} from "lucide-react";
import Link from "next/link";
import { User } from "@/lib/models/authDTO";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(false);

  // Mock user data for display (in real app, this would come from API)
  const userData = user || {
    role: "user",
    is_insurecow_agent: false,
    is_insurance_agent: false,
    is_enterprise_agent: false,
    is_superuser: false,
  };

  const menuItems = [
    {
      icon: UserIcon,
      label: "Personal Information",
      description: "Update your personal details",
      href: "/profile/edit",
    },
    {
      icon: Shield,
      label: "Security",
      description: "Password and security settings",
      href: "/profile/security",
    },
    // {
    //   icon: CreditCard,
    //   label: "Payment Methods",
    //   description: "Manage your payment options",
    //   href: "/profile/payment",
    // },
    // {
    //   icon: Bell,
    //   label: "Notifications",
    //   description: "Configure notification preferences",
    //   href: "/profile/notifications",
    // },
    {
      icon: MapPin,
      label: "Addresses",
      description: "Manage delivery addresses",
      href: "/profile/addresses",
    },
    // {
    //   icon: Settings,
    //   label: "Settings",
    //   description: "App preferences and configuration",
    //   href: "/profile/settings",
    // },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-emerald-50/50 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-emerald-200 rounded-full" />
          <div className="h-4 w-32 bg-emerald-200 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className=" bg-emerald-50/50 mt-10">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-200/20/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-200/20/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-screen-2xl mx-auto px-4 sm:px-8 py-8 pt-24 min-h-screen">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-emerald-900 mb-2">
            My Profile
          </h1>
          <p className="text-zinc-600">
            Manage your account settings and preferences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="lg:col-span-4"
          >
            <div className="bg-white rounded-3xl p-6 shadow-lg shadow-emerald-900/5 border border-emerald-100/30">
              {/* Avatar */}
              <div className="flex flex-col items-center mb-6">
                <div className="relative mb-4">
                  <div className="w-28 h-28 bg-emerald-100/30 rounded-full flex items-center justify-center">
                    <UserIcon className="w-14 h-14 text-emerald-600" />
                  </div>
                  <button className="absolute bottom-0 right-0 w-9 h-9 bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-emerald-700 transition-colors">
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
                <h2 className="text-xl font-bold text-emerald-900 mb-1">
                  User Account
                </h2>
                <p className="text-sm text-zinc-500">
                  {userData.role === "user" ? "Customer" : userData.role}
                </p>
              </div>

              {/* User Details */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-emerald-600" />
                  <span className="text-zinc-600">user@example.com</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <span className="text-zinc-600">+1 234 567 8900</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span className="text-zinc-600">Bangladesh</span>
                </div>
              </div>

              {/* Account Type Badge */}
              <div className="flex flex-wrap gap-2 mb-6">
                {userData.is_superuser && (
                  <span className="px-3 py-1 bg-purple-100/30 text-purple-700 text-xs font-medium rounded-full">
                    Super Admin
                  </span>
                )}
                {userData.is_insurecow_agent && (
                  <span className="px-3 py-1 bg-emerald-100/30 text-emerald-700 text-xs font-medium rounded-full">
                    InsureCow Agent
                  </span>
                )}
                {userData.is_insurance_agent && (
                  <span className="px-3 py-1 bg-blue-100/30 text-blue-700 text-xs font-medium rounded-full">
                    Insurance Agent
                  </span>
                )}
                {userData.is_enterprise_agent && (
                  <span className="px-3 py-1 bg-orange-100/30 text-orange-700 text-xs font-medium rounded-full">
                    Enterprise Agent
                  </span>
                )}
                {!userData.is_superuser &&
                  !userData.is_insurecow_agent &&
                  !userData.is_insurance_agent &&
                  !userData.is_enterprise_agent && (
                    <span className="px-3 py-1 bg-emerald-100/30 text-emerald-700 text-xs font-medium rounded-full">
                      Customer
                    </span>
                  )}
              </div>

              {/* Edit Profile Button */}
              <button className="w-full py-3 px-4 bg-emerald-50/20 text-emerald-700 rounded-xl font-medium text-sm hover:bg-emerald-100-900/40 transition-colors flex items-center justify-center gap-2">
                <Edit3 className="w-4 h-4" />
                Edit Profile
              </button>
            </div>
          </motion.div>

          {/* Menu Items */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="lg:col-span-8"
          >
            <div className="bg-white rounded-3xl shadow-lg shadow-emerald-900/5 border border-emerald-100/30 overflow-hidden">
              <div className="p-6 border-b border-emerald-100/30">
                <h3 className="text-lg font-semibold text-emerald-900">
                  Account Settings
                </h3>
                <p className="text-sm text-zinc-500">
                  Manage your account preferences
                </p>
              </div>

              <div className="divide-y divide-emerald-100/30">
                {menuItems.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.05, duration: 0.3 }}
                    >
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-4 p-4 sm:p-6",
                          "hover:bg-emerald-50-900/20",
                          "transition-colors duration-200",
                        )}
                      >
                        <div className="w-12 h-12 bg-emerald-100/30 rounded-xl flex items-center justify-center flex-shrink-0">
                          <IconComponent className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-emerald-900">
                            {item.label}
                          </p>
                          <p className="text-sm text-zinc-500 truncate">
                            {item.description}
                          </p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-zinc-400 flex-shrink-0" />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Logout Button */}
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-6"
            >
              <button
                onClick={async () => {
                  await logout();
                  window.location.href = "/";
                }}
                className={cn(
                  "w-full flex items-center gap-4 p-4 sm:p-6",
                  "bg-red-50/10 rounded-3xl",
                  "hover:bg-red-100-900/20",
                  "transition-colors duration-200",
                  "border border-red-100/30",
                )}
              >
                <div className="w-12 h-12 bg-red-100/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  <LogOut className="w-5 h-5 text-red-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-red-700">Log Out</p>
                  <p className="text-sm text-red-500">
                    Sign out of your account
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-red-400" />
              </button>
            </motion.div> */}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
