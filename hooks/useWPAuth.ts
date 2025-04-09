export default function useWPAuth(){
    const auth = Buffer.from(
        `${process.env.WP_USERNAME}:${process.env.WP_ACCESS_TOKEN}`
      ).toString("base64");
      const headers = {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      };
    return {authToken: auth, authHeader: headers};
}
