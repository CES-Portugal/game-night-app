<script>
    import { store } from "../stores/auth.js";
    import { useNavigate } from "svelte-navigator";

    const navigate = useNavigate();

    let username = "";
    let password = "";

    let waiting = false;

    async function handleSubmit() {
        const data = "username=" + username + "&password=" + password;
        waiting = true;

        let save = {};
        const token = await fetch("http://localhost:8000/token", {
            body: data,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded",
            },
            method: "POST",
        });

        save["token"] = await token.json();
        let auth = "Bearer " + save["token"]["access_token"];

        console.log(auth);

        const me = await fetch("http://localhost:8000/users/me/", {
            headers: {
                Accept: "application/json",
                Authorization: auth,
            },
        });

        save["user"] = await me.json();

        waiting = false;

        console.log(save);

        $store = save; // simulate login

        navigate("/");
    }
</script>

<div class="columns is-mobile is-centered">
    <div class="column is-half">
        <div>
            <div class="block" />
            <form class="box" on:submit|preventDefault={handleSubmit}>
                <div class="field">
                    <label class="label">Email</label>
                    <div class="control">
                        <input
                            bind:value={username}
                            class="input"
                            type="email"
                            placeholder="e.g. alex@example.com"
                        />
                    </div>
                </div>

                <div class="field">
                    <label class="label">Password</label>
                    <div class="control">
                        <input
                            bind:value={password}
                            class="input"
                            type="password"
                            placeholder="********"
                        />
                    </div>
                </div>

                {#if waiting}
                    <progress class="progress is-small is-primary" max="100" />
                {:else}
                    <button class="button is-primary">Log in</button>
                {/if}
            </form>
        </div>
        <pre>{JSON.stringify($store, null, 2)}</pre>
    </div>
</div>
