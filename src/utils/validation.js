export const validation = {
  editTitle: (string, setValidError, setValidErrorMessage) => {
    const maxLength = 160;
    if (string.length > maxLength) {
      setValidError(true);
      setValidErrorMessage(
        `You have exceeded the character limit by ${string.length - maxLength} characters`
      );
    } else {
      setValidError(false);
      setValidErrorMessage('');
    }
  }
}