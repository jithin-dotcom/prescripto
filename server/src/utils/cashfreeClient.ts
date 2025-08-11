



import axios from 'axios';


const clientId = process.env.CASHFREE_CLIENT_ID!;
const clientSecret = process.env.CASHFREE_CLIENT_SECRET!;
const baseUrl = 'https://payout-gamma.cashfree.com'; // Sandbox

let token: string | null = null;

export const getAuthToken = async () => {
  if (token) return token;

  try {
    console.log("Client ID:", clientId);
    console.log("Client Secret:", clientSecret);

    const response = await axios.post(`${baseUrl}/payout/v1/authorize`, {}, {
      headers: {
        'X-Client-Id': clientId,
        'X-Client-Secret': clientSecret,
      },
    });

    console.log("Cashfree Auth Response:", response.data);

    if (response.data.status === "SUCCESS") {
      token = response.data.data.token;
      return token;
    } else {
      throw new Error(response.data.message || "Auth failed");
    }
  } catch (error: any) {
    console.error("Cashfree Auth Error:", error.response?.data || error.message);
    throw new Error("Failed to get Cashfree token");
  }
};
