import { useEffect } from "react";

export const useLocalFormStorage = ({
  formKey,
  form,
  setForm,
  messageRef,
  serviceRef,
  setCountryCode,
  setNumber,
}) => {
  useEffect(() => {
    const itemStr = localStorage.getItem(formKey);
    if (!itemStr) return;

    const item = JSON.parse(itemStr);
    const isExpired = Date.now() > item.expiry;

    if (isExpired) {
      localStorage.removeItem(formKey);
      return;
    }

    const data = item.value;

    // ⬇️ Refs handling
    if (messageRef?.current) messageRef.current.value = data.message;
    if (serviceRef?.current) serviceRef.current.value = data.service;

    // ⬇️ State handling
    if (setForm && form) {
      setForm({
        ...form,
        ...data,
      });
    }

    // ⬇️ WhatsApp logic for both cases
    if (data.whatsapp && setCountryCode && setNumber) {
      const code = data.whatsapp.match(/^\+\d+/)?.[0] || "+92";
      setCountryCode(code);
      setNumber(data.whatsapp);
    }
  }, []);
};
