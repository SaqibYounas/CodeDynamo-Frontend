const createMessage = (req) => {
  return `📝 *Service Request Info*:
🆔 ID: ${req.requestID}
👤 Name: ${req.name}
📞 WhatsApp: ${req.whatsapp}
🔖 Title: ${req.service}
📄 Description: ${req.description}`;
};

export const handleCopy = (req) => {
  const message = createMessage(req);
  navigator.clipboard.writeText(message).then(() => {
    alert(`✅ Copied to ${req.requestID} ${req.name} !`);
  });
};

export const handleShare = (req) => {
  const message = createMessage(req);
  const encodedMsg = encodeURIComponent(message);
  const whatsappURL = `https://wa.me/?text=${encodedMsg}`;
  window.open(whatsappURL, '_blank');
};
