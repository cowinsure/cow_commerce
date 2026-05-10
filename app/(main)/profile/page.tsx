"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/auth/useAuth";
import { cn } from "@/lib/theme/theme.config";
import {
  User as UserIcon,
  Phone,
  MapPin,
  Edit3,
  Shield,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import { usePersonalInfo } from "@/hooks/personalInfo/usePersonalInfo";
import PersonalInfoFarmer from "@/components/profle/PersonalInfo";
import PersonalInfoCus from "@/components/profle/PersonalInfo";
import { useLocalization } from "@/context/LocalizationContext";

export default function ProfilePage() {
  const { user } = useAuth();
  const { fetchPersonalInfo } = usePersonalInfo();
  const { t, locale } = useLocalization();
  const [loading] = useState(false);
  const [showPersonalInfo, setShowPersonalInfo] = useState(false);
  const [userName, setUserName] = useState<string>("");
  const [profileImageUrl, setProfileImageUrl] = useState<string>("");
  const [userAddress, setUserAddress] = useState<string>("");
  const [userDob, setUserDob] = useState<string>("");
  const [userGender, setUserGender] = useState<string>("");
  const [userTin, setUserTin] = useState<string>("");
  const mobile_number = user?.mobile_number;

  // Fetch personal info to get user details
  useEffect(() => {
    const loadPersonalInfo = async () => {
      try {
        const response = await fetchPersonalInfo();
        if (response?.data) {
          const data = response.data as {
            first_name?: string;
            last_name?: string;
            profile_image_url?: string;
            thana?: string;
            union?: string;
            village?: string;
            zilla?: string;
            date_of_birth?: string;
            gender?: string;
            tin?: string;
          };
          const name =
            `${data.first_name || ""} ${data.last_name || ""}`.trim();
          setUserName(name || t("profile.defaultUserName"));
          setProfileImageUrl(data.profile_image_url || "");

          // Build address from components
          const addressParts = [
            data.village,
            data.thana,
            data.union,
            data.zilla,
          ].filter(Boolean);
          if (addressParts.length > 0) {
            setUserAddress(addressParts.join(", "));
          }

          setUserDob(data.date_of_birth || "");
          setUserGender(data.gender || "");
          setUserTin(data.tin || "");
        }
      } catch (error) {
        // If no personal info exists yet, use default
        setUserName(t("profile.defaultUserName"));
        setProfileImageUrl("");
        setUserAddress("");
        setUserDob("");
        setUserGender("");
        setUserTin("");
      }
    };

    loadPersonalInfo();
  }, [fetchPersonalInfo, t]);

  const menuItems = [
    {
      icon: UserIcon,
      label: t("profile.menu.personalInfo"),
      description: t("profile.menu.personalInfoDescription"),
    },
    // {
    //   icon: Shield,
    //   label: "Security",
    //   description: "Password and security settings",
    //   href: "/profile/security",
    // },
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
    // {
    //   icon: MapPin,
    //   label: "Addresses",
    //   description: "Manage delivery addresses",
    //   href: "/profile/addresses",
    // },
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
    <div
      className=" bg-emerald-50/50 mt-10"
      lang={locale === "bn" ? "bn" : "en"}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-200/20/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-200/20  rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-screen-2xl mx-auto px-4 sm:px-8 py-8 pt-16 lg:pt-24 min-h-screen">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <h1 className="text-2xl lg:text-4xl font-bold text-emerald-900 mb-2">
            {t("profile.title")}
          </h1>
          <p className="text-zinc-600">{t("profile.description")}</p>
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
              <div className="flex md:gap-5 items-start flex-col md:flex-row mb-6">
                {/* Image */}
                <div className="relative mb-4">
                  {profileImageUrl ? (
                    <div className="w-28 h-28 rounded-2xl overflow-hidden border-2 border-emerald-200">
                      <img
                        src={profileImageUrl}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-28 h-28 bg-emerald-100/30 rounded-full flex items-center justify-center">
                      <UserIcon className="w-14 h-14 text-emerald-600" />
                    </div>
                  )}
                  {/* <button className="absolute bottom-0 right-0 w-9 h-9 bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-emerald-700 transition-colors">
                     <Edit3 className="w-4 h-4" />
                   </button> */}
                </div>
                {/* Name and Number */}
                <div className="md:mt-5">
                  <h2 className="text-xl font-bold text-emerald-900 mb-1">
                    {userName}
                  </h2>
                  {/* Phone - always shown */}
                  <div className="flex items-center justify-between gap-2 text-sm">
                    <div className="flex items-center gap-1">
                      <Phone className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="text-zinc-600">{mobile_number}</span>
                  </div>
                </div>
              </div>

              {/* User Details */}
              <div className="grid grid-cols-1 gap-4 md:gap-3 mb-">
                {/* Address - only show if data exists */}
                {userAddress && (
                  <div className="flex flex-col md:flex-row md:items-center justify-between text-sm">
                    <div className="flex items-center gap-1 md:gap-3">
                      <MapPin className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-700 font-medium">
                        {t("profile.address")}
                      </span>
                    </div>
                    <span className="text-zinc-600 font-medium">
                      {userAddress}
                    </span>
                  </div>
                )}

                {/* Date of Birth - only show if exists */}
                {userDob && (
                  <div className="flex flex-col md:flex-row md:items-center justify-between text-sm">
                    <div className="flex items-center gap-1 md:gap-3">
                      <svg
                        className="w-4 h-4 text-emerald-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="text-emerald-700 font-medium">
                        {t("profile.dateOfBirth")}
                      </span>
                    </div>
                    <span className="text-zinc-600 font-medium">{userDob}</span>
                  </div>
                )}

                {/* Gender - only show if exists */}
                {userGender && (
                  <div className="flex flex-col md:flex-row md:items-center justify-between text-sm">
                    <div className="flex items-center gap-1 md:gap-3">
                      <svg
                        className="w-4 h-4 text-emerald-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      <span className="text-emerald-700 font-medium">
                        {t("profile.gender")}
                      </span>
                    </div>
                    <span className="text-zinc-600 font-medium capitalize">
                      {userGender}
                    </span>
                  </div>
                )}

                {/* TIN - only show if exists */}
                {userTin && (
                  <div className="flex flex-col md:flex-row md:items-center justify-between text-sm">
                    <div className="flex items-center gap-1 md:gap-3">
                      <svg
                        className="w-4 h-4 text-emerald-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <span className="text-emerald-700 font-medium">
                        {t("profile.tin")}
                      </span>
                    </div>
                    <span className="text-zinc-600 font-medium">{userTin}</span>
                  </div>
                )}
              </div>

              {/* Account Type Badge */}
              <div className="flex flex-wrap gap-2">
                {/* {userData.is_superuser && (
                  <span className="px-3 py-1 bg-purple-100/30 text-purple-700 text-xs font-medium rounded-full">
                    Super Admin
                  </span>
                )} */}
                {/* {userData.is_insurecow_agent && (
                  <span className="px-3 py-1 bg-emerald-100/30 text-emerald-700 text-xs font-medium rounded-full">
                    InsureCow Agent
                  </span>
                )} */}
                {/* {userData.is_insurance_agent && (
                  <span className="px-3 py-1 bg-blue-100/30 text-blue-700 text-xs font-medium rounded-full">
                    Insurance Agent
                  </span>
                )}
                {userData.is_enterprise_agent && (
                  <span className="px-3 py-1 bg-orange-100/30 text-orange-700 text-xs font-medium rounded-full">
                    Enterprise Agent
                  </span>
                )} */}
                {/* {!userData.is_superuser &&
                  !userData.is_insurecow_agent &&
                  !userData.is_insurance_agent &&
                  !userData.is_enterprise_agent && (
                    <span className="px-3 py-1 bg-emerald-100/30 text-emerald-700 text-xs font-medium rounded-full">
                      Customer
                    </span>
                  )} */}
              </div>

              {/* Edit Profile Button */}
              {/* <button className="w-full py-3 px-4 bg-emerald-50/20 text-emerald-700 rounded-xl font-medium text-sm hover:bg-emerald-100-900/40 transition-colors flex items-center justify-center gap-2">
                <Edit3 className="w-4 h-4" />
                Edit Profile
              </button> */}
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
              <div className="p-6 border-emerald-100/30">
                {showPersonalInfo && (
                  <button
                    onClick={() => setShowPersonalInfo(false)}
                    className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 mb-5 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {t("profile.back")}
                    </span>
                  </button>
                )}
                <h3 className="text-lg font-semibold text-emerald-900">
                  {showPersonalInfo
                    ? t("profile.menu.personalInfo")
                    : t("profile.accountSettings")}
                </h3>
                <p className="text-sm text-zinc-500">
                  {showPersonalInfo
                    ? t("profile.menu.personalInfoDescription")
                    : t("profile.accountSettingsDescription")}
                </p>
              </div>

              <div className="divide-y divide-emerald-100/30">
                <AnimatePresence mode="wait">
                  {!showPersonalInfo ? (
                    <motion.div
                      key="menu"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, transition: { duration: 0.3 } }}
                      className="divide-y divide-emerald-100/30"
                    >
                      {menuItems.map((item, index) => {
                        const IconComponent = item.icon;
                        return (
                          <motion.div
                            key={item.label}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              delay: 0.3 + index * 0.05,
                              duration: 0.3,
                            }}
                          >
                            <button
                              onClick={() => setShowPersonalInfo(true)}
                              className={cn(
                                "flex items-center gap-4 p-4 sm:p-6 w-full text-left cursor-pointer group",
                                "transition-all duration-500 ease-out",
                                "hover:bg-emerald-900 hover:shadow-lg hover:shadow-emerald-900/20",
                                "active:scale-[0.98]",
                              )}
                            >
                              {/* Icon Container with morphing background */}
                              <div className="relative w-12 h-12 shrink-0">
                                {/* Background that expands on hover */}
                                <div className="absolute inset-0 bg-emerald-100/30 rounded-xl transition-all duration-500 ease-out group-hover:bg-emerald-600 group-hover:rounded-2xl group-hover:scale-110" />

                                {/* Icon with rotation and scale */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <IconComponent className="w-5 h-5 text-emerald-600 transition-all duration-500 ease-out group-hover:text-emerald-100 group-hover:scale-110 group-hover:rotate-3" />
                                </div>

                                {/* Subtle glow effect */}
                                <div className="absolute inset-0 rounded-xl bg-emerald-400/0 blur-lg transition-all duration-500 group-hover:bg-emerald-400/20" />
                              </div>

                              {/* Text Content with staggered reveals */}
                              <div className="flex-1 min-w-0 space-y-1">
                                <p className="font-medium text-emerald-900 transition-all duration-500 ease-out group-hover:text-emerald-400 group-hover:translate-x-1">
                                  {item.label}
                                </p>
                                <p className="text-sm text-zinc-500 transition-all duration-500 delay-75 ease-out group-hover:text-zinc-300 group-hover:translate-x-1 truncate">
                                  {item.description}
                                </p>
                              </div>

                              {/* Animated Chevron with slide and color shift */}
                              <div className="relative shrink-0 w-5 h-5 overflow-hidden">
                                <ChevronRight className="w-5 h-5 text-zinc-400 absolute transition-all duration-500 ease-out group-hover:text-emerald-400 group-hover:translate-x-1" />
                                <ChevronRight className="w-5 h-5 text-emerald-400 absolute -translate-x-5 opacity-0 transition-all duration-500 ease-out group-hover:translate-x-1 group-hover:opacity-100" />
                              </div>
                            </button>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="personal-info"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="p-6"
                    >
                      <PersonalInfoCus />
                    </motion.div>
                  )}
                </AnimatePresence>
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
