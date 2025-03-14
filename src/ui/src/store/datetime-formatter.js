import { format } from 'date-fns';
import { enIN, de, fr } from 'date-fns/locale';
import { utcToZonedTime } from 'date-fns-tz';

export const getFormattedDate = (actualDate) => {
    const locale = navigator.language || 'en-US'; // Default to 'en-US' if unavailable

    let localeObj;
    switch (locale) {
        case 'de-DE':
            localeObj = de;
            break;
        case 'fr-FR':
            localeObj = fr;
            break;
        default:
            localeObj = enIN;
            break;
    }

    // Define IST time zone
    const IST = 'Asia/Kolkata';

    const timestamp = new Date(actualDate).getTime();
    const date = new Date(timestamp + 19800000); // For IST Time

    // Convert the UTC date to IST
    const zonedDate = utcToZonedTime(date, IST);

    // Format the IST date using date-fns with the system locale
    const formattedDate = format(zonedDate, 'dd/MM/yyyy HH:mm', { locale: localeObj });

    return formattedDate;
}

export const formatStringDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
};