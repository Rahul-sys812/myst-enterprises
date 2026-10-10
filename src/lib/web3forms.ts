// Web3Forms (https://web3forms.com) Email Service Integration for MYST Enterprises
// Allows static websites to dispatch real emails directly without a backend server.

export const WEB3FORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_KEY ||
  process.env.NEXT_PUBLIC_W3FORMS_KEY ||
  'd2feff07-2972-42b7-88d7-ce3dab88423a';

export interface Web3FormsSubmitData {
  name: string;
  email: string;
  phone?: string;
  business?: string;
  service?: string;
  message?: string;
  subject?: string;
  [key: string]: unknown;
}

export async function submitToWeb3Forms(
  data: Web3FormsSubmitData
): Promise<{ success: boolean; message: string; simulated?: boolean }> {
  const accessKey = (WEB3FORMS_ACCESS_KEY || 'd2feff07-2972-42b7-88d7-ce3dab88423a').trim();

  // If secret key is somehow missing
  if (!accessKey) {
    console.warn(
      '⚠️ [Web3Forms Notice] Access key is missing. Form data preview:',
      data
    );
    return {
      success: true,
      simulated: true,
      message: 'Brief submitted! Live email requires a Web3Forms access key.',
    };
  }

  try {
    const payload = {
      access_key: accessKey,
      subject:
        data.subject ||
        `[MYST Creative Brief] New Inquiry from ${data.name || 'Client'} (${data.business || 'New Project'})`,
      from_name: 'MYST Enterprises Client Portal',
      ...data,
    };

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (result.success) {
      return {
        success: true,
        message: result.message || 'Your project brief and email have been dispatched successfully!',
      };
    }

    return {
      success: false,
      message: result.message || 'Could not dispatch email. Please reach via WhatsApp.',
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error('Web3Forms dispatch error:', errorMsg);
    return {
      success: false,
      message: `Failed to dispatch inquiry: ${errorMsg}`,
    };
  }
}
