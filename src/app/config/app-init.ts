import { AppconfigService } from './../services/appconfig.service';
import { URLS } from './backend.api.urls';


export function appAuthInitializer(
    appconfigService: AppconfigService,
): () => Promise<any> {
    return (): Promise<any> => {
        return new Promise(async (resolve, reject) => {        
            try {
                // GETTING URLS FROM app.config.json
                await appconfigService.getConfiguration().then((res: any) => {
                    URLS.HTTP_BASE_URL = res.BACKEND_SETTINGS.HTTP_BASE_URL;
                })
                resolve();
            }
            catch (error) {
                reject(error)
            }
        })
    }
}


