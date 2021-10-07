<script>
    import "bulma/css/bulma.css";

    import { Router, Route, Link } from "svelte-navigator";
    import Blog from "./Blog.svelte";

    import BackButton from "./BackButton.svelte";
    import ForwardButton from "./ForwardButton.svelte";

    import Login from "./routes/Login.svelte";

    import NoLogin from "./components/NoLogin.svelte";

    import { store } from "./stores/auth.js";

    function logout() {
        $store = null;
    }
</script>

<div class="container is-widescreen">
    <Router>
        <header>
            <nav class="navbar" role="navigation" aria-label="main navigation">
                <div class="navbar-brand">
                    <p class="navbar-item" href="https://bulma.io">
                        🎮 Game Night
                        <!--..img
                            src="https://bulma.io/images/bulma-logo.png"
                            width="112"
                            height="28"
                            alt="logo"
                        /-->
                    </p>

                    <!-- svelte-ignore a11y-missing-attribute -->
                    <a
                        role="button"
                        class="navbar-burger"
                        aria-label="menu"
                        aria-expanded="false"
                        data-target="navbarBasicExample"
                    >
                        <span aria-hidden="true" />
                        <span aria-hidden="true" />
                        <span aria-hidden="true" />
                    </a>
                </div>

                <div id="navbarBasicExample" class="navbar-menu">
                    <div class="navbar-start">
                        <a class="navbar-item" href="/"> Score ⭐</a>

                        <a class="navbar-item" href="/about"> Games 🎲</a>

                        <a class="navbar-item" href="/user"> User 🤓</a>
                    </div>

                    <div class="navbar-end">
                        <div class="navbar-item">
                            <div class="buttons">
                                {#if $store != null}
                                    <button
                                        class="button is-primary"
                                        on:click={logout}
                                    >
                                        Log out
                                    </button>
                                {:else}
                                    <a class="button is-primary" href="/login">
                                        Log in
                                    </a>
                                {/if}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
        <main>
            <Route path="blog/*blogRoute" component={Blog} />

            <Route path="about" primary={false}>
                {#if $store != null}
                    <h3>About</h3>
                    <p>That's what it's all about!</p>
                {:else}
                    <NoLogin/>
                {/if}
            </Route>

            <Route path="user" primary={false}>
                {#if $store != null}
                    <pre> {JSON.stringify($store, null, 2)} </pre>
                {:else}
                    <NoLogin/>
                {/if}
            </Route>

            <Route path="login" primary={false}>
                <Login />
            </Route>

            <Route primary={false}>
                {#if $store != null}
                    <h3>Home</h3>
                    <p>Home sweet home...</p>
                {:else}
                    <NoLogin/>
                {/if}
            </Route>
        </main>
    </Router>
</div>
