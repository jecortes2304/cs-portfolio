import {notFound} from 'next/navigation';
import {headers} from 'next/headers';

// Define tus idiomas soportados
const locales = ['en', 'es'] as const;

async function getRequestConfig() {
    const headersList = await headers();
    const locale = headersList.get('X-NEXT-INTL-LOCALE') || 'en';

    if (!locales.includes(locale as any)) notFound();

    return {
        locale,
        messages: (await import(`../messages/${locale}.json`)).default
    };
}

export default getRequestConfig;
