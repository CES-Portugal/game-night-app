<script>
    let foo = 'baz'
    let bar = 'qux'
    let result = null
    
    async function doPost () {
        const data = "username="+foo+"&password="+bar
        const res  = await fetch("http://localhost:8000/token", {
            body: data,
            headers: {
              Accept: "application/json",
              "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST"
        })

        
        const json = await res.json()
        result = JSON.stringify(json)
    }
</script>


<input bind:value={foo} />
<input type="password" bind:value={bar} />
<button type="button" on:click={doPost}>
    Post it.
</button>
<p>
    Result:
</p>
<pre>
{result}
</pre>
