import { useState, useEffect } from "react"
import { LOGIN } from "../queries"
import { useMutation } from "@apollo/client"

const LoginForm = ({ token, setToken}) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [login, result] = useMutation(LOGIN)

    useEffect(() => {
        if ( result.data ) {
          const token = result.data.login.value
          setToken(token)
          localStorage.setItem("library-user-token", token)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [result.data])

    const submit = async (event) => {
        event.preventDefault()
        try{
            await login({ variables: {username, password} })
            setUsername("")
            setPassword("")
        }catch(e) {
            console.log(e)
        }
        
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={submit}>
                <table>
                    <tbody>
                        <tr>
                            <td>username</td>
                            <td>
                                <input 
                                value={username}
                                onChange={({target}) => setUsername(target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <td>password</td>
                            <td>
                                <input
                                type="password" 
                                value={password}
                                onChange={({target}) => setPassword(target.value)} />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm