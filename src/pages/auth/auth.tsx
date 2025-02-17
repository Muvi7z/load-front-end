import {ComponentProps, FC, useEffect, useState} from "react";
import {Button, Card, FormControl, FormLabel, TextField, Typography} from "@mui/material";
import styles from "./auth.module.scss"
import {useAppDispatch, useAppSelector} from "../../redux/hooks.ts";
import {setName, setUser, signUp} from "../../redux/user/userSlice.ts";
import {useNavigate} from "react-router-dom";

type AuthPropsType = ComponentProps<"div">

const Auth: FC<AuthPropsType> = ({}) => {
    const [username, setUsername] = useState<string>("")
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {token, error} = useAppSelector((state) => state.user)
    const [ errorMessage, setErrorMessage] = useState("")


    useEffect(() => {
        const userStr = localStorage.getItem('user')
        if (userStr) {
            const retrievedUser = JSON.parse(userStr);
            dispatch(setUser(retrievedUser))
            navigate("/")
            console.log("redirect", userStr)
        }
    }, [])

    useEffect(() => {
        if(token) {
            navigate("/")
        }
    }, [token]);

    const handlers = {
        singIn: () => {
            dispatch(signUp(username))
            dispatch(setName(username))
            //navigate("/")
        }
    }

    return (
        <div className={styles.wrapper}>
            <Card variant="outlined" className={styles.container}>
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)'}}
                    >
                        Sign in
                    </Typography>
                    <FormControl>
                        <FormLabel>Username</FormLabel>
                        <TextField
                            autoFocus
                            required
                            fullWidth
                            variant="outlined"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </FormControl>
                <Typography
                    sx={{width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)'}}
                >
                    {}
                </Typography>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    onClick={handlers.singIn}
                >
                    Sign in
                </Button>
            </Card>

        </div>
    )
}

export default Auth;