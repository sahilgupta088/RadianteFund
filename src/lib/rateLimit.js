export default function rateLimit(options) {
  const tokenCache = new Map();

  return {
    check: (limit, token) =>
      new Promise((resolve, reject) => {
        const tokenCount = tokenCache.get(token) || [0];
        if (tokenCount[0] === 0) {
          tokenCache.set(token, tokenCount);
        }
        tokenCount[0] += 1;

        const currentUsage = tokenCount[0];
        const isRateLimited = currentUsage > limit;

        if (isRateLimited) {
          return reject({
            status: 429,
            message: 'Rate limit exceeded',
          });
        }

        // Clean up the cache after the specified interval (e.g., 60 seconds)
        setTimeout(() => {
          tokenCount[0] -= 1;
        }, options.interval || 60000);

        return resolve();
      }),
  };
}
