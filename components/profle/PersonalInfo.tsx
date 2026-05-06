"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import PhotoCaptureModal from "../ui/PhotoCaptureModel";
import { useToast } from "@/components/ui/Toast";
import { useAuth } from "@/hooks/auth/useAuth";
import { usePersonalInfo } from "@/hooks/personalInfo/usePersonalInfo";
import { PersonalInfo } from "@/lib/models/personalInfoDTO";
import { useLocalization } from "@/context/LocalizationContext";

const PersonalInfoCus: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const { submitPersonalInfo, fetchPersonalInfo } = usePersonalInfo();
  const { t } = useLocalization();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const [formData, setFormData] = useState<Partial<PersonalInfo>>({
    userType: "Farmer",
    first_name: "",
    last_name: "",
    nid: "",
    date_of_birth: "",
    gender: "Male",
    tin: "",
    bin: "",
    profile_image: null as File | null,
    nid_front: null as File | null,
    nid_back: null as File | null,
    phone: user?.mobile_number || "",
    thana: "",
    union: "",
    village: "",
    zilla: "",
    profile_image_url: "",
    nid_front_image_url: "",
    nid_back_image_url: "",
  });

  // Update phone when user context is available
  useEffect(() => {
    if (user?.mobile_number) {
      setFormData((prev) => ({
        ...prev,
        phone: user.mobile_number,
      }));
    }
  }, [user]);

   // Fetch personal info on mount
   useEffect(() => {
     const loadPersonalInfo = async () => {
       try {
         const response = await fetchPersonalInfo();
         if (response?.data) {
           const data = response.data as PersonalInfo;
           setFormData((prev) => ({
             ...prev,
             userType: data.userType || prev.userType,
             first_name: data.first_name || prev.first_name,
             last_name: data.last_name || prev.last_name,
             nid: data.nid || prev.nid,
             date_of_birth: data.date_of_birth || prev.date_of_birth,
             gender: data.gender || prev.gender,
             tin: data.tin || prev.tin,
             bin: data.bin || prev.bin,
             phone: data.phone || prev.phone,
             thana: data.thana || prev.thana,
             union: data.union || prev.union,
             village: data.village || prev.village,
             zilla: data.zilla || prev.zilla,
             profile_image_url: data.profile_image_url || prev.profile_image_url,
             nid_front_image_url: data.nid_front_image_url || prev.nid_front_image_url,
             nid_back_image_url: data.nid_back_image_url || prev.nid_back_image_url,
           }));
         }
       } catch (error) {
         // If no personal info exists yet, that's okay
         console.log('No existing personal info found');
       }
     };

     loadPersonalInfo();
   }, [fetchPersonalInfo]);

  const validateField = (name: string, value: unknown): string => {
    const strValue = typeof value === "string" ? value : "";
    const fileValue = value instanceof File ? value : null;

    switch (name) {
      case "first_name":
        return !strValue || strValue.trim() === ""
          ? t("profile.personalInfo.error.firstNameRequired")
          : "";
      case "last_name":
        return !strValue || strValue.trim() === ""
          ? t("profile.personalInfo.error.lastNameRequired")
          : "";
      case "phone":
        return !strValue || strValue.trim() === "" ? t("profile.personalInfo.error.phoneRequired") : "";
      case "nid":
        return !strValue || strValue.trim() === "" ? t("profile.personalInfo.error.nidRequired") : "";
      case "date_of_birth":
        return !strValue || strValue.trim() === ""
          ? t("profile.personalInfo.error.dateOfBirthRequired")
          : "";
      case "gender":
        return !strValue || strValue.trim() === "" ? t("profile.personalInfo.error.genderRequired") : "";
      case "tin":
        return !strValue || strValue.trim() === "" ? t("profile.personalInfo.error.tinRequired") : "";
      case "profile_image":
        return !fileValue ? t("profile.personalInfo.error.profileImageRequired") : "";
      case "nid_front":
        return !fileValue ? t("profile.personalInfo.error.nidFrontRequired") : "";
      case "nid_back":
        return !fileValue ? t("profile.personalInfo.error.nidBackRequired") : "";
      case "thana":
        return !strValue || strValue.trim() === "" ? t("profile.personalInfo.error.thanaRequired") : "";
      case "union":
        return !strValue || strValue.trim() === "" ? t("profile.personalInfo.error.unionRequired") : "";
      case "village":
        return !strValue || strValue.trim() === "" ? t("profile.personalInfo.error.villageRequired") : "";
      case "zilla":
        return !strValue || strValue.trim() === "" ? t("profile.personalInfo.error.zillaRequired") : "";
      default:
        return "";
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    // Update local state
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Mark as touched
    setTouched((prev) => ({ ...prev, [name]: true }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleFileChange = (
    file: File | null,
    property: keyof PersonalInfo,
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [property]: file,
    }));

    // Mark as touched
    setTouched((prev) => ({ ...prev, [property]: true }));

    // Clear error when file is selected
    if (errors[property]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[property];
        return newErrors;
      });
    }
  };

  const handlePhotoCapture = (file: File, property: keyof PersonalInfo) => {
    handleFileChange(file, property);
    console.log("Photo captured:", file);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    const fieldsToValidate: Array<{
      name: keyof Partial<PersonalInfo>;
      value: unknown;
    }> = [
      { name: "first_name", value: formData.first_name },
      { name: "last_name", value: formData.last_name },
      { name: "phone", value: formData.phone },
      { name: "nid", value: formData.nid },
      { name: "date_of_birth", value: formData.date_of_birth },
      { name: "gender", value: formData.gender },
      { name: "tin", value: formData.tin },
      { name: "profile_image", value: formData.profile_image },
      { name: "nid_front", value: formData.nid_front },
      { name: "nid_back", value: formData.nid_back },
      { name: "thana", value: formData.thana },
      { name: "union", value: formData.union },
      { name: "village", value: formData.village },
      { name: "zilla", value: formData.zilla },
    ];

    fieldsToValidate.forEach(({ name, value }) => {
      const error = validateField(name, value);
      if (error) {
        newErrors[name] = error;
      }
      // Mark all fields as touched on submit attempt
      setTouched((prev) => ({ ...prev, [name]: true }));
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      // Add shake animation to error fields
      const errorFields = document.querySelectorAll(".error-field");
      errorFields.forEach((field) => {
        field.classList.add("shake");
        setTimeout(() => field.classList.remove("shake"), 500);
      });
      showToast(t("profile.personalInfo.error.fillRequiredFields"), "error");
      return;
    }

    setIsProcessing(true);

    try {
      // Build payload as backend requires
      const payload = {
        userType: formData.userType || "Farmer",
        profile_image: formData.profile_image || null,
        first_name: formData.first_name || "",
        last_name: formData.last_name || "",
        nid: formData.nid || "",
        date_of_birth: formData.date_of_birth || "",
        gender: (formData.gender || "Male") as "Male" | "Female" | "Other",
        tin: formData.tin || "",
        bin: formData.bin || "",
        nid_front: formData.nid_front || null,
        nid_back: formData.nid_back || null,
        phone: formData.phone || "",
        thana: formData.thana || "",
        union: formData.union || "",
        village: formData.village || "",
        zilla: formData.zilla || "",
      };

      console.log("Submitting payload:", payload);

      // Use the personal info hook to submit data
      await submitPersonalInfo(payload);

      // Show success toast
      showToast(t("profile.personalInfo.success"), "success");
    } catch (error: unknown) {
      console.error("Submission error:", error);
      // Show error toast with message from backend
      const errorMessage =
        error instanceof Error
          ? error.message
          : t("profile.personalInfo.error.saveFailed");
      showToast(errorMessage, "error");
    } finally {
      setIsProcessing(false);
    }
  };

  const getInputClass = (fieldName: string) => {
    const hasError = errors[fieldName] && touched[fieldName];
    return `p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200 ${
      hasError ? "border-red-500 bg-red-50 error-field" : "border-emerald-300"
    }`;
  };
  

  return (
    <div className="rounded-md">
      <style jsx>{`
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          10%,
          30%,
          50%,
          70%,
          90% {
            transform: translateX(-4px);
          }
          20%,
          40%,
          60%,
          80% {
            transform: translateX(4px);
          }
        }
        .shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
       <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex lg:flex-col flex-col gap-3 items-start w-auto">
            <PhotoCaptureModal
              onPhotoCapture={(file) => handlePhotoCapture(file, "profile_image")}
              triggerText={t("profile.personalInfo.captureProfileImage")}
              title={t("profile.personalInfo.captureProfileImage")}
            />

            {(formData.profile_image || formData.profile_image_url) && (
              <div className="mt-4">
                <h3 className="text-center text-sm font-medium w-auto mb-4">
                  {t("profile.personalInfo.profileImage")}
                </h3>
                <Image
                  src={
                    formData.profile_image
                      ? URL.createObjectURL(formData.profile_image)
                      : formData.profile_image_url || ""
                  }
                  alt={t("profile.personalInfo.profileImage")}
                  width={128}
                  height={128}
                  className="w-32 h-32 object-cover border rounded-3xl"
                />
              </div>
            )}
           {errors.profile_image && touched.profile_image && (
             <p className="text-red-500 text-sm mt-1 animate-fade-in">
               {errors.profile_image}
             </p>
           )}
         </div>

         <div className="grid lg:grid-cols-2 gap-10">
           <div className="flex flex-col">
             <label
               htmlFor="first_name"
               className="mb-1 text-sm font-medium text-emerald-700"
             >
               {t("profile.personalInfo.firstName")}: *
             </label>
             <input
               type="text"
               id="first_name"
               name="first_name"
               className={getInputClass("first_name")}
               value={formData.first_name}
               onChange={handleInputChange}
             />
             {errors.first_name && touched.first_name && (
               <p className="text-red-500 text-sm mt-1 animate-fade-in">
                 {errors.first_name}
               </p>
             )}
           </div>
 
           <div className="flex flex-col">
             <label
               htmlFor="last_name"
               className="mb-1 text-sm font-medium text-emerald-700"
             >
               {t("profile.personalInfo.lastName")}: *
             </label>
             <input
               value={formData.last_name}
               onChange={handleInputChange}
               type="text"
               id="last_name"
               name="last_name"
               className={getInputClass("last_name")}
             />
             {errors.last_name && touched.last_name && (
               <p className="text-red-500 text-sm mt-1 animate-fade-in">
                 {errors.last_name}
               </p>
             )}
           </div>

           <div className="flex flex-col">
             <label
               htmlFor="phone"
               className="mb-1 text-sm font-medium text-emerald-700"
             >
               {t("profile.personalInfo.phone")}: *
             </label>
             <input
               type="text"
               id="phone"
               name="phone"
               className={`${getInputClass("phone")} bg-gray-50`}
               value={formData.phone}
               disabled
             />
             {errors.phone && touched.phone && (
               <p className="text-red-500 text-sm mt-1 animate-fade-in">
                 {errors.phone}
               </p>
             )}
           </div>
 
           <div className="flex flex-col">
             <label
               htmlFor="gender"
               className="mb-1 text-sm font-medium text-emerald-700"
             >
               {t("profile.personalInfo.gender")}: *
             </label>
             <select
               id="gender"
               name="gender"
               value={formData.gender}
               onChange={handleInputChange}
               className={getInputClass("gender")}
             >
               <option value="Male">{t("profile.personalInfo.male")}</option>
               <option value="Female">{t("profile.personalInfo.female")}</option>
               <option value="Other">{t("profile.personalInfo.other")}</option>
             </select>
             {errors.gender && touched.gender && (
               <p className="text-red-500 text-sm mt-1 animate-fade-in">
                 {errors.gender}
               </p>
             )}
           </div>

           <div className="flex flex-col">
             <label
               htmlFor="date_of_birth"
               className="mb-1 text-sm font-medium text-emerald-700"
             >
               {t("profile.personalInfo.dateOfBirth")}: *
             </label>
             <input
               value={formData.date_of_birth}
               onChange={handleInputChange}
               type="date"
               id="date_of_birth"
               name="date_of_birth"
               className={getInputClass("date_of_birth")}
             />
             {errors.date_of_birth && touched.date_of_birth && (
               <p className="text-red-500 text-sm mt-1 animate-fade-in">
                 {errors.date_of_birth}
               </p>
             )}
           </div>
 
           <div className="flex flex-col">
             <label
               htmlFor="nid"
               className="mb-1 text-sm font-medium text-emerald-700"
             >
               {t("profile.personalInfo.nidDescription")}: *
             </label>
             <input
               type="text"
               id="nid"
               name="nid"
               maxLength={9}
               value={formData.nid}
               onChange={handleInputChange}
               className={getInputClass("nid")}
             />
             {errors.nid && touched.nid && (
               <p className="text-red-500 text-sm mt-1 animate-fade-in">
                 {errors.nid}
               </p>
             )}
           </div>

            <div className="flex lg:flex-col flex-col gap-3 items-start w-auto">
              <PhotoCaptureModal
                onPhotoCapture={(file) => handlePhotoCapture(file, "nid_front")}
                triggerText={t("profile.personalInfo.captureNidFront")}
                title={t("profile.personalInfo.captureNidFront")}
              />
              {(formData.nid_front || formData.nid_front_image_url) && (
                <div className="mt-4">
                  <h3 className="text-center text-sm font-medium w-auto">
                    {t("profile.personalInfo.nidFront")}
                  </h3>
                  <Image
                    src={
                      formData.nid_front
                        ? URL.createObjectURL(formData.nid_front)
                        : formData.nid_front_image_url || ""
                    }
                    alt={t("profile.personalInfo.nidFront")}
                    width={128}
                    height={128}
                    className="w-32 h-32 object-cover border rounded"
                  />
                </div>
              )}
              {errors.nid_front && touched.nid_front && (
                <p className="text-red-500 text-sm mt-1 animate-fade-in">
                  {errors.nid_front}
                </p>
              )}
            </div>
 
            <div className="flex lg:flex-col flex-col gap-3 items-start w-auto">
              <PhotoCaptureModal
                onPhotoCapture={(file) => handlePhotoCapture(file, "nid_back")}
                triggerText={t("profile.personalInfo.captureNidBack")}
                title={t("profile.personalInfo.captureNidBack")}
              />
              {(formData.nid_back || formData.nid_back_image_url) && (
                <div className="mt-4">
                  <h3 className="text-center text-sm font-medium w-auto">
                    {t("profile.personalInfo.nidBack")}
                  </h3>
                  <Image
                    src={
                      formData.nid_back
                        ? URL.createObjectURL(formData.nid_back)
                        : formData.nid_back_image_url || ""
                    }
                    alt={t("profile.personalInfo.nidBack")}
                    width={128}
                    height={128}
                    className="w-32 h-32 object-cover border rounded"
                  />
                </div>
              )}
              {errors.nid_back && touched.nid_back && (
                <p className="text-red-500 text-sm mt-1 animate-fade-in">
                  {errors.nid_back}
                </p>
              )}
            </div>

           <div className="flex flex-col">
             <label
               htmlFor="tin"
               className="mb-1 text-sm font-medium text-emerald-700"
             >
               {t("profile.personalInfo.tin")}: *
             </label>
             <input
               value={formData.tin}
               onChange={handleInputChange}
               type="text"
               id="tin"
               name="tin"
               className={getInputClass("tin")}
             />
             {errors.tin && touched.tin && (
               <p className="text-red-500 text-sm mt-1 animate-fade-in">
                 {errors.tin}
               </p>
             )}
           </div>
 
            <div className="flex flex-col">
             <label
               htmlFor="bin"
               className="mb-1 text-sm font-medium text-emerald-700"
             >
               {t("profile.personalInfo.bin")}:
             </label>
             <input
               value={formData.bin}
               onChange={handleInputChange}
               type="text"
               id="bin"
               name="bin"
               className="p-2 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
             />
           </div>
        </div>

        {/* Address Fields */}
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="flex flex-col">
            <label
              htmlFor="thana"
              className="mb-1 text-sm font-medium text-emerald-700"
            >
              {t("profile.personalInfo.thana")}: *
            </label>
            <input
              type="text"
              id="thana"
              name="thana"
              value={formData.thana}
              onChange={handleInputChange}
              className={getInputClass("thana")}
            />
            {errors.thana && touched.thana && (
              <p className="text-red-500 text-sm mt-1 animate-fade-in">
                {errors.thana}
              </p>
            )}
          </div>
 
          <div className="flex flex-col">
            <label
              htmlFor="union"
              className="mb-1 text-sm font-medium text-emerald-700"
            >
              {t("profile.personalInfo.union")}: *
            </label>
            <input
              type="text"
              id="union"
              name="union"
              value={formData.union}
              onChange={handleInputChange}
              className={getInputClass("union")}
            />
            {errors.union && touched.union && (
              <p className="text-red-500 text-sm mt-1 animate-fade-in">
                {errors.union}
              </p>
            )}
          </div>
 
          <div className="flex flex-col">
            <label
              htmlFor="village"
              className="mb-1 text-sm font-medium text-emerald-700"
            >
              {t("profile.personalInfo.village")}: *
            </label>
            <input
              type="text"
              id="village"
              name="village"
              value={formData.village}
              onChange={handleInputChange}
              className={getInputClass("village")}
            />
            {errors.village && touched.village && (
              <p className="text-red-500 text-sm mt-1 animate-fade-in">
                {errors.village}
              </p>
            )}
          </div>
 
          <div className="flex flex-col">
            <label
              htmlFor="zilla"
              className="mb-1 text-sm font-medium text-emerald-700"
            >
              {t("profile.personalInfo.zilla")}: *
            </label>
            <input
              type="text"
              id="zilla"
              name="zilla"
              value={formData.zilla}
              onChange={handleInputChange}
              className={getInputClass("zilla")}
            />
            {errors.zilla && touched.zilla && (
              <p className="text-red-500 text-sm mt-1 animate-fade-in">
                {errors.zilla}
              </p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center pt-6">
          <button
            type="submit"
            disabled={isProcessing}
            className={`
              px-8 py-3 rounded-xl font-medium text-white
              flex items-center gap-3 transition-all duration-200
              ${
                isProcessing
                  ? "bg-emerald-400 cursor-not-allowed opacity-80"
                  : "bg-emerald-600 hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-600/20"
              }
            `}
          >
            {isProcessing ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                 <span>{t("profile.personalInfo.processing")}</span>
              </>
            ) : (
              <>
                <svg
                  className="h-5 w-5 rotate-90"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
                 <span>{t("profile.personalInfo.submit")}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfoCus;
