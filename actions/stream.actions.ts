'use server';

import { currentUser } from '@clerk/nextjs/server';
import { StreamClient } from '@stream-io/node-sdk';

const STREAM_API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const STREAM_API_SECRET = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async () => {
  const user = await currentUser();

  if (!user) throw new Error('User is not authenticated');
  if (!STREAM_API_KEY) throw new Error('Stream API key secret is missing');
  if (!STREAM_API_SECRET) throw new Error('Stream API secret is missing');

  const streamClient = new StreamClient(STREAM_API_KEY, STREAM_API_SECRET);

  const expirationTime = Math.floor(Date.now() / 1000) + 3600;
  const issuedAt = Math.floor(Date.now() / 1000) - 60;

  const token = streamClient.createToken(user.id, expirationTime, issuedAt);

  return token;
};


/*NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_c3R1bm5pbmctYXNwLTAuY2xlcmsuYWNjb3VudHMuZGV2JA
CLERK_SECRET_KEY=sk_test_7LrQWNiqh73V0BQt8y3BvgaE7XJPf7eBse1fdGz7iU

NEXT_PUBLIC_STREAM_API_KEY=e96q5scdzyek
STREAM_SECRET_KEY=7c9fv4c654nm6576wedb5pdx2g63nhqsy7k5swdvmrxtnzrw36jcs4ddkmaxtqua

*/