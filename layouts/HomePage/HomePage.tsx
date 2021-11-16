/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-09-17
 * Time: 11:55
 * About:
 *
 */
import {useEffect, useState} from "react"
import {
    IHomePage
} from './interface'
import Container from "../../components/Container"
import classes from './HomePage.module.scss'
import PageMotionWrap from "../../components/PageMotionWrap"
import {Notification} from "../../components/Notification"
import {TINotificationType} from "../../components/Notification/interface"
import {NextPage} from "next"
import Textarea from "../../components/Textarea"
import {
    cryptoBase64,
    decryptBase64,
    copyToClipboard, isBase64
} from '../../utils'
import Switch from "../../components/Switch";
import Button from "../../components/Button";
import Input from "../../components/Input";
import {IInputCallbackParams} from "../../components/Input/interface";
import ProgressBar from "../../components/ProgressBar/ProgressBar";






const HomePage: NextPage<IHomePage> = ({
                                           title,
                                           info,
}) => {

    const [isLoading,setIsLoading] = useState<boolean>(false)
    const [isVisible,setIsVisible] = useState<boolean>(false)

    const [showAlert,setShowAlert] = useState<boolean>(false)
    const [alertType,setAlertType] = useState<TINotificationType>('success')
    const [alertMessage,setAlertMessage] = useState<string|undefined>(undefined)
    const [convertedData,setConvertedData] = useState<string|undefined>(undefined)
    const [enOrDeCode,setEnOrDeCode] = useState<boolean>(false)
    const [autoDetect,setAutoDetect] = useState<boolean>(true)

    const [defaultValue,setDefaultValue] = useState<string|undefined>(undefined)



    useEffect(() =>{

        if(!showAlert){
            return
        }

        setTimeout(() => setShowAlert(prev => !prev), 5000 )

    },[showAlert])

    
    const direction = (v:string) => enOrDeCode ? decryptBase64(v) : cryptoBase64(v)

    const directionAuto = (v:string) => {

        const testBase64 = isBase64(v.replace(/\s/g,'').replace(/\r?\n/g, ""))

        setEnOrDeCode(testBase64)


        return testBase64 ? decryptBase64(v) : cryptoBase64(v)

    }

    const handleOnChange = (v:string) => setDefaultValue(v)

    useEffect(() => {
        if(!defaultValue){
            return
        }

        const data = autoDetect ? directionAuto(defaultValue) : direction(defaultValue)

        setConvertedData(data)

    },[enOrDeCode,defaultValue])


    const handleClickConvertedData = () => {

        if(!convertedData){
            return
        }

        setShowAlert(true)
        setAlertMessage(convertedData ? 'copied!' : `the data hasn't been copied!`)
        setAlertType(convertedData ? 'success' : 'error')

        copyToClipboard(convertedData || '')
    }

    const handleSwitch = () => setEnOrDeCode(prev => !prev)

    const handlesetAutoDetect = () => setAutoDetect(prev => !prev)


    const getBase64 = (file:File)=> {

        if(!file){
            return
        }

        let baseURL: string  = ""

        const reader = new FileReader()

        reader.readAsText(file)

        reader.onload = () => {
            baseURL = String(reader.result)
            setDefaultValue(baseURL)
            setIsLoading(false)
        }

    }


    const handleGetFile = (v:IInputCallbackParams) =>{

        if(typeof v !== "object"){
            return
        }
        setIsLoading(true)
        const file:File = v[0]

        if(file?.size > 2193613){
            setShowAlert(true)
            setAlertMessage( `Error: max 2mb`)
            setAlertType( 'error')
            setIsLoading(false)
            return;
        }


        getBase64(file)
    }



    return <>
        <Notification
            position={'top-right'}
            type={alertType}
            open={showAlert}
            message={alertMessage}
        />

            <Container
                showNewNoteButton
            >
                <div className={classes.HomePage}>
                    <div className={classes.info}>
                        <div className={classes.infoWrap}>
                        <PageMotionWrap
                                        animation={{
                                            visible: { opacity: 1, x: 0, y: 0 },
                                            hidden: { opacity: 0, x: 0, y: -50 }
                                        }}
                                        duration={.8}
                                    >
                                    <h3 className={`title`}>{title}</h3>
                        </PageMotionWrap>
                        <PageMotionWrap
                                    animation={{
                                        visible: { opacity: 1, x: 0, y: -10  },
                                        hidden: { opacity: 0, x: 0, y:10 }
                                    }}
                                    duration={1.5}
                                >
                                    <div
                                        dangerouslySetInnerHTML={{__html: info || ''}}
                                    />

                                </PageMotionWrap>
                        </div>
                    </div>
                    <div className={classes.notepad}>

                                             <PageMotionWrap
                                                    toggle={isVisible}
                                                    duration={.8}
                                                    animation={{
                                                        visible:(height = 1000) => ({
                                                            clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,

                                                        }),
                                                        hidden: {
                                                            clipPath: "circle(0px at 0% 0%)",
                                                        }
                                                    }}
                                             >
                                                 {
                                                     isLoading
                                                         ? <ProgressBar/>
                                                         : <div className={classes.notepadWrap}>
                                                             <Textarea
                                                                 classTextarea={classes.textArea}
                                                                 placeholder={'Text Input'}
                                                                 onChange={handleOnChange}
                                                                 {...{defaultValue}}
                                                                 borderLight
                                                             />

                                                             <div className={classes.menu}>
                                                                 <Button
                                                                     name={'auto'}
                                                                     variant={autoDetect ? 'contained' : 'outlined'}
                                                                     callback={handlesetAutoDetect}
                                                                 />

                                                                 <div  className={classes.menuCenter}>
                                                                     <Switch
                                                                         lableOn={'encode'}
                                                                         lableOff={'decode'}
                                                                         toggle={enOrDeCode}
                                                                         callback={handleSwitch}
                                                                     />

                                                                 </div>

                                                                 <Input
                                                                     classWrap={classes.selectFile}
                                                                     type={'file'}
                                                                     onChange={handleGetFile}
                                                                 />
                                                             </div>


                                                             <div
                                                                 className={classes.convertedDataWrap}
                                                             >
                                                     <textarea
                                                         className={classes.convertedData}
                                                         value={convertedData}
                                                         // onClick={handleClickConvertedData}
                                                     />
                                                                 <div
                                                                     className={classes.clickTOcopy}
                                                                 >
                                                                     <Button
                                                                         name={`click to copy`}
                                                                         callback={handleClickConvertedData}
                                                                         variant={'outlined'}
                                                                     />

                                                                 </div>
                                                             </div>
                                                         </div>
                                                 }

                                             </PageMotionWrap>

                    </div>
                </div>
            </Container>
        </>
}


export default HomePage