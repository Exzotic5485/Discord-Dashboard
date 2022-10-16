import Axios from 'axios'
import { ErrorThrower } from './ErrorThrower'

export class AcsClient {
    private axios: any
    private account_access_token: string = ''
    private dbd_project_id: string = ''

    constructor({ account_access_token, dbd_project_id, api_url="https://actestbeta.site/api" }: { account_access_token: string, dbd_project_id: string, api_url?: string }) {
        this.account_access_token = account_access_token
        this.dbd_project_id = dbd_project_id

        this.axios = Axios.create({
            baseURL: api_url,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': account_access_token
            }
        })
    }

    public login = async () => {
        try{
            const res = await this.axios.get('/discord-dashboard/me')
            if(!res.data){
                ErrorThrower("Could not authorize with Assistants Center Services. Please try again later.")
            }else{
                if(res.data.error){
                    ErrorThrower(res.data.message)
                }else{
                    return res.data.you_are
                }
            }
        }catch (err: any){
            ErrorThrower("Seems like Assistants Center Services are offline at the moment. Please try again later or contact us. READING: " + err.message)
        }
    }

    public collectLicenseStatus = async () => {
        try{
            const res = await this.axios.get('/discord-dashboard/license/status')
            if(!res.data){
                ErrorThrower("Could not authorize with Assistants Center Services. Please try again later.")
            }else{
                if(res.data.error){
                    ErrorThrower(res.data.message)
                }else{
                    return res.data.license_status
                }
            }
        }catch (err: any){
            ErrorThrower("Seems like Assistants Center Services are offline at the moment. Please try again later or contact us. READING: " + err.message)
        }
    }
}
