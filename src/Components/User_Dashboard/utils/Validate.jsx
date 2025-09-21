
export function validateFeedbackForm(form) {
  const errors = {};
  const nameRegex = /^[A-Za-z\s]+$/;
  const subjectRegex = /^[A-Za-z\s]+$/;

  if (!nameRegex.test(form.service)) {
    errors.service = "Only alphabetic characters are allowed in name.";
  }

  if (!subjectRegex.test(form.subject)) {
    errors.subject = "Only alphabetic characters are allowed in subject.";
  }

  if (!form.message.trim()) {
    errors.message = "Message is required.";
  }

  return errors;
}
