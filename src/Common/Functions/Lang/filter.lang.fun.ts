import { AnyObject } from "../../../@types/type";

export function localizeDatas<T extends AnyObject | AnyObject[]>(data: T, langHeader: string, fallbackLang: string = 'en'): T {
     const preferredLang = langHeader?.split(',')[0]?.toLowerCase().trim() === 'ar' ? 'ar' : 'en';

     const localizeObject = (obj: AnyObject): AnyObject => {
          const result: AnyObject = {};

          for (const key in obj) {
               const value = obj[key];
               if (value && typeof value === 'object' && ('ar' in value || 'en' in value)) {
                    result[key] = value[preferredLang] || value[fallbackLang] || '';
               } else {
                    result[key] = value;
               }
          }

          return result;
     };

     if (Array.isArray(data)) {
          return data.map(localizeObject) as T;
     }

     return localizeObject(data) as T;
}
