export default async function toggleTodoApi(token: string, todoId: number, newDoneValue: boolean){
    const response = await fetch("http://localhost:3005/toggle-todo", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({token, todoId, newDoneValue})
      });
    
      const data = await response.json()
      return data
}