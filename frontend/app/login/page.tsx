import styles from "./page.module.css"

export default function Login(){
    return(
        <div className={styles.mainComponent}>

            <div className={styles.formPage}>
                <h1>Sign in to your account</h1>

                <form>

                    <div className={styles.email}>
                        <label htmlFor="email">Email Address</label>
                        <input placeholder="you@example.com" id="email" name="email"/>
                    </div>

                    <div className={styles.password}>
                        <label htmlFor="password">Password</label>
                        <input placeholder="Enter your password" type="password" id="password" name="password"/>
                    </div>

                    <button type="submit" className={styles.submit}>Login</button>
                </form>

            </div>
        </div>
    )
}