
export default async function authFormEmail(authData: any){
    const response = await fetch("http://localhost:3005/auth-email", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(authData)
      });
    const data = await response.json()
    return data
}