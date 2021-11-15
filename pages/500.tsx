/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-09-17
 * Time: 11:45
 * About:
 *
 */

import {IErrorPage} from '../interfaceAndType/IErrorPage'
import {NextPage} from "next"
import {useAppSelector} from "../redux/hooks"
import {RootState} from "../redux/store"
import SEOHead from "../components/SEOHead"


const ErrorPage: NextPage<IErrorPage> = () => {

    const header = useAppSelector((state:RootState) => state.seo.header)
    const seo = header.filter(itm => itm.page === 'error').pop()



    return <>
        <SEOHead
            {...seo}
            type={'website'}
            twitter={{
                ...header,
                card:'summary_large_image',
                image:seo?.image
            }}
        />
        error 500
        </>
}

export default ErrorPage