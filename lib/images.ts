export function toProdUrl(url: string): string {
    const domain = process?.env?.DOMAIN ?? "https://www.scottyob.com"

    const existing = new URL(url, domain);
    return domain + existing.pathname;
}