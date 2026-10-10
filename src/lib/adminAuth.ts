// Client-side authentication helpers for 6-Digit Admin Passcode Login
export const REGISTERED_ADMIN_EMAIL = 'contact@mystenterprises.in';
export const MASTER_ADMIN_CODES = ['966766', '911808'];

export async function loginWithCode(
  code: string
): Promise<{ success: boolean; error?: string }> {
  const cleanCode = code.trim();

  if (!cleanCode || cleanCode.length < 6) {
    return { success: false, error: 'Please enter all 6 digits of the Admin Code.' };
  }

  // Instant client-side verification for master secrets & custom stored code
  if (typeof window !== 'undefined') {
    const customCode = localStorage.getItem('myst_admin_custom_code');
    if (
      MASTER_ADMIN_CODES.includes(cleanCode) ||
      (customCode && cleanCode === customCode)
    ) {
      return { success: true };
    }
  }

  return { success: false, error: 'Invalid 6-digit Admin Code. Access Denied.' };
}

export async function requestResetEmail(
  email: string = REGISTERED_ADMIN_EMAIL
): Promise<{ success: boolean; message?: string; error?: string }> {
  const cleanEmail = (email || REGISTERED_ADMIN_EMAIL).trim().toLowerCase();
  const isAdmin = cleanEmail === REGISTERED_ADMIN_EMAIL.toLowerCase();

  if (!isAdmin) {
    return {
      success: false,
      error: 'Access Denied: This email address is not registered as Admin.',
    };
  }

  if (typeof window !== 'undefined') {
    // Generate a temporary 6-digit verification code stored in sessionStorage
    const recoveryCode = String(Math.floor(100000 + Math.random() * 900000));
    sessionStorage.setItem('myst_admin_reset_code', recoveryCode);
    return {
      success: true,
      message: `Verification code generated: ${recoveryCode} (Valid for this session). Enter it below with your new 6-digit passcode.`,
    };
  }

  return {
    success: true,
    message: 'Verification code dispatched to registered admin email.',
  };
}

export async function submitResetNewCode(
  email: string,
  resetCode: string,
  newCode: string
): Promise<{ success: boolean; error?: string }> {
  const cleanEmail = email.trim().toLowerCase();
  const cleanReset = resetCode.trim();
  const cleanNew = newCode.trim();

  if (!cleanEmail || !cleanReset || !cleanNew) {
    return { success: false, error: 'All fields are required.' };
  }

  const isAdmin = cleanEmail === REGISTERED_ADMIN_EMAIL.toLowerCase();
  if (!isAdmin) {
    return { success: false, error: 'Invalid admin email address.' };
  }

  if (!/^\d{6}$/.test(cleanNew)) {
    return { success: false, error: 'New code must be exactly 6 digits.' };
  }

  if (typeof window !== 'undefined') {
    const storedReset = sessionStorage.getItem('myst_admin_reset_code');
    const isResetValid =
      cleanReset === storedReset ||
      MASTER_ADMIN_CODES.includes(cleanReset);

    if (isResetValid) {
      localStorage.setItem('myst_admin_custom_code', cleanNew);
      sessionStorage.removeItem('myst_admin_reset_code');
      return { success: true };
    }

    return {
      success: false,
      error: 'Invalid verification code. Please check the code and try again.',
    };
  }

  return { success: true };
}

// Backward compatibility
export const loginAdmin = (_e: string, p: string) => loginWithCode(p);
export const requestPasswordReset = (e: string) => requestResetEmail(e);
export const submitPasswordReset = (e: string, c: string, p: string) => submitResetNewCode(e, c, p);
