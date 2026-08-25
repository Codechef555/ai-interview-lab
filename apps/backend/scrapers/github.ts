import axios from "axios";
//import { HttpsProxyAgent } from "https-proxy-agent";
//const httpsAgent = new HttpsProxyAgent(process.env.PROXY_URL!);

export async function scrapeGithub(username: string) {
    const userRepos = await axios.get(`https://api.github.com/users/${username}/repos`, {
        proxy: {
            host: "gw.dataimpulse.com",
            port: number,
            auth: {
                username: process.env.DATAIMPULSE_PROXY_USER!,
                password: process.env.DATAIMPULSE_PROXY_PASSWORD!,
            },
            protocol: "http"
        }
    });
    return userRepos.data.map((x: any) => ({
        description: x.description,
        name: x.name,
        fullName: x.full_name,
        starCount: x.stargazers_count
    }))

}