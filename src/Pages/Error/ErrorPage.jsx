import { Button, Icon } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styles from '../../Styles/Global.module.css';
import {env} from '../../App/config';

function ErrorPage(){

    const navigate = useNavigate()



    return(
        <div className={ `${styles.centerdiv} ${styles.flexcolumn}` } >
            <h1 className={styles.title404}>
                4 <Icon >error</Icon> 4
            </h1>
            <Button onClick={()=>{ navigate(env.BASE_PATH)}}>Voltar</Button>
        </div>
    )
}

export default ErrorPage

