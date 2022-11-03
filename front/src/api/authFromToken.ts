

export default async function authFromToken(token: string){
    const response = await fetch("http://localhost:3005/auth-token", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({token: token})
      });
    
      const data = await response.json()
      return data
}