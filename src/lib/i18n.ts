export async function loadTranslations(locale: string) {
	try {
		return (await import(`../locales/${locale}.json`)).default
	} catch {
		return (await import(`../locales/id.json`)).default
	}
}
